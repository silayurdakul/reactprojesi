import React, { useEffect, useState } from "react";

interface Etkinlik {
  id: number;
  konu: string;
  icerik: string;
  tarih: string;
  tip: string;
  resim_yolu?: string | null;
}

const Duyurular: React.FC = () => {
  const [duyurular, setDuyurular] = useState<Etkinlik[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/etkinlikler")
      .then((res) => res.json())
      .then((data: Etkinlik[]) => {
        const onlyDuyurular = data.filter((item) => item.tip === "duyuru");
        setDuyurular(onlyDuyurular);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hata:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Duyurular yükleniyor...</p>;

  if (duyurular.length === 0) return <p>Henüz duyuru eklenmemiştir.</p>;

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Duyurular</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {duyurular.map((d) => (
          <div
            key={d.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              background: "#f9fafb",
            }}
          >
            {d.resim_yolu && (
              <img
                src={d.resim_yolu}
                alt={d.konu}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
            )}
            <h3 style={{ margin: "0 0 10px" }}>{d.konu}</h3>
            <p style={{ margin: "0 0 10px", color: "#444" }}>{d.icerik}</p>
            <small style={{ color: "#666" }}>
              {new Date(d.tarih).toLocaleDateString("tr-TR")}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Duyurular;

