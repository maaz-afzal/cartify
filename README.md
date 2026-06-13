# Cartify — Premium Beauty & Skincare E-Commerce App

A full-stack e-commerce web application built with the **MERN stack** (MongoDB, Express, React, Node.js). Cartify offers a complete online shopping experience for beauty and skincare products — featuring product browsing, cart management, favorites, discount codes, order placement, and a full admin dashboard.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Author](#author)

---

## Live Demo

> [Click here to see live demo](https://cartify-frontend-ten.vercel.app)

---

## Features

### Customer

- Browse and search products with live search, category, and brand filters
- Paginated product listing (server-side)
- Product detail page with image, rating, tags, and quantity selector
- Add to cart, update quantity, remove items
- Save products to a favorites/wishlist list
- Apply discount codes (percentage and free shipping)
- Place orders with full shipping address form (Cash on Delivery)
- Order confirmation page with confetti animation
- Light/Dark mode toggle with localStorage persistence
- Fully responsive design — mobile and desktop

### Admin

- Secure admin-only dashboard (role-based access)
- Overview stats — total products, users, orders, and revenue
- Product management — add, edit, delete products with image URL support
- User management — view all registered users with roles
- Order management — view all orders, update order status

### Security

- JWT-based authentication with 7-day token expiry
- Password hashing with bcrypt
- Auth rate limiting on login/signup (6 requests per 15 minutes)
- Role-based middleware for admin routes
- Token auto-cleared on 401 response

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | UI library |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Axios | HTTP client with interceptors |
| Lucide React | Icon library |
| Canvas Confetti | Order success animation |
| Vite | Build tool and dev server |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express 5 | Web framework |
| MongoDB | NoSQL database |
| Mongoose | ODM for MongoDB |
| JSON Web Token | Authentication |
| bcrypt | Password hashing |
| express-validator | Request validation |
| express-rate-limit | Brute-force protection |
| dotenv | Environment config |
| cors | Cross-origin requests |

---

## Project Structure

```
cartify/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/             # Logo, images
│   │   ├── components/         # Reusable UI components
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── InputField.jsx
│   │   │   ├── Layout.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   └── ToastNotification.jsx
│   │   ├── context/            # Global state via React Context
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   ├── FavoriteContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── pages/              # Route-level page components
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   ├── Products.jsx
│   │   │   │   └── Users.jsx
│   │   │   ├── AboutUs.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── ContactUs.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── ProductDetail.jsx
│   │   │   └── Signup.jsx
│   │   ├── services/           # Axios API calls
│   │   │   ├── api.js
│   │   │   ├── adminService.js
│   │   │   ├── authService.js
│   │   │   ├── cartService.js
│   │   │   ├── discountService.js
│   │   │   ├── favoriteService.js
│   │   │   ├── orderService.js
│   │   │   └── productService.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    └── src/
        ├── controllers/        # Route handler logic
        │   ├── adminController.js
        │   ├── authController.js
        │   ├── CartController.js
        │   ├── discountController.js
        │   ├── favoriteController.js
        │   ├── OrderController.js
        │   └── productController.js
        ├── middlewares/        # Auth, admin, rate limiting
        │   ├── adminMiddleware.js
        │   ├── authMiddleware.js
        │   └── rateLimiter.js
        ├── models/             # Mongoose schemas
        │   ├── Cart.js
        │   ├── Favorite.js
        │   ├── Order.js
        │   ├── Product.js
        │   └── User.js
        ├── routes/             # Express route definitions
        │   ├── adminRoutes.js
        │   ├── authRoutes.js
        │   ├── cartRoutes.js
        │   ├── discountRoutes.js
        │   ├── favoriteRoutes.js
        │   ├── orderRoutes.js
        │   └── productRoutes.js
        ├── app.js
        ├── server.js
        └── package.json
```

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/) — local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/cartify.git
cd cartify
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Environment Variables](#environment-variables)).

```bash
npm run dev
```

Backend runs on `http://localhost:3000` by default.

### 3. Set Up the Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` by default.

---

## Environment Variables

### Backend — `backend/.env`

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/cartify
JWT_SECRET=your_jwt_secret_key_here
FRONTEND_URL=http://localhost:5173
```

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server |
| `MONGODB_URL` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWTs |
| `FRONTEND_URL` | Frontend origin for CORS |

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:3000
```

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

---

## API Reference

All protected routes require a `Bearer` token in the `Authorization` header.

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/products` | No | Get all products (paginated, filterable) |
| GET | `/api/products/:id` | No | Get single product by ID |

**Query params for GET `/api/products`:**
`page`, `limit`, `search`, `category`, `brand`

### Cart

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/cart` | Yes | Get user's cart |
| POST | `/api/cart` | Yes | Add item to cart |
| PUT | `/api/cart/:productId` | Yes | Update item quantity |
| DELETE | `/api/cart/:productId` | Yes | Remove item from cart |
| DELETE | `/api/cart/clear` | Yes | Clear entire cart |

### Favorites

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/favorites` | Yes | Get user's favorites |
| POST | `/api/favorites` | Yes | Add product to favorites |
| DELETE | `/api/favorites/:productId` | Yes | Remove from favorites |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/orders` | Yes | Place a new order |
| GET | `/api/orders/my-orders` | Yes | Get current user's orders |
| GET | `/api/orders/:id` | Yes | Get single order by ID |

### Discount

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/discount/apply` | Yes | Apply a discount code |
| DELETE | `/api/discount/remove` | Yes | Remove applied discount |
| GET | `/api/discount/info` | Yes | Get current discount info |

### Admin (Admin role required)

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/admin/stats` | Dashboard stats |
| GET | `/api/admin/products` | All products |
| POST | `/api/admin/products` | Add new product |
| PUT | `/api/admin/products/:id` | Update product |
| DELETE | `/api/admin/products/:id` | Delete product |
| GET | `/api/admin/users` | All users |
| GET | `/api/admin/orders` | All orders |
| PUT | `/api/admin/orders/:id/status` | Update order status |

---

## Screenshots

### Home Page:
<img width="1900" height="1080" alt="home-page" src="https://github.com/user-attachments/assets/39384ba9-b077-4e94-bbdd-337340514ad1" />

---

### Cart Page:
<img width="1910" height="1020" alt="cart-page" src="https://github.com/user-attachments/assets/1e49e099-7a3e-4f62-b559-f16eb72002ff" />

---

### Product Detail:
<img width="1905" height="661" alt="product-detail" src="https://github.com/user-attachments/assets/0a0aacab-bf68-496c-a63b-ae89eb70b63d" />

---

### Admin Dasboard:
<img width="1901" height="1080" alt="admin-product" src="https://github.com/user-attachments/assets/721be4a3-6211-49b9-b4b3-b76f3b2b3a26" />

---

### Admin Products:
<img width="1920" height="1080" alt="admin-dashboard" src="https://github.com/user-attachments/assets/2d0aa2f7-dcea-48dc-a38e-7d688a6ded99" />

---

## Author

**Maaz** — MERN Stack Developer

- GitHub: [@maaz-afzal](https://github.com/maaz-afzal)

---

## License

This project is open source and available under the [MIT License](LICENSE).
