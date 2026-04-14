# 🧳 SUITCASE – Court Fee & Case Manager

**A Complete Office Suite for Advocates**
Built by **VK Tax & Law Chamber®**

---

## 📌 Overview

**SUITCASE** is a comprehensive LegalTech application designed for advocates, law firms, and legal professionals. It simplifies legal office operations by integrating invoice management, client ledgers, court fee calculations, GST reporting, and secure online payments into a single platform.

---

## 🚀 Key Features

### 📊 Case & Financial Management

* Invoice Generation and Management
* Automatic Invoice Numbering
* Client Ledger Integration
* GST & Income Reports Dashboard
* Court Fee Calculator

### 💳 Payment Integration

* Razorpay Payment Links
* Secure Online Transactions
* Payment Status Tracking

### 📧 Communication Tools

* Email Invoice Delivery
* WhatsApp Invoice Sharing
* Downloadable PDF Invoices

### ☁️ Cloud & Deployment

* Supabase Database Integration
* Vercel Deployment Support
* Android APK via Capacitor

### 🔐 Compliance & Security

* Google Play Store Compliance Ready
* Data Safety and Privacy Policies
* Secure API Integrations

---

## 🛠️ Tech Stack

| Technology        | Purpose                |
| ----------------- | ---------------------- |
| React (Vite)      | Frontend Framework     |
| Supabase          | Backend & Database     |
| Razorpay          | Payment Gateway        |
| Node.js & Express | Backend Services       |
| jsPDF             | PDF Invoice Generation |
| EmailJS           | Email Delivery         |
| Capacitor         | Android APK Conversion |
| Vercel            | Cloud Deployment       |

---

## 📁 Project Structure

```
SUITCASE/
│
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── hooks/
│   ├── context/
│   ├── routes/
│   ├── styles/
│   ├── config/
│   └── constants/
│
├── server/
├── supabase/
├── docs/
├── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/SUITCASE.git
cd SUITCASE
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env` file based on `.env.example`.

### 4️⃣ Start the Development Server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

## 🗄️ Supabase Database Setup

Run the following SQL in the Supabase SQL Editor:

```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  gst_amount NUMERIC DEFAULT 0,
  total_amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Deployment

### Vercel Deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add environment variables.
4. Click **Deploy**.

---

## 📱 Android APK (Capacitor)

```bash
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npm run build
npx cap copy
npx cap open android
```

---

## 🔐 Environment Variables

Refer to `.env.example` for configuration details.

---

## 📚 Documentation

| Document         | Description                    |
| ---------------- | ------------------------------ |
| Brand Kit        | SUITCASE Branding Assets       |
| Compliance Guide | Google Play Store Requirements |
| Deployment Guide | Vercel Deployment Instructions |

---

## 🤝 Contribution Guidelines

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Submit a pull request.

---

## 📜 License

This project is proprietary software owned by **VK Tax & Law Chamber®**. Unauthorized reproduction or distribution is prohibited.

---

## 👨‍💼 Author

**VK Tax & Law Chamber®**
Developed by Vipin Kumar

📧 Contact: [support@suitcaselegal.com](mailto:support@suitcaselegal.com)
🌐 Website: https://suitcaselegal.com

---

## ⭐ Support the Project

If you find this project useful, please consider giving it a ⭐ on GitHub.
