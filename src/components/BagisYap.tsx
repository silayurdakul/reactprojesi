// src/components/BagisYap.tsx  — KOPYALA/DEĞİŞTİR
import React, { useMemo, useState } from 'react';

export default function BagisYap() {
  // form state
  const [ad, setAd] = useState('');
  const [iletisim, setIletisim] = useState('');
  const [tutar, setTutar] = useState<number | ''>('');
  const [aylik, setAylik] = useState(false);
  const [mesaj, setMesaj] = useState('');
  const [kvkk, setKvkk] = useState(false);

  // gönderim sonrası özet
  const [gonderildi, setGonderildi] = useState(false);
  const [referans, setReferans] = useState('');

  // Sabitler
  const HIZLI_TUTARLAR = [50, 100, 250, 500];
  const IBAN = 'TR12 3456 7890 1234 5678 9012 34'; // örnek IBAN, gerçekle değiştir

  // UI stilleri
  const card: React.CSSProperties = {
    border: '1px solid #e5e7eb',
    background: '#f7f8fa',
    borderRadius: 12,
    padding: 20,
    maxWidth: 560,
    margin: '40px auto',
    boxShadow: '0 8px 24px rgba(0,0,0,.06)',
  };
  const row: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 };
  const input: React.CSSProperties = {
    width: '100%', padding: '10px 12px',
    borderRadius: 10, border: '1px solid #d1d5db', outline: 'none',
    fontSize: 14,
  };
  const textarea: React.CSSProperties = { ...input, minHeight: 80, resize: 'vertical' as const };
  const pillBtn: React.CSSProperties = {
    display: 'inline-block',
    padding: '12px 16px',
    borderRadius: 9999,
    border: 'none',
    background: '#10b981',
    color: '#04160f',
    fontWeight: 700,
    cursor: 'pointer',
  };
  const chip: React.CSSProperties = {
    padding: '8px 12px',
    borderRadius: 9999,
    border: '1px solid #d1d5db',
    background: '#ffffff',
    cursor: 'pointer',
    fontSize: 14,
  };
  const chipActive: React.CSSProperties = { ...chip, background: '#10b981', color: '#04160f', border: 'none', fontWeight: 700 };

  const disabled = !ad.trim() || !iletisim.trim() || !tutar || Number(tutar) < 10 || !kvkk;

  const formatTL = (n: number) =>
    new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(n);

  const yeniReferans = useMemo(() => {
    // örn: BAGIS-202508-A1B2
    const y = new Date();
    const ym = `${y.getFullYear()}${String(y.getMonth() + 1).padStart(2, '0')}`;
    const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
    return `BAGIS-${ym}-${rnd}`;
  }, [gonderildi]); // gönderildikçe değişsin

  const kopyala = async (metin: string) => {
    try {
      await navigator.clipboard.writeText(metin);
      alert('Kopyalandı');
    } catch {
      // bazı tarayıcılarda izin gerekebilir
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (disabled) return;
    setReferans(yeniReferans);
    setGonderildi(true);
    // Not: Gerçek ödeme yok; kullanıcıya IBAN + açıklama kodu veriyoruz.
    // Backend eklenince burada fetch/axios ile gönderim yaparsın.
  };

  if (gonderildi) {
    return (
      <div style={card}>
        <h2 style={{ marginTop: 0 }}>Teşekkürler!</h2>
        <p>
          {ad}, bağış niyetin için çok teşekkür ederiz. Aşağıdaki bilgilerle <b>Havale/EFT</b> yapabilirsin.
          {aylik && ' (Aylık düzenli bağış seçtiniz — bankanızdan talimat oluşturabilirsiniz.)'}
        </p>

        <div style={{ ...row, marginTop: 12 }}>
          <label>IBAN</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input style={{ ...input, fontWeight: 600 }} readOnly value={IBAN} />
            <button type="button" style={{ ...chip, padding: '10px 12px' }} onClick={() => kopyala(IBAN)}>
              Kopyala
            </button>
          </div>
        </div>

        <div style={row}>
          <label>Açıklama Kodu</label>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input style={{ ...input, fontWeight: 600 }} readOnly value={referans} />
            <button type="button" style={{ ...chip, padding: '10px 12px' }} onClick={() => kopyala(referans)}>
              Kopyala
            </button>
          </div>
          <small style={{ color: '#6b7280' }}>
            Lütfen havale açıklamasına bu kodu yazın ki bağışınız eşleştirilebilsin.
          </small>
        </div>

        <div style={{ ...row, marginTop: 8 }}>
          <label>Tutar</label>
          <input style={input} readOnly value={tutar ? formatTL(Number(tutar)) : ''} />
        </div>

        <button type="button" style={{ ...pillBtn, background: '#111827', color: '#fff' }} onClick={() => setGonderildi(false)}>
          Yeni Bağış
        </button>
      </div>
    );
  }

  return (
    <div style={card}>
      <h2 style={{ marginTop: 0 }}>Bağış Yap</h2>

      <form onSubmit={submit} noValidate>
        {/* Ad Soyad */}
        <div style={row}>
          <label htmlFor="ad">Ad Soyad</label>
          <input id="ad" style={input} value={ad} onChange={(e) => setAd(e.target.value)} required />
        </div>

        {/* İletişim */}
        <div style={row}>
          <label htmlFor="iletisim">İletişim (Telefon / Email)</label>
          <input id="iletisim" style={input} value={iletisim} onChange={(e) => setIletisim(e.target.value)} required />
        </div>

        {/* Tutar */}
        <div style={row}>
          <label htmlFor="tutar">Tutar (TL) — min 10</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const }}>
            {HIZLI_TUTARLAR.map((x) => (
              <button
                key={x}
                type="button"
                style={tutar === x ? chipActive : chip}
                onClick={() => setTutar(x)}
              >
                {formatTL(x)}
              </button>
            ))}
          </div>
          <input
            id="tutar"
            type="number"
            min={10}
            step={10}
            placeholder="Diğer tutar girin"
            style={input}
            value={tutar}
            onChange={(e) => setTutar(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
            required
          />
        </div>

        {/* Aylık bağış */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '6px 0 12px' }}>
          <input id="aylik" type="checkbox" checked={aylik} onChange={(e) => setAylik(e.target.checked)} />
          <label htmlFor="aylik">Aylık düzenli bağış yapmak istiyorum</label>
        </div>

        {/* Mesaj */}
        <div style={row}>
          <label htmlFor="mesaj">Mesaj (isteğe bağlı)</label>
          <textarea id="mesaj" style={textarea} value={mesaj} onChange={(e) => setMesaj(e.target.value)} />
        </div>

        {/* KVKK */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, margin: '8px 0 14px' }}>
          <input id="kvkk" type="checkbox" required checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} />
          <label htmlFor="kvkk">
            Kişisel verilerimin bağış süreçlerinde kullanılmasını onaylıyorum.
          </label>
        </div>

        <button type="submit" style={{ ...pillBtn, opacity: disabled ? 0.6 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }} disabled={disabled}>
          {aylik ? 'Aylık Bağış Talimatı Oluştur' : 'Bağışı Başlat'}
        </button>

        <div style={{ fontSize: 12, color: '#6b7280', marginTop: 10 }}>
          Şimdilik bağışlar <b>Havale/EFT</b> ile alınmaktadır. Ödeme altyapısı eklendiğinde kartla bağış da mümkün olacaktır.
        </div>
      </form>
    </div>
  );
}
