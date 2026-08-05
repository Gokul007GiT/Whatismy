import type { ClientInfo } from './types';

export function parseUserAgent(userAgent: string): ClientInfo {
  const ua = userAgent || '';

  const browser = detectBrowser(ua);
  const os = detectOS(ua);
  const device = detectDevice(ua);

  return {
    browser: browser.name,
    browserVersion: browser.version,
    os,
    device,
    userAgent: ua,
  };
}

function detectBrowser(ua: string): { name: string; version: string } {
  const tests: Array<{ name: string; regex: RegExp }> = [
    { name: 'Edge', regex: /Edg(?:e|A|iOS)?\/([\d.]+)/ },
    { name: 'Opera', regex: /OPR\/([\d.]+)/ },
    { name: 'Samsung Internet', regex: /SamsungBrowser\/([\d.]+)/ },
    { name: 'Firefox', regex: /Firefox\/([\d.]+)/ },
    { name: 'Chrome', regex: /Chrome\/([\d.]+)/ },
    { name: 'Safari', regex: /Version\/([\d.]+).*Safari/ },
  ];

  for (const { name, regex } of tests) {
    const match = ua.match(regex);
    if (match) {
      return { name, version: match[1] || '' };
    }
  }

  return { name: 'Unknown', version: '' };
}

function detectOS(ua: string): string {
  if (/Windows NT 10/.test(ua)) return 'Windows 10/11';
  if (/Windows NT 6\.3/.test(ua)) return 'Windows 8.1';
  if (/Windows NT 6\.2/.test(ua)) return 'Windows 8';
  if (/Windows NT 6\.1/.test(ua)) return 'Windows 7';
  if (/Windows/.test(ua)) return 'Windows';
  if (/iPhone|iPad|iPod/.test(ua)) return 'iOS';
  if (/Mac OS X/.test(ua)) return 'macOS';
  if (/Android/.test(ua)) {
    const match = ua.match(/Android\s([\d.]+)/);
    return match ? `Android ${match[1]}` : 'Android';
  }
  if (/Linux/.test(ua)) return 'Linux';
  if (/CrOS/.test(ua)) return 'Chrome OS';
  return 'Unknown';
}

function detectDevice(ua: string): 'Desktop' | 'Mobile' | 'Tablet' {
  if (/iPad|Tablet|PlayBook|Silk/.test(ua)) return 'Tablet';
  if (/Mobi|iPhone|iPod|Android.*Mobile|Windows Phone|BlackBerry/.test(ua))
    return 'Mobile';
  return 'Desktop';
}
