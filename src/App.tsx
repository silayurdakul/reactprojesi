
import React, { useState } from 'react';
import UyeGiris from './components/UyeGirisi';
import AdminGiris from './components/AdminGirisi';
import GonulluOl from './components/GonulluOl';
import BagisYap from './components/BagisYap';
import Haberler from './components/Haberler';
import Duyurular from './components/Duyurular';

function App() {
  const [sayfa, setSayfa] = useState<
    'anasayfa' | 'uye' | 'admin' | 'haberler' | 'duyurular' | 'bagis'
  >('anasayfa');

  const pillBtn: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '9999px',
    border: 'none',
    outline: 'none',
    background: '#10b981',
    color: '#04160f',
    fontWeight: 700,
    cursor: 'pointer',
    WebkitAppearance: 'none',
    appearance: 'none',
  };
  const ghostBtn: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 10,
    border: '1px solid #d1d5db',
    background: '#f3f4f6',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: 20, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 0',
        }}
      >
        <h1
          style={{
            margin: 0,
            fontFamily: '"Poppins", system-ui, Segoe UI, Roboto, Arial, sans-serif',
            fontWeight: 800,
            letterSpacing: '0.2px',
            cursor: 'pointer',
          }}
          onClick={() => setSayfa('anasayfa')}
        >
          AfetDestek
        </h1>

        <nav style={{ display: 'flex', gap: 10 }}>
          <button style={ghostBtn} onClick={() => setSayfa('haberler')}>Haberler</button>
          <button style={ghostBtn} onClick={() => setSayfa('duyurular')}>Duyurular</button>
          <button style={ghostBtn} onClick={() => setSayfa('bagis')}>Bağış Yap</button>
        </nav>

        <div style={{ display: 'flex', gap: 10 }}>
          <button style={pillBtn} onClick={() => setSayfa('uye')}>Üye Girişi</button>
          <GonulluOl />
        </div>
      </header>
      <main style={{ flex: 1, paddingTop: 10 }}>
        {sayfa === 'anasayfa' && (
          <div style={{ color: '#555' }}>
            <h2>Birlikte Daha Güçlüyüz!</h2>
          </div>
        )}

        {sayfa === 'haberler' && <Haberler />}
        {sayfa === 'duyurular' && <Duyurular />}
        {sayfa === 'bagis' && <BagisYap />}

        {sayfa === 'uye' && (
          <>
            <button onClick={() => setSayfa('anasayfa')} style={{ ...ghostBtn, marginBottom: 20 }}>
              ← Geri
            </button>
            <UyeGiris />
          </>
        )}

        {sayfa === 'admin' && (
          <>
            <button onClick={() => setSayfa('anasayfa')} style={{ ...ghostBtn, marginBottom: 20 }}>
              ← Geri
            </button>
            <AdminGiris />
          </>
        )}
      </main>

      <footer
        style={{
          marginTop: 'auto',
          textAlign: 'center',
          paddingTop: 20,
          fontSize: 12,
        }}
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setSayfa('admin');
          }}
          style={{ color: '#888', textDecoration: 'none' }}
        >
          Yönetici
        </a>
      </footer>
    </div>
  );
}

export default App;
