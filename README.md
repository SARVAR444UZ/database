# ID API

Oddiy REST API: ID'larni qo'shish va ularning ro'yxatini ko'rish uchun. SQLite bazasidan foydalanadi (qo'shimcha DB serverga ehtiyoj yo'q).

## Endpointlar

| Metod | Yo'l | Vazifasi |
|---|---|---|
| GET | `/idadd=<ID>` | Berilgan ID'ni bazaga saqlaydi |
| GET | `/idchecks` | Bazadagi barcha ID'larni JSON formatida qaytaradi |

### Misollar

```
GET https://sizning-domeningiz.com/idadd=12345
```
Javob:
```json
{ "success": true, "id": "12345", "isNew": true, "message": "ID muvaffaqiyatli saqlandi" }
```

```
GET https://sizning-domeningiz.com/idchecks
```
Javob:
```json
{
  "success": true,
  "count": 2,
  "ids": [
    { "id": "456", "created_at": "2026-07-20 07:12:37" },
    { "id": "123", "created_at": "2026-07-20 07:10:01" }
  ]
}
```

Cheklov (rate limit) yo'q — istalgancha so'rov yuborsa bo'ladi.

## Lokal ishga tushirish

```bash
npm install
npm start
```

Server standart holda `3000`-portda ishlaydi (`PORT` environment variable orqali o'zgartirish mumkin).

## GitHub'ga yuklash

```bash
git init
git add .
git commit -m "Boshlang'ich versiya"
git branch -M main
git remote add origin https://github.com/FOYDALANUVCHI_NOMI/REPO_NOMI.git
git push -u origin main
```

## Deploy qilish (bepul variantlar)

### Railway.app
1. https://railway.app -> "New Project" -> "Deploy from GitHub repo"
2. Repo'ni tanlang, Railway avtomatik aniqlaydi va deploy qiladi
3. "Settings" -> "Generate Domain" orqali ochiq domen oling

### Render.com
1. https://render.com -> "New" -> "Web Service"
2. GitHub repo'ni ulang
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Deploy tugmasini bosing

**Eslatma:** Bepul tariflarda ko'pincha disk vaqtinchalik bo'ladi — server qayta ishga tushganda (masalan, yangi deploy yoki uyqu holatidan chiqqanda) `ids.db` fayli tozalanishi mumkin. Agar ma'lumotlar doimiy saqlanishi kerak bo'lsa, Railway yoki Render'da "Persistent Disk/Volume" qo'shish kerak, yoki PostgreSQL kabi tashqi bazaga o'tish tavsiya etiladi — shunday bo'lsa ayting, shu variantni ham tayyorlab beraman.
