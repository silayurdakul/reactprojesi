import React, { useEffect, useState } from "react";

type Haber = {
  id: number;
  konu: string;
  icerik: string;
  tarih: string;
  tip: string;
  haber_linki: string | null;
  resim_yolu: string | null;
};

export default function Haberler({ limit }: { limit?: number }) {
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/etkinlikler")
      .then((res) => res.json())
      .then((data) => {
        const filtrelenmis = data.filter((h: Haber) => h.tip === "haber");
        setHaberler(limit ? filtrelenmis.slice(0, limit) : filtrelenmis);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Haberler alınamadı:", err);
        setLoading(false);
      });
  }, [limit]);

  if (loading) return <p>Haberler yükleniyor...</p>;
  if (haberler.length === 0) return <p>Henüz haber eklenmemiştir.</p>;

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Haberler</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {haberler.map((haber) => (
          <div
            key={haber.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              background: "#f9fafb",
            }}
          >
            {haber.resim_yolu && (
              <img
                src={`http://localhost:5000${haber.resim_yolu}`}
                alt={haber.konu}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}
            <h3 style={{ margin: "0 0 10px" }}>{haber.konu}</h3>
            <p style={{ margin: "0 0 10px", color: "#444" }}>{haber.icerik}</p>
            <small style={{ color: "#666", display: "block", marginBottom: "10px" }}>
              {new Date(haber.tarih).toLocaleDateString("tr-TR")}
            </small>
            {haber.haber_linki && (
              <a
                href={haber.haber_linki}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0056a6", textDecoration: "none" }}
              >
                Haberin Devamı →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
