import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "node:fs";
import path from "node:path";

// Railway injects this automatically for any service with a volume attached
// (Settings -> Volumes). Falls back to a local dir for `npm start` outside Railway.
const DATA_DIR = process.env.RAILWAY_VOLUME_MOUNT_PATH || path.resolve("./data");
const ARTICLES_DIR = path.join(DATA_DIR, "articles");
fs.mkdirSync(ARTICLES_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, ARTICLES_DIR),
    filename: (req, file, cb) => {
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      cb(null, `${Date.now()}-${safeName}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => cb(null, file.mimetype.startsWith("image/")),
});

const app = express();
app.set("trust proxy", true); // Railway terminates TLS at its edge proxy; trust X-Forwarded-Proto so req.protocol reports https
app.use(cors());
app.use("/files", express.static(DATA_DIR, { maxAge: "30d", immutable: true }));

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No image file provided" });
  const url = `${req.protocol}://${req.get("host")}/files/articles/${req.file.filename}`;
  res.json({ url });
});

app.get("/health", (req, res) => res.send("ok"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`uploads service listening on ${port}`));
