# ☕ Get Me A Chai

A full-stack creator support platform inspired by Buy Me A Coffee and Patreon. Creators can receive donations from supporters through Razorpay, manage their profiles, and track contributions in real time.

## 🚀 Live Demo

https://get-me-a-chai.vercel.app

## ✨ Features

### Authentication

* GitHub OAuth Login
* Google OAuth Login
* Secure session management using NextAuth

### Creator Profiles

* Unique creator pages (`/username`)
* Custom profile picture and cover image
* Personalized creator URLs
* Dynamic metadata for SEO

### Dashboard

* Update profile information
* Change username
* Manage Razorpay credentials
* Customize profile and cover images

### Payments

* Razorpay integration
* Secure payment verification
* Donation messages
* Real-time supporter updates
* Creator-specific Razorpay accounts

### Supporters

* Top supporters leaderboard
* Total donations received
* Total amount raised
* Personalized donation messages

### Search

* Search creators by username
* Quick navigation to creator pages

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* Tailwind CSS

### Backend

* Next.js Server Actions
* NextAuth.js
* MongoDB
* Mongoose

### Payments

* Razorpay

### Deployment

* Vercel
* MongoDB Atlas

---

## 📂 Project Structure

```bash
app/
├── dashboard/
├── login/
├── [username]/
├── api/
│   └── auth/
│   └── razorpay/
actions/
models/
components/
db/
```

---

## 🔒 Authentication Flow

1. User signs in using GitHub or Google.
2. New users are automatically added to MongoDB.
3. Username is generated from the email prefix.
4. Sessions are managed using NextAuth.

---

## 💳 Payment Flow

1. Supporter visits a creator page.
2. Enters donation amount and message.
3. Razorpay order is generated.
4. Payment is verified securely.
5. Donation is stored in MongoDB.
6. Supporter list updates automatically.

---

## ⚙️ Environment Variables

```env
MONGODB_URI=

NEXTAUTH_URL=
NEXTAUTH_SECRET=

GITHUB_ID=
GITHUB_SECRET=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXT_PUBLIC_URL=
```

---

## 🧠 Key Learnings

* OAuth Authentication with NextAuth
* Dynamic Routing in Next.js App Router
* MongoDB Data Modeling
* Razorpay Payment Gateway Integration
* Server Actions
* Production Deployment on Vercel
* Managing User Sessions
* Secure Payment Verification

---

## 👨‍💻 Author

Akshat Mishra

Built as a full-stack learning project to explore authentication, payments, and scalable web application development.
