const Database = require('better-sqlite3');
const path = require('path');

// Vercel'da faqat /tmp papkasiga yozish mumkin (boshqa joy read-only).
// Lokal kompyuterda esa loyiha papkasining o'ziga yoziladi.
const dbPath = process.env.VERCEL
  ? '/tmp/ids.db'
  : path.join(__dirname, 'ids.db');

const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS ids (
    id TEXT PRIMARY KEY,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

function addId(id) {
  const stmt = db.prepare('INSERT OR IGNORE INTO ids (id) VALUES (?)');
  const result = stmt.run(id);
  return result.changes > 0; // true - yangi qo'shildi, false - allaqachon bor edi
}

function getAllIds() {
  const rows = db.prepare('SELECT id, created_at FROM ids ORDER BY created_at DESC').all();
  return rows;
}

function removeId(id) {
  const stmt = db.prepare('DELETE FROM ids WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0; // true - o'chirildi, false - bunday id topilmadi
}

module.exports = { addId, getAllIds, removeId };
