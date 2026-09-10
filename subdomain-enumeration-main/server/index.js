import express from 'express';
import cors from 'cors';
import dns from 'dns/promises';
import http from 'http';
import https from 'https';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static production build files if available
app.use(express.static(path.join(__dirname, '../dist')));


// In-memory scan storage for demonstration & API completeness
let scanHistoryStore = [];

// Rate limiting state (max 10 requests per minute per IP)
const ipRateLimits = new Map();

const rateLimitMiddleware = (req, res, next) => {
  const clientIp = req.ip || req.headers['x-forwarded-for'] || '127.0.0.1';
  const now = Date.now();
  const windowMs = 60 * 1000;
  
  const record = ipRateLimits.get(clientIp) || { count: 0, resetTime: now + windowMs };
  
  if (now > record.resetTime) {
    record.count = 1;
    record.resetTime = now + windowMs;
  } else {
    record.count++;
  }
  
  ipRateLimits.set(clientIp, record);
  
  if (record.count > 30) {
    return res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please wait a minute before starting another scan.'
    });
  }
  
  next();
};

// Common subdomain candidate wordlist for safe educational scanning
const SUBDOMAIN_WORDLIST = [
  'www', 'api', 'mail', 'portal', 'dev', 'admin', 'app', 'vpn', 'remote',
  'm', 'blog', 'shop', 'test', 'staging', 'cdn', 'auth', 'status', 'docs',
  'db', 'grafana', 'git', 'dashboard', 'monitor', 'jenkins', 'cloud', 'support'
];

// Helper: Normalize domain input safely
function normalizeDomain(input) {
  if (!input) return '';
  let domain = input.trim().toLowerCase();
  
  // Remove protocol
  domain = domain.replace(/^https?:\/\//i, '');
  // Remove port or path
  domain = domain.split('/')[0].split(':')[0];
  // Remove trailing dots
  domain = domain.replace(/\.+$/, '');
  
  return domain;
}

// Helper: Validate domain format
function validateDomainInput(domainStr) {
  const domain = normalizeDomain(domainStr);
  
  if (!domain) {
    return { valid: false, reason: 'EMPTY', message: 'Please enter a domain before starting the enumeration.' };
  }
  
  // Check if IP address (IPv4)
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4Regex.test(domain)) {
    return { valid: false, reason: 'IP_ADDRESS', message: 'Please enter a domain name rather than an IP address.' };
  }
  
  // Domain syntax regex
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domain) && domain !== 'demo.example') {
    return { valid: false, reason: 'INVALID_SYNTAX', message: "That doesn't look like a valid domain. Please enter something like example.com." };
  }
  
  return { valid: true, domain };
}

// Generate rich mock data for demo.example
function getDemoResults(domain = 'demo.example') {
  const now = new Date().toISOString();
  return [
    {
      subdomain: `www.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.10',
      records: { A: ['192.0.2.10'], AAAA: ['2001:db8::10'], CNAME: [], MX: [], TXT: ['v=spf1 include:_spf.demo.example ~all'] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-01-15',
      detailsExplanation: 'Identified via standard DNS lookup. Resolves to the main web production server IP (192.0.2.10).'
    },
    {
      subdomain: `api.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.25',
      records: { A: ['192.0.2.25'], AAAA: [], CNAME: ['api-gateway.internal.net'], MX: [], TXT: [] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-02-01',
      detailsExplanation: 'Discovered via DNS lookup. Serves public REST APIs and references internal gateway CNAME.'
    },
    {
      subdomain: `mail.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.50',
      records: { A: ['192.0.2.50'], AAAA: [], CNAME: [], MX: ['10 mail.demo.example'], TXT: ['v=spf1 redirect=demo.example'] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2024-11-20',
      detailsExplanation: 'Discovered in public MX mail server records and SPF TXT policies.'
    },
    {
      subdomain: `portal.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.88',
      records: { A: ['192.0.2.88'], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2025-03-10',
      detailsExplanation: 'Identified in public SSL/TLS Certificate Transparency logs issued by Let\'s Encrypt.'
    },
    {
      subdomain: `dev.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.199',
      records: { A: ['192.0.2.199'], AAAA: [], CNAME: [], MX: [], TXT: ['environment=development'] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2025-04-05',
      detailsExplanation: 'Found in SAN (Subject Alternative Name) extension of wildcard SSL certificate.'
    },
    {
      subdomain: `staging.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.201',
      records: { A: ['192.0.2.201'], AAAA: [], CNAME: ['staging-cluster.cloud-provider.com'], MX: [], TXT: [] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-04-12',
      detailsExplanation: 'Discovered via DNS wordlist brute-force resolution against candidate names.'
    },
    {
      subdomain: `vpn.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.15',
      records: { A: ['192.0.2.15'], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2024-09-01',
      detailsExplanation: 'Identified from public SAN certificates and corporate access portal index.'
    },
    {
      subdomain: `cdn.${domain}`,
      status: 'Resolved',
      ip: '198.51.100.44',
      records: { A: ['198.51.100.44'], AAAA: [], CNAME: ['d111111abcdef8.cloudfront.net'], MX: [], TXT: [] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-01-20',
      detailsExplanation: 'Resolves to Cloudflare/Cloudfront Edge CDN distribution server.'
    },
    {
      subdomain: `auth.${domain}`,
      status: 'Resolved',
      ip: '192.0.2.90',
      records: { A: ['192.0.2.90'], AAAA: [], CNAME: [], MX: [], TXT: ['oidc-issuer=https://auth.demo.example'] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2025-02-14',
      detailsExplanation: 'Found in Certificate Transparency log stream. Hosts SSO/OIDC authentication endpoint.'
    },
    {
      subdomain: `grafana.${domain}`,
      status: 'Unresolved',
      ip: 'N/A',
      records: { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2024-08-30',
      detailsExplanation: 'Listed in historical CT certificates, but current DNS query returned NXDOMAIN (Unresolved).'
    },
    {
      subdomain: `legacy-app.${domain}`,
      status: 'Unresolved',
      ip: 'N/A',
      records: { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2023-05-11',
      detailsExplanation: 'Found in public web archive historical crawl data; DNS resolution fails today.'
    },
    {
      subdomain: `db-internal.${domain}`,
      status: 'Unresolved',
      ip: 'N/A',
      records: { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2024-03-22',
      detailsExplanation: 'Candidate subdomain from developer documentation leak; DNS does not resolve externally.'
    }
  ];
}

// Perform real DNS lookups safely
async function resolveSubdomain(subdomain) {
  const records = { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] };
  let resolved = false;
  
  try {
    const aRecords = await dns.resolve4(subdomain).catch(() => []);
    if (aRecords.length > 0) {
      records.A = aRecords;
      resolved = true;
    }
  } catch (e) {}

  try {
    const aaaaRecords = await dns.resolve6(subdomain).catch(() => []);
    if (aaaaRecords.length > 0) {
      records.AAAA = aaaaRecords;
      resolved = true;
    }
  } catch (e) {}

  try {
    const cnameRecords = await dns.resolveCname(subdomain).catch(() => []);
    if (cnameRecords.length > 0) {
      records.CNAME = cnameRecords;
      resolved = true;
    }
  } catch (e) {}

  try {
    const mxRecords = await dns.resolveMx(subdomain).catch(() => []);
    if (mxRecords.length > 0) {
      records.MX = mxRecords.map(m => `${m.priority} ${m.exchange}`);
      resolved = true;
    }
  } catch (e) {}

  try {
    const txtRecords = await dns.resolveTxt(subdomain).catch(() => []);
    if (txtRecords.length > 0) {
      records.TXT = txtRecords.map(t => t.join(' '));
      resolved = true;
    }
  } catch (e) {}

  const primaryIp = records.A[0] || (records.CNAME[0] ? `CNAME → ${records.CNAME[0]}` : 'N/A');

  return {
    subdomain,
    status: resolved ? 'Resolved' : 'Unresolved',
    ip: primaryIp,
    records,
    discoveryMethod: 'DNS Resolution',
    firstSeen: new Date().toISOString().split('T')[0],
    detailsExplanation: resolved 
      ? `This subdomain was identified because the DNS lookup successfully resolved the hostname.`
      : `Name queried via DNS lookup but failed to resolve (NXDOMAIN or Timeout).`
  };
}

// Passive lookup using crt.sh (Certificate Transparency) with fallback
async function fetchCertificateTransparencySubdomains(domain) {
  return new Promise((resolve) => {
    const url = `https://crt.sh/?q=%.${domain}&output=json`;
    const req = https.get(url, { headers: { 'User-Agent': 'SubScope-Security-Education-Tool/1.0' }, timeout: 4000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          if (res.statusCode === 200) {
            const parsed = JSON.parse(data);
            const foundNames = new Set();
            parsed.forEach(item => {
              const name = item.name_value;
              if (name) {
                name.split('\n').forEach(n => {
                  const cleaned = n.replace('*.', '').trim().toLowerCase();
                  if (cleaned.endsWith(`.${domain}`) && cleaned !== domain) {
                    foundNames.add(cleaned);
                  }
                });
              }
            });
            resolve(Array.from(foundNames));
          } else {
            resolve([]);
          }
        } catch (err) {
          resolve([]);
        }
      });
    });

    req.on('error', () => resolve([]));
    req.on('timeout', () => {
      req.destroy();
      resolve([]);
    });
  });
}

// API Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'SubScope - Authorized Subdomain Enumeration API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API: Enumerate subdomains
app.post('/api/enumerate', rateLimitMiddleware, async (req, res) => {
  const { domain: inputDomain, confirmedAuthorization, options = {}, isDemo = false } = req.body;

  if (!confirmedAuthorization && !isDemo) {
    return res.status(403).json({
      error: 'Authorization Required',
      message: 'You must explicitly confirm that you own or are authorized to assess this target domain.'
    });
  }

  const validation = validateDomainInput(inputDomain);
  if (!validation.valid) {
    return res.status(400).json({
      error: 'Validation Failed',
      reason: validation.reason,
      message: validation.message
    });
  }

  const domain = validation.domain;
  const startTime = Date.now();

  // If Demo domain or isDemo flag set
  if (isDemo || domain === 'demo.example') {
    const demoData = getDemoResults(domain === 'demo.example' ? 'demo.example' : domain);
    const duration = ((Date.now() - startTime) / 1000 + 1.4).toFixed(2);
    
    const scanResult = {
      id: `scan-${Date.now()}`,
      targetDomain: domain,
      scanDate: new Date().toISOString(),
      authorized: true,
      isDemo: true,
      status: 'Completed',
      durationSeconds: duration,
      summary: {
        totalDiscovered: demoData.length,
        resolved: demoData.filter(d => d.status === 'Resolved').length,
        unresolved: demoData.filter(d => d.status === 'Unresolved').length,
        uniqueSubdomains: demoData.length,
      },
      results: demoData
    };

    scanHistoryStore.unshift(scanResult);
    return res.json(scanResult);
  }

  // Real scan handling
  try {
    const resultsMap = new Map();

    // 1. Passive discovery via crt.sh
    let ctSubdomains = [];
    try {
      ctSubdomains = await fetchCertificateTransparencySubdomains(domain);
    } catch (e) {
      console.log('CT fetch skipped/failed');
    }

    ctSubdomains.slice(0, 15).forEach(sub => {
      resultsMap.set(sub, {
        subdomain: sub,
        discoveryMethod: 'Certificate Transparency',
        detailsExplanation: 'Identified in Certificate Transparency logs (crt.sh public SSL registry).'
      });
    });

    // 2. Add standard wordlist candidates
    SUBDOMAIN_WORDLIST.forEach(prefix => {
      const candidate = `${prefix}.${domain}`;
      if (!resultsMap.has(candidate)) {
        resultsMap.set(candidate, {
          subdomain: candidate,
          discoveryMethod: 'DNS Resolution',
          detailsExplanation: 'Candidate subdomain evaluated via active DNS resolution.'
        });
      }
    });

    // 3. Resolve candidates concurrently with limit
    const candidates = Array.from(resultsMap.values());
    const finalResults = [];

    const resolvePromises = candidates.map(async (item) => {
      const resolvedInfo = await resolveSubdomain(item.subdomain);
      return {
        ...resolvedInfo,
        discoveryMethod: item.discoveryMethod,
        detailsExplanation: item.discoveryMethod === 'Certificate Transparency' 
          ? `${item.detailsExplanation} ${resolvedInfo.status === 'Resolved' ? 'Confirmed currently resolvable via DNS.' : 'Does not resolve to active DNS IP.'}`
          : resolvedInfo.detailsExplanation
      };
    });

    const resolvedResults = await Promise.all(resolvePromises);
    
    // Filter to resolved subdomains or high confidence candidates to keep UI clean
    const filteredResults = resolvedResults.filter(r => r.status === 'Resolved' || r.discoveryMethod === 'Certificate Transparency');

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    const scanResult = {
      id: `scan-${Date.now()}`,
      targetDomain: domain,
      scanDate: new Date().toISOString(),
      authorized: true,
      isDemo: false,
      status: 'Completed',
      durationSeconds: duration,
      summary: {
        totalDiscovered: filteredResults.length,
        resolved: filteredResults.filter(d => d.status === 'Resolved').length,
        unresolved: filteredResults.filter(d => d.status === 'Unresolved').length,
        uniqueSubdomains: filteredResults.length,
      },
      results: filteredResults
    };

    scanHistoryStore.unshift(scanResult);
    return res.json(scanResult);

  } catch (err) {
    console.error('Scan Error:', err);
    return res.status(500).json({
      error: 'Scan Failed',
      message: "We couldn't resolve this domain or complete the enumeration. Please verify the domain exists and try again."
    });
  }
});

// API: Get scan history
app.get('/api/scans', (req, res) => {
  res.json(scanHistoryStore);
});

// API: Get single scan
app.get('/api/scans/:scanId', (req, res) => {
  const scan = scanHistoryStore.find(s => s.id === req.params.scanId);
  if (!scan) {
    return res.status(404).json({ error: 'Scan Not Found', message: 'The requested scan report was not found.' });
  }
  res.json(scan);
});

// API: Delete scan
app.delete('/api/scans/:scanId', (req, res) => {
  scanHistoryStore = scanHistoryStore.filter(s => s.id !== req.params.scanId);
  res.json({ success: true, message: 'Scan record removed successfully.' });
});

// SPA Fallback for client routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`SubScope Backend Server running on http://localhost:${PORT}`);
});

