import express from "express";
import pool from "./db";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API çalışıyor 🚀");
});

app.get("/etkinlikler", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM etkinlikler");
    res.json(result.rows);
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    res.status(500).send("Veritabanı hatası");
  }
});

app.get("/haberler", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM etkinlikler WHERE tip = 'haber' ORDER BY tarih DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Haberler hatası:", err);
    res.status(500).send("Haberler alınamadı");
  }
});

app.get("/duyurular", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM etkinlikler WHERE tip = 'duyuru' ORDER BY tarih DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Duyurular hatası:", err);
    res.status(500).send("Duyurular alınamadı");
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server http://localhost:${PORT} adresinde çalışıyor`);
});
