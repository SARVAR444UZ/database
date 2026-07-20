const express = require('express');
const { addId, getAllIds } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Cheklovsiz - rate limiter yo'q, xohlagancha so'rov qabul qilinadi

// GET /idadd=123  -> id'ni bazaga saqlaydi
app.get('/idadd=:id', (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({ success: false, error: 'id kiritilmagan' });
  }

  const isNew = addId(id);

  res.json({
    success: true,
    id: id,
    isNew: isNew,
    message: isNew ? "ID muvaffaqiyatli saqlandi" : "Bu ID allaqachon bazada mavjud"
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
      check: '/idchecks'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});
