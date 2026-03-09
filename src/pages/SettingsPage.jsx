import { useEffect, useState } from 'react';
import LanguageToggle from '../components/LanguageToggle';
import { useProducts } from '../context/ProductContext';
import { storage } from '../utils/storage';

function SettingsPage() {
  const { lowStockThreshold, setLowStockThreshold } = useProducts();
  const [settings, setSettings] = useState(() => storage.get('settings', { lowStockAlerts: true, stockMessages: true, dayCloseMessages: true }));

  useEffect(() => storage.set('settings', settings), [settings]);

  return (
    <div className="card shadow-sm p-3">
      <h5>Settings</h5>
      <LanguageToggle />
      <label className="form-label mt-3">Low Stock Threshold</label>
      <input type="number" className="form-control" value={lowStockThreshold} onChange={(e) => setLowStockThreshold(Number(e.target.value))} />
      {Object.keys(settings).map((key) => (
        <div className="form-check form-switch mt-2" key={key}>
          <input className="form-check-input" type="checkbox" checked={settings[key]} onChange={() => setSettings((s) => ({ ...s, [key]: !s[key] }))} />
          <label className="form-check-label">{key}</label>
        </div>
      ))}
      <div className="mt-3 text-muted">Theme/Profile placeholders enabled for future use.</div>
    </div>
  );
}

export default SettingsPage;
