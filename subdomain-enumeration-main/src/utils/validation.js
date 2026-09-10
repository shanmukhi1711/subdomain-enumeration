/**
 * SubScope Domain Validation & Normalization Utility
 */

export function normalizeDomain(input) {
  if (!input) return '';
  let domain = input.trim().toLowerCase();
  
  // Remove protocols
  domain = domain.replace(/^https?:\/\//i, '');
  // Remove paths, parameters, or ports
  domain = domain.split('/')[0].split(':')[0].split('?')[0];
  // Strip trailing dots
  domain = domain.replace(/\.+$/, '');
  
  return domain;
}

export function validateDomain(inputDomain) {
  const normalized = normalizeDomain(inputDomain);

  if (!normalized) {
    return {
      isValid: false,
      errorCode: 'EMPTY',
      message: 'Please enter a domain before starting the enumeration.'
    };
  }

  // IPv4 or IPv6 detection
  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  if (ipv4Regex.test(normalized) || ipv6Regex.test(normalized)) {
    return {
      isValid: false,
      errorCode: 'IP_ADDRESS',
      message: 'Please enter a domain name (e.g. example.com) rather than an IP address.'
    };
  }

  // Accept demo.example or standard valid domain format
  if (normalized === 'demo.example') {
    return { isValid: true, domain: normalized };
  }

  // Standard Domain Name regex
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  if (!domainRegex.test(normalized)) {
    return {
      isValid: false,
      errorCode: 'INVALID_DOMAIN',
      message: "That doesn't look like a valid domain. Please enter something like example.com."
    };
  }

  return { isValid: true, domain: normalized };
}
