# 🧾 Stripe Connect OAuth + Next.js (App Router)

A full-stack project using **Next.js App Router**, **Prisma**, and **Stripe Connect OAuth** to authenticate users and manage multiple Stripe accounts per user.

---

## ⚙️ Features

* ✅ Stripe Connect (Standard Account OAuth)
* ✅ Cookie-based user login (mock session)
* ✅ Dashboard to manage connected Stripe accounts
* ✅ Stripe account detail page with live data
* ✅ Prisma ORM + SQLite
* ✅ Tailwind CSS for styling

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd stripe-oauth-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_CLIENT_ID=ca_...
NEXT_PUBLIC_STRIPE_CLIENT_ID=ca_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
```

🔐 Get your credentials from [Stripe Dashboard → Connect Settings](https://dashboard.stripe.com/test/connect/settings)

✅ Also ensure this redirect URI is added in your Stripe Connect settings:

```
http://localhost:3000/api/stripe/callback
```

---

### 4. Initialize the Database

```bash
npx prisma generate
npx prisma migrate dev --name init
# or
npx prisma db push
```

To open the Prisma GUI:

```bash
npx prisma studio
```

### 5. Seed a Mock User (optional)

Use the seed route to insert a test user with ID `test_user`:

```bash
curl http://localhost:3000/api/seed
```

> Or run equivalent Prisma insert manually via `npx prisma studio` or a script.

---

### 6. Start the Development Server

```bash
npm run dev
```

Visit: [http://localhost:3000](http://localhost:3000)

---

## 🧪 How It Works

1. Go to `/login` and enter any email
2. A user is created and logged in via a cookie
3. Navigate to `/dashboard` to view connected Stripe accounts
4. Click **Connect with Stripe** to start OAuth
5. Complete the Stripe onboarding process
6. You are redirected to `/success` (with optional message if already linked)
7. Click any account to view detailed Stripe info in `/account/[id]`

---

## 🛠 Tech Stack

* Next.js 15 (App Router)
* Stripe OAuth2 (Connect Standard)
* Prisma + SQLite
* Tailwind CSS
* Simple cookie-based session (can be replaced with NextAuth or Clerk)

---

## 📄 License

MIT © 2025