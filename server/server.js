import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs/promises';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createClient } from '@libsql/client';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const dataDir = path.join(rootDir, 'data');

const app = express();
const port = Number(process.env.PORT || 3001);

await fs.mkdir(dataDir, { recursive: true });

const db = createClient({
  url: process.env.DATABASE_URL || `file:${path.join(dataDir, 'contacts.db').replace(/\\/g, '/')}`
});

await db.execute(`
  CREATE TABLE IF NOT EXISTS recruiter_contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    role TEXT,
    message TEXT NOT NULL,
    submitted_at TEXT NOT NULL
  )
`);

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true });
});

app.post('/api/contact', async (request, response) => {
  const payload = {
    fullName: String(request.body.fullName || '').trim(),
    email: String(request.body.email || '').trim(),
    company: String(request.body.company || '').trim(),
    role: String(request.body.role || '').trim(),
    message: String(request.body.message || '').trim()
  };

  if (!payload.fullName || !payload.email || !payload.company || !payload.message) {
    response.status(400).json({
      message: 'Full name, email, company, and message are required.'
    });
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    response.status(400).json({
      message: 'Please provide a valid email address.'
    });
    return;
  }

  try {
    await db.execute({
      sql: `
        INSERT INTO recruiter_contacts (full_name, email, company, role, message, submitted_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      args: [
        payload.fullName,
        payload.email,
        payload.company,
        payload.role,
        payload.message,
        new Date().toISOString()
      ]
    });

    response.status(201).json({
      message: 'Contact details stored successfully.'
    });
  } catch (error) {
    console.error('Unable to save recruiter contact', error);
    response.status(500).json({
      message: 'Unable to store contact details right now.'
    });
  }
});

app.use(express.static(distDir));

app.get('*', async (_request, response, next) => {
  try {
    await fs.access(path.join(distDir, 'index.html'));
    response.sendFile(path.join(distDir, 'index.html'));
  } catch {
    next();
  }
});

app.listen(port, () => {
  console.log(`CV site server running on http://localhost:${port}`);
});
