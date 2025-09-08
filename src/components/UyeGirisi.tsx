import React, { useState } from 'react';

const UyeGiris: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Üye Girişi:\nEmail: ${email}\nŞifre: ${sifre}`);
  };

  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        background: '#f7f8fa',
        borderRadius: 12,
        padding: 20,
        maxWidth: 360,
        margin: '40px auto',
        boxShadow: '0 8px 24px rgba(0,0,0,.06)',
      }}
    >
      <h2 style={{ marginTop: 0 }}>Üye Girişi</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: '100%',
            marginBottom: 12,
            padding: 10,
            borderRadius: 10,
            border: '1px solid #d1d5db',
            outline: 'none',
          }}
        />

        <input
          type="password"
          placeholder="Şifre"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          required
          style={{
            width: '100%',
            marginBottom: 12,
            padding: 10,
            borderRadius: 10,
            border: '1px solid #d1d5db',
            outline: 'none',
          }}
        />

        <button
          type="submit"
          style={{
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
          }}
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default UyeGiris;
