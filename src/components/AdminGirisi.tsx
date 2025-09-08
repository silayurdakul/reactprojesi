
import React, { useState } from 'react';

const AdminGiris: React.FC = () => {
  const [kullanici, setKullanici] = useState('');
  const [sifre, setSifre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Yönetici Girişi (demo)\nKullanıcı: ${kullanici}`);
  };

  const card: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    background: '#f7f8fa',
    borderRadius: 12,
    padding: 20,
    maxWidth: 360,
    margin: '40px auto',
    boxShadow: '0 8px 24px rgba(0,0,0,.06)',
  };
  const input: React.CSSProperties = {
    width: '100%',
    marginBottom: 12,
    padding: 10,
    borderRadius: 10,
    border: '1px solid #d1d5db',
    outline: 'none',
    fontSize: 14,
  };
  const submitBtn: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    borderRadius: 9999,
    border: 'none',
    background: '#0056a6',
    color: '#04160f',
    fontWeight: 700,
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  };
  const hint: React.CSSProperties = { fontSize: 12, color: '#6b7280', marginTop: 8, textAlign: 'center' };

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>Yönetici Girişi</h2>

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={kullanici}
          onChange={(e) => setKullanici(e.target.value)}
          required
          style={input}
          autoComplete="username"
        />

        <input
          type="password"
          placeholder="Şifre"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          required
          style={input}
          autoComplete="current-password"
        />

        <button type="submit" style={submitBtn}>
          Giriş Yap
        </button>

        <div style={hint}>Bu alan yalnızca yetkili kişiler içindir.</div>
      </form>
    </div>
  );
};

export default AdminGiris;
