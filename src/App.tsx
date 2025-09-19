import React, { useState } from 'react';
import UyeGirisi from './components/UyeGirisi';
import AdminGirisi from './components/AdminGirisi';
import GonulluOl from './components/GonulluOl';
import BagisYap from './components/BagisYap';
import Haberler from './components/Haberler';
import Duyurular from './components/Duyurular';

function App() {
  const [sayfa, setSayfa] = useState<
    'anasayfa' | 'uye' | 'admin' | 'haberler' | 'duyurular' | 'bagis' | 'odeme'
  >('anasayfa');

  const pillBtn: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 16px',
    borderRadius: '9999px',
    border: 'none',
    outline: 'none',
    background: '#0056a6',
    color: '#fff',
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          padding: '20px',
          backgroundColor: '#e6f0f7',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: '"Poppins", system-ui, Segoe UI, Roboto, Arial, sans-serif',
              fontWeight: 800,
              letterSpacing: '0.2px',
              cursor: 'pointer',
              color: '#001f4d',
            }}
            onClick={() => setSayfa('anasayfa')}
          >
            AfetDestek.org
          </h1>

          <nav style={{ display: 'flex', gap: 10 }}>
            <button style={ghostBtn} onClick={() => setSayfa('haberler')}>
              Haberler
            </button>
            <button style={ghostBtn} onClick={() => setSayfa('duyurular')}>
              Duyurular
            </button>
            <button style={ghostBtn} onClick={() => setSayfa('bagis')}>
              Bağış Yap
            </button>
          </nav>

          <div style={{ display: 'flex', gap: 10 }}>
            <button style={pillBtn} onClick={() => setSayfa('uye')}>
              Üye Girişi
            </button>
            <GonulluOl />
          </div>
        </div>

        {sayfa === 'anasayfa' && (
          <p style={{ margin: 0, color: '#333' }}>Birlikte Daha Güçlüyüz!</p>
        )}
      </header>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <main style={{ flex: 1, padding: 20 }}>
        {sayfa === 'anasayfa' && (
          <>
            {/* Bağış Çağrısı Banner */}
            <section
              style={{
                background: '#0056a6',
                color: '#fff',
                textAlign: 'center',
                padding: '40px 20px',
                borderRadius: '12px',
                marginBottom: 40,
              }}
            >
              <h2 style={{ fontSize: 28, marginBottom: 10 }}>
                Bağışlarınızla Hayat Kurtarabilirsiniz 💙
              </h2>
              <p style={{ fontSize: 16, marginBottom: 20 }}>
                Afet bölgelerindeki ihtiyaç sahiplerine destek olmak için siz de katkıda bulunun.
              </p>
              <button style={pillBtn} onClick={() => setSayfa('bagis')}>
                Hemen Bağış Yap
              </button>
            </section>

            {/* İstatistikler Bölümü */}
            <section
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                marginBottom: 40,
              }}
            >
              {[
                { label: 'Gönüllü', value: '10.000+' },
                { label: 'Bağış', value: '250.000₺' },
                { label: 'Şehirde Destek', value: '50+' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    background: '#f3f4f6',
                    padding: '20px',
                    borderRadius: '10px',
                    textAlign: 'center',
                  }}
                >
                  <h3 style={{ margin: 0, color: '#001f4d', fontSize: 24 }}>{stat.value}</h3>
                  <p style={{ margin: 0, color: '#444' }}>{stat.label}</p>
                </div>
              ))}
            </section>

            {/* Son Haberler */}
            <section style={{ marginBottom: 40 }}>
              <h3 style={{ color: '#0056a6' }}>Son Haberler</h3>
              <Haberler />
            </section>

            {/* Son Duyurular */}
            <section>
              <h3 style={{ color: '#0056a6' }}>Son Duyurular</h3>
              <Duyurular />
            </section>
          </>
        )}

        {sayfa === 'haberler' && <Haberler />}
        {sayfa === 'duyurular' && <Duyurular />}
        {sayfa === 'bagis' && <BagisYap setSayfa={setSayfa} />}
        {sayfa === 'odeme' && <p>Bağışınız başarıyla alınmıştır, teşekkür ederiz.</p>}

        {sayfa === 'uye' && (
          <>
            <button
              onClick={() => setSayfa('anasayfa')}
              style={{ ...ghostBtn, marginBottom: 20 }}
            >
              ← Geri
            </button>
            <UyeGirisi />
          </>
        )}

        {sayfa === 'admin' && (
          <>
            <button
              onClick={() => setSayfa('anasayfa')}
              style={{ ...ghostBtn, marginBottom: 20 }}
            >
              ← Geri
            </button>
            <AdminGirisi />
          </>
        )}
      </main>
      {/* ----------------- MAIN CONTENT END ----------------- */}

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
