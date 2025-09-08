import React, { useState } from "react";
import KartFormu from "./KartFormu";

type BagisYapProps = {
  setSayfa: React.Dispatch<
    React.SetStateAction<
      "anasayfa" | "uye" | "admin" | "haberler" | "duyurular" | "bagis" | "odeme"
    >
  >;
};

export default function BagisYap({ setSayfa }: BagisYapProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [ad, setAd] = useState("");
  const [iletisim, setIletisim] = useState("");
  const [tutar, setTutar] = useState<number | "">("");
  const [kvkk, setKvkk] = useState(false);
  const [aylik, setAylik] = useState(false);
  const [smsKod, setSmsKod] = useState("");
  const [dogrulamaKodu, setDogrulamaKodu] = useState("");


  const input: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: 14,
  };
  const pillBtn: React.CSSProperties = {
    display: "inline-block",
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: "none",
    background: "#0056a6",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 12,
  };

  if (step === 1) {
    return (
      <div style={{ maxWidth: 400, margin: "40px auto", padding: 20, border: "1px solid #eee", borderRadius: 10 }}>
        <h2>Bağış Yap</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!ad || !iletisim || !tutar || !kvkk) {
              alert("Lütfen tüm alanları doldurun ve KVKK onayını işaretleyin.");
              return;
            }
            setStep(2);
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <label>Ad Soyad</label>
            <input style={input} value={ad} onChange={(e) => setAd(e.target.value)} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>İletişim (Telefon / Email)</label>
            <input style={input} value={iletisim} onChange={(e) => setIletisim(e.target.value)} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label>Tutar (TL) </label>
            <input
              type="number"
              min={50}
              style={input}
              value={tutar}
              onChange={(e) => setTutar(e.target.value === "" ? "" : Number(e.target.value))}
            />
            <div style={{ display: "flex", gap: 8, marginTop: 8, marginBottom: 10 }}>
  {[100, 200, 500, 1000].map((x) => (
    <button
      key={x}
      type="button"
      onClick={() => setTutar(x)}
      style={{
        padding: "6px 12px",
        borderRadius: 8,
        border: tutar === x ? "2px solid #0056a6" : "1px solid #d1d5db",
        background: tutar === x ? "#e6f0f7" : "#fff",
        cursor: "pointer",
      }}
    >
      {x} TL
    </button>
  ))}
</div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10 }}>
  <input
    type="checkbox"
    id="aylik"
    checked={aylik}
    onChange={(e) => setAylik(e.target.checked)}
  />
  <label htmlFor="aylik">Aylık düzenli bağış yapmak istiyorum</label>
</div>

          </div>
          <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 10 }}>
            <input type="checkbox" checked={kvkk} onChange={(e) => setKvkk(e.target.checked)} />
            <span>Kişisel verilerimin kullanılmasını onaylıyorum.</span>
          </div>
          <button type="submit" style={pillBtn}>Devam Et</button>
        </form>
      </div>
    );
  }

  if (step === 2) {
  return <KartFormu odemeBasla={() => setStep(3)} />;
}
  if (step === 3) {
  return (
    <div style={{ maxWidth: 400, margin: "40px auto", padding: 20, border: "1px solid #eee", borderRadius: 10 }}>
      <h2>3D Secure Doğrulama</h2>
      <p>Telefonunuza gelen 6 haneli kodu giriniz:</p>
      
      <input
        type="text"
        maxLength={6}
        value={smsKod}
        onChange={(e) => setSmsKod(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10, borderRadius: 8, border: "1px solid #ccc" }}
      />
      
      <button
        onClick={() => setStep(4)}
        style={{ width: "100%", padding: 12, borderRadius: 20, background: "#0056a6", color: "#fff", fontWeight: 700 }}
      >
        Onayla
      </button>
    </div>
  );
}

  if (step === 4) {
  return (
    <div style={{ textAlign: "center", marginTop: 50 }}>
      <h2>Teşekkürler!</h2>
      <p>{ad}, bağışınız alınmıştır. Destek olduğunuz için teşekkür ederiz!</p>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20 }}>
        <button
          style={{
            flex: 1,
            maxWidth: 200,
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: "#0056a6",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => setStep(1)}
        >
          Yeni Bağış Yap
        </button>

        <button
          style={{
            flex: 1,
            maxWidth: 200,
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            background: "#6b7280",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
          onClick={() => setSayfa("anasayfa")}
        >
          Ana Sayfaya Dön
        </button>
      </div>
    </div>
  );
}

  return null;
}