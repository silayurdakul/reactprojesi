import React, { useState } from "react";

type Props = {
  odemeBasla: () => void;
};

export default function KartFormu({ odemeBasla }: Props) {
  const [isim, setIsim] = useState("");
  const [kartNumarasi, setKartNumarasi] = useState("");
  const [sonKullanma, setSonKullanma] = useState("");
  const [cvv, setCvv] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (kartNumarasi.length < 16 || cvv.length !== 3) {
      alert("Kart bilgilerini kontrol edin!");
      return;
    }
    odemeBasla();
  };
  const formatKartNo = (value: string) =>
  value
    .replace(/\D/g, "")                
    .replace(/(.{4})/g, "$1 ")         
    .trim()
    .slice(0, 19);                    

  return (
    <form onSubmit={handleSubmit} style={{
      maxWidth: 420,
      margin: "40px auto",
      padding: 24,
      border: "1px solid #e5e7eb",
      borderRadius: 14,
      background: "#fff",
      boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
    }}>
      <h2>Kart Bilgileri</h2>
      <input
    type="text"
    placeholder="Kart Üzerindeki Ad Soyad"
    value={isim}
    onChange={(e) => setIsim(e.target.value)}
    required
    style={{
      width: "100%",
      padding: "12px 14px",
      marginBottom: 12,
      borderRadius: 12,
      border: "1px solid #d1d5db",
      background: "#f9fafb"
    }}
  />
      <input
        type="text"
        placeholder="Kart Numarası"
        value={kartNumarasi}
        onChange={(e) => setKartNumarasi(formatKartNo(e.target.value))}
        required
        style={{ width: "100%", 
        padding: "12px 14px", 
        marginBottom: 12, 
        borderRadius: 12, 
        border: "1px solid #d1d5db",
        background: "#f9fafb" 
      }}
      />
  <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
    <div style={{ flex: 1 }}>
      <label>Ay</label>
      <select
       style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ccc" }}
       value={sonKullanma.split("/")[0] || ""}
       onChange={(e) => setSonKullanma(`${e.target.value}/${sonKullanma.split("/")[1] || ""}`)}
       required
    >
      <option value="">Ay</option>
      {Array.from({ length: 12 }, (_, i) => {
        const month = String(i + 1).padStart(2, "0");
        return (
          <option key={month} value={month}>
            {month}
          </option>
        );
      })}
    </select>
  </div>
  <div style={{ flex: 1 }}>
    <label>Yıl</label>
    <select
      style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ccc" }}
      value={sonKullanma.split("/")[1] || ""}
      onChange={(e) => setSonKullanma(`${sonKullanma.split("/")[0] || ""}/${e.target.value}`)}
      required
    >
      <option value="">Yıl</option>
      {Array.from({ length: 15 }, (_, i) => {
        const year = String(new Date().getFullYear() % 100 + i).padStart(2, "0");
        return (
          <option key={year} value={year}>
            {year}
          </option>
        );
      })}
    </select>
  </div>

  <div style={{ width: "100px" }}>
    <label>CVV</label>
    <input
      style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ccc" }}
      type="password"
      maxLength={3}
      value={cvv}
      onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
      placeholder= "•••"
      required
    />
  </div>
</div>

      <button
        type="submit"
        style={{ width: "100%", padding: "14px 18px", marginTop: 20, borderRadius: 12, border: "none", background: "linear-gradient(90deg, #0056a6, #0099cc)", color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer"}}
      >
        Ödemeyi Yap
      </button>
    </form>
  );
}
