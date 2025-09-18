"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Backend API çalışıyor 🚀");
});
app.get("/etkinlikler", async (req, res) => {
    try {
        const result = await db_1.default.query("SELECT * FROM etkinlikler");
        res.json(result.rows);
    }
    catch (err) {
        console.error("Veritabanı hatası:", err);
        res.status(500).send("Veritabanı hatası");
    }
});
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server http://localhost:${PORT} adresinde çalışıyor`);
});
