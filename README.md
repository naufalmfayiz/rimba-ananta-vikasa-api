# RAV API

API sederhana untuk manajemen data pengguna menggunakan Node.js, Express, dan Sequelize dengan PostgreSQL sebagai database.

---

## **Fitur**

- CRUD (Create, Read, Update, Delete) untuk entitas **User**.
- Validasi input menggunakan middleware.
- Logging request ke file log.
- Pengujian endpoint menggunakan Jest.
- Terintegrasi dengan database PostgreSQL menggunakan Sequelize ORM.

---

## **Persyaratan**

- **Node.js**: >= 14.x
- **PostgreSQL**: >= 12.x
- **npm** atau **yarn**

---

## **Instalasi dan Menjalankan Aplikasi**

### **1. Clone Repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Buat Database**

```bash
npx sequelize-cli db:create
npx sequelize-cli db:create --env test
```

### **4. Migrasi**

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate --env test
```

### **5. Jalankan Server**

```bash
npm run dev
```

## **Pengujian**

```bash
npm test
```
