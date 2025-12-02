
---

## 🎨 2) Frontend README (for `buyzzar-frontend`)

```md
# 🛒 Buyzzar Frontend

Buyzzar is a modern e-commerce frontend built with **React**, integrated with a Node.js/Express backend and deployed on **Vercel**.

Backend: https://buyzzar-backend.onrender.com  
Live site: https://buyzzar-frontend-sigma.vercel.app/

---

## 🚀 Features

- Responsive e-commerce UI
- User authentication (login / signup) integrated with backend (HttpOnly cookies)
- Protected routes for user profile & orders
- Product pages:
  - Category-wise listing
  - Search & filter
  - Product detail page
- Shopping cart UI:
  - Add to cart
  - Update quantity
  - Remove items
- Razorpay payment integration (checkout flow)
- My Orders page (user order history)
- Admin features (if enabled in UI):
  - Manage users
  - Manage products (CRUD, with Cloudinary image upload)

---

## 🏗️ Tech Stack

- **Framework:** React
- **State Management:** (Redux Toolkit / Context API – whichever you used)
- **Routing:** React Router
- **Styling:** Tailwind CSS / DaisyUI (update according to your setup)
- **HTTP Client:** Axios
- **Deployment:** Vercel

---

## 📁 Project Structure

```bash
buyzzar-frontend/
├─ src/
│  ├─ common/
│  │  └─ index.js          # SummaryApi (API endpoints)
│  ├─ helper/
│  │  └─ api.js            # axiosInstance with baseURL + withCredentials
│  ├─ components/
│  │  ├─ Header/
│  │  ├─ Footer/
│  │  ├─ ProductCard/
│  │  ├─ Cart/
│  │  └─ ...
│  ├─ pages/
│  │  ├─ Home/
│  │  ├─ Login/
│  │  ├─ Signup/
│  │  ├─ ProductDetails/
│  │  ├─ CartPage/
│  │  ├─ MyOrders/
│  │  └─ Admin/
│  ├─ store/               # Redux store (if using Redux)
│  ├─ App.js
│  └─ index.js
├─ .env
├─ package.json
└─ README.md
