/**
 * SubScope Local Storage Manager for Scan History
 */
import { PAST_SCANS_PRESET } from './mockData';

const STORAGE_KEY = 'subscope_scan_history_v1';

export function getStoredScans() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(PAST_SCANS_PRESET));
      return PAST_SCANS_PRESET;
    }
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load scan history from storage:', e);
    return PAST_SCANS_PRESET;
  }
}

export function saveScanToStorage(scanData) {
  try {
    const existing = getStoredScans();
    // Prevent duplicate scan IDs
    const filtered = existing.filter(s => s.id !== scanData.id);
    const updated = [scanData, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to save scan:', e);
    return [];
  }
}

export function deleteScanFromStorage(scanId) {
  try {
    const existing = getStoredScans();
    const updated = existing.filter(s => s.id !== scanId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete scan:', e);
    return [];
  }
}

export function clearAllScanHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  } catch (e) {
    return [];
  }
}
