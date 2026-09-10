/**
 * SubScope Mock Data & Preset Demo Datasets
 */

export const DEMO_TARGET_DOMAIN = 'demo.example';

export const INITIAL_DEMO_SCAN = {
  id: 'scan-demo-default',
  targetDomain: 'demo.example',
  scanDate: new Date().toISOString(),
  authorized: true,
  isDemo: true,
  status: 'Completed',
  durationSeconds: '2.45',
  summary: {
    totalDiscovered: 12,
    resolved: 9,
    unresolved: 3,
    uniqueSubdomains: 12
  },
  results: [
    {
      subdomain: 'www.demo.example',
      status: 'Resolved',
      ip: '192.0.2.10',
      records: { A: ['192.0.2.10'], AAAA: ['2001:db8::10'], CNAME: [], MX: [], TXT: ['v=spf1 include:_spf.demo.example ~all'] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-01-15',
      detailsExplanation: 'Identified via standard DNS lookup. Resolves to main web production cluster IP.'
    },
    {
      subdomain: 'api.demo.example',
      status: 'Resolved',
      ip: '192.0.2.25',
      records: { A: ['192.0.2.25'], AAAA: [], CNAME: ['api-gateway.internal.net'], MX: [], TXT: [] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-02-01',
      detailsExplanation: 'Discovered via DNS lookup. Serves public REST APIs and references internal gateway CNAME.'
    },
    {
      subdomain: 'mail.demo.example',
      status: 'Resolved',
      ip: '192.0.2.50',
      records: { A: ['192.0.2.50'], AAAA: [], CNAME: [], MX: ['10 mail.demo.example'], TXT: ['v=spf1 redirect=demo.example'] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2024-11-20',
      detailsExplanation: 'Discovered in public MX mail server records and SPF TXT policies.'
    },
    {
      subdomain: 'portal.demo.example',
      status: 'Resolved',
      ip: '192.0.2.88',
      records: { A: ['192.0.2.88'], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2025-03-10',
      detailsExplanation: 'Identified in public SSL/TLS Certificate Transparency logs issued by Let\'s Encrypt.'
    },
    {
      subdomain: 'dev.demo.example',
      status: 'Resolved',
      ip: '192.0.2.199',
      records: { A: ['192.0.2.199'], AAAA: [], CNAME: [], MX: [], TXT: ['environment=development'] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2025-04-05',
      detailsExplanation: 'Found in SAN (Subject Alternative Name) extension of wildcard SSL certificate.'
    },
    {
      subdomain: 'staging.demo.example',
      status: 'Resolved',
      ip: '192.0.2.201',
      records: { A: ['192.0.2.201'], AAAA: [], CNAME: ['staging-cluster.cloud-provider.com'], MX: [], TXT: [] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-04-12',
      detailsExplanation: 'Discovered via DNS wordlist brute-force resolution against candidate names.'
    },
    {
      subdomain: 'vpn.demo.example',
      status: 'Resolved',
      ip: '192.0.2.15',
      records: { A: ['192.0.2.15'], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2024-09-01',
      detailsExplanation: 'Identified from public SAN certificates and corporate access portal index.'
    },
    {
      subdomain: 'cdn.demo.example',
      status: 'Resolved',
      ip: '198.51.100.44',
      records: { A: ['198.51.100.44'], AAAA: [], CNAME: ['d111111abcdef8.cloudfront.net'], MX: [], TXT: [] },
      discoveryMethod: 'DNS Resolution',
      firstSeen: '2025-01-20',
      detailsExplanation: 'Resolves to Cloudflare/Cloudfront Edge CDN distribution server.'
    },
    {
      subdomain: 'auth.demo.example',
      status: 'Resolved',
      ip: '192.0.2.90',
      records: { A: ['192.0.2.90'], AAAA: [], CNAME: [], MX: [], TXT: ['oidc-issuer=https://auth.demo.example'] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2025-02-14',
      detailsExplanation: 'Found in Certificate Transparency log stream. Hosts SSO/OIDC authentication endpoint.'
    },
    {
      subdomain: 'grafana.demo.example',
      status: 'Unresolved',
      ip: 'N/A',
      records: { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Certificate Transparency',
      firstSeen: '2024-08-30',
      detailsExplanation: 'Listed in historical CT certificates, but current DNS query returned NXDOMAIN (Unresolved).'
    },
    {
      subdomain: 'legacy-app.demo.example',
      status: 'Unresolved',
      ip: 'N/A',
      records: { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2023-05-11',
      detailsExplanation: 'Found in public web archive historical crawl data; DNS resolution fails today.'
    },
    {
      subdomain: 'db-internal.demo.example',
      status: 'Unresolved',
      ip: 'N/A',
      records: { A: [], AAAA: [], CNAME: [], MX: [], TXT: [] },
      discoveryMethod: 'Passive Discovery',
      firstSeen: '2024-03-22',
      detailsExplanation: 'Candidate subdomain from developer documentation leak; DNS does not resolve externally.'
    }
  ]
};

export const PAST_SCANS_PRESET = [
  INITIAL_DEMO_SCAN,
  {
    id: 'scan-history-sample-1',
    targetDomain: 'security-lab.test',
    scanDate: new Date(Date.now() - 86400000).toISOString(),
    authorized: true,
    isDemo: true,
    status: 'Completed',
    durationSeconds: '1.82',
    summary: { totalDiscovered: 6, resolved: 5, unresolved: 1, uniqueSubdomains: 6 },
    results: [
      { subdomain: 'www.security-lab.test', status: 'Resolved', ip: '10.0.1.10', discoveryMethod: 'DNS Resolution', firstSeen: '2025-02-10', records: { A: ['10.0.1.10'] }, detailsExplanation: 'Resolved via DNS lookup.' },
      { subdomain: 'api.security-lab.test', status: 'Resolved', ip: '10.0.1.20', discoveryMethod: 'DNS Resolution', firstSeen: '2025-02-11', records: { A: ['10.0.1.20'] }, detailsExplanation: 'Resolved via DNS lookup.' },
      { subdomain: 'auth.security-lab.test', status: 'Resolved', ip: '10.0.1.30', discoveryMethod: 'Certificate Transparency', firstSeen: '2025-02-12', records: { A: ['10.0.1.30'] }, detailsExplanation: 'Identified in SSL CT logs.' },
      { subdomain: 'dev.security-lab.test', status: 'Resolved', ip: '10.0.1.40', discoveryMethod: 'DNS Resolution', firstSeen: '2025-02-15', records: { A: ['10.0.1.40'] }, detailsExplanation: 'Resolved via DNS lookup.' },
      { subdomain: 'vpn.security-lab.test', status: 'Resolved', ip: '10.0.1.50', discoveryMethod: 'Passive Discovery', firstSeen: '2025-02-18', records: { A: ['10.0.1.50'] }, detailsExplanation: 'Passive WHOIS & CT records.' },
      { subdomain: 'old-backup.security-lab.test', status: 'Unresolved', ip: 'N/A', discoveryMethod: 'Passive Discovery', firstSeen: '2024-06-01', records: {}, detailsExplanation: 'Historical archive entry, currently unresolved.' }
    ]
  }
];
