# 👗 FashionSphere (Node.js & EJS)

FashionSphere is a full-stack web application built with **Node.js**, **Express.js**, **MongoDB**, and **EJS**. It is designed as a modern e-commerce platform for a fashion store, offering both a customer interface and an admin panel.

---

## 📸 Project Overview

This application enables customers to browse fashion products, view details, manage their cart, and register an account. Admin users can manage the product catalog, users, and orders via a protected dashboard.

---

## ✨ Features

### 👤 User (Customer)
- Register / Login
- View product listings
- See product details
- Add/remove items from cart
- Access and update personal profile

### 🔐 Admin
- Secure admin authentication
- Add, update, delete products
- Manage user accounts
- Access admin dashboard

---

## 🗂️ Project Structure

```
FashionSphere-ejs/
├── Contrôleurs/           # Controllers (Business logic)
│   ├── AdminController.js
│   ├── CartController.js
│   ├── ProductController.js
│   └── UserController.js
├── Modèles/               # Mongoose Models
│   ├── Admin.js
│   ├── Cart.js
│   ├── Product.js
│   └── User.js
├── Routes/                # Express Routes
├── Views/                 # EJS templates (front-end)
├── public/                # Static assets (CSS, images, JS)
├── package.json           # Project metadata & dependencies
├── package-lock.json
└── server.js              # Main server file
```

---

## 💻 Technologies Used

- **Back-end:** Node.js, Express.js
- **Front-end:** HTML5, CSS3, JavaScript, EJS
- **Database:** MongoDB (via Mongoose)
- **Authentication:** Custom (via sessions or tokens)
- **View Engine:** EJS (Embedded JavaScript)

---

## ⚙️ Installation Guide

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/fashionsphere-node.git
cd fashionsphere-node
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up MongoDB:**
- Make sure MongoDB is installed and running.
- Create a database named `fashionsphere` or update the MongoDB URI in `server.js` or a `.env` file (if used).

4. **Start the development server:**
```bash
node server.js
```

5. **Visit the application:**
```
http://localhost:3000/
```

---

## 🔐 Default Admin Login (if available)

- **Username:** admin  
- **Password:** admin123  
*(Change these in the database after setup)*

---

## 👨‍💻 Author

- **Name:** Bouhraoua Sami  
- **Email:** samibouhraoua5@gmail.com  
- **Status:** Full-Stack Web & Mobile Developer  
- **Year:** 2025  

---

## 📄 License

This project is released under the **MIT License**.  
Feel free to use, modify, and distribute it for personal or educational use.

---

## 🎯 Educational Purpose

This project was created to:
- Learn MVC architecture with Node.js
- Practice MongoDB database modeling
- Implement user authentication and session management
- Build a full-stack EJS-rendered application

---

## 📬 Contact

For any questions or suggestions, feel free to reach out:  
📧 **samibouhraoua5@gmail.com**

---
