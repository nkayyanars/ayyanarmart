import { useLanguage } from '../context/LanguageContext';

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  return (
    <div className="d-flex align-items-center gap-2">
      <span className="small text-muted">{t.language}</span>
      <select className="form-select form-select-sm" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
      </select>
    </div>
  );
}

export default LanguageToggle;
