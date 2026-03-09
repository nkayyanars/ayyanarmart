import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

function Login() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (!result.ok) return setError('Invalid username or password');
    navigate('/dashboard');
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light p-3">
      <form className="card shadow p-4" style={{ maxWidth: 420, width: '100%' }} onSubmit={onSubmit}>
        <h3 className="text-center mb-3">NammaCart {t.login}</h3>
        <input className="form-control mb-2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input className="form-control mb-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <div className="alert alert-danger py-2">{error}</div>}
        <button className="btn btn-primary w-100">{t.login}</button>
        <small className="mt-3 text-muted">admin/admin123 | user/user123</small>
      </form>
    </div>
  );
}

export default Login;
