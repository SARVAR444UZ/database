const Database = require('better-sqlite3');
const path = require('path');

// Bitta fayl - ma'lumotlar shu yerda saqlanadi (deploy qilinganda ham qoladi,
// agar platforma persistent disk bersa; aks holda har deploy'da tozalanadi)
const db = new Database(path.join(__dirname, 'ids.db'));

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

module.exports = { addId, getAllIds };
