const express = require('express');
const { addId, getAllIds, removeId } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Cheklovsiz - rate limiter yo'q, xohlagancha so'rov qabul qilinadi

// GET /idadd=123  -> id'ni bazaga saqlaydi (takroriy id qabul qilinmaydi)
app.get('/idadd=:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ success: false, error: 'id kiritilmagan' });
  }

  const isNew = addId(id);

  if (!isNew) {
    return res.status(409).json({
      success: false,
      id: id,
      message: "Bu ID allaqachon bazada mavjud, qayta qo'shilmadi"
    });
  }

  res.json({
    success: true,
    id: id,
    message: "ID muvaffaqiyatli saqlandi"
  });
});

// GET /remove=123 -> id'ni ro'yxatdan o'chiradi
app.get('/remove=:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ success: false, error: 'id kiritilmagan' });
  }

  const wasRemoved = removeId(id);

  if (!wasRemoved) {
    return res.status(404).json({
      success: false,
      id: id,
      message: "Bunday ID bazada topilmadi"
    });
  }

  res.json({
    success: true,
    id: id,
    message: "ID muvaffaqiyatli o'chirildi"
  });
});

// GET /idchecks -> barcha id'larni JSON formatida qaytaradi
app.get('/idchecks', (req, res) => {
  const ids = getAllIds();
  res.json({
    success: true,
    count: ids.length,
    ids: ids
  });
});

// Asosiy sahifa (tekshirish uchun)
app.get('/', (req, res) => {
  res.json({
    status: 'ishlayapti',
    endpoints: {
      add: '/idadd=<ID>',
      check: '/idchecks',
      remove: '/remove=<ID>'
    }
  });
});

// Vercel'da server o'zi funksiyani chaqiradi, shuning uchun listen kerak emas.
// Lokal kompyuterda esa (npm start) odatdagidek portda ishga tushadi.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server ${PORT}-portda ishga tushdi`);
  });
}

module.exports = app;
