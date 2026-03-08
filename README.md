# PetCare Hub 🐾

PetCare Hub is a modern, full-stack MERN application that allows pet owners to meticulously manage their pets' profiles, medical needs, dietary instructions, and vet details.

With a meticulously designed, aesthetic UI, pet owners can generate a unique Care Link and an interactive QR Code for each pet. This makes it incredibly easy to share vital care instructions with a pet sitter, friend, or family member—all they have to do is scan the code!

## ✨ Features

- **Secure Authentication:** User login and registration powered by JSON Web Tokens (JWT).
- **Pet Management Dashboard:** Add, edit, view, and delete detailed pet profiles.
- **Premium UI / UX:** Beautifully crafted components featuring translucent glassmorphism, dynamic grids, and custom background aesthetics.
- **Public Care Profiles:** Pet details can be shared securely via a public link so sitters don't need to log in to read instructions.
- **Instant QR Code Sharing:** Automatically generates a scannable QR code of the public care link. Designed to work flawlessly over local networks so sitters can instantly pull up the pet's profile on their phone!

## 🛠️ Tech Stack

**Frontend:**
- React
- React Router DOM
- CSS3 (Vanilla, custom grid/flexbox layouts)
- Axios
- `qrcode.react` (for dynamic QR generation)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Token (JWT)
- bcryptjs
- Cors

## 🚀 Getting Started

Follow these instructions to set up the app on your local machine.

### Prerequisites
- Node.js
- MongoDB (Running locally or via MongoDB Atlas)

### 1. Backend Setup (Server)
Navigate to the `server` directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the root of the `server` directory and configure the following variables:
```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
node server.js
```
*(The server will typically run on `http://localhost:8000`)*

### 2. Frontend Setup (Client)
Open a new terminal and navigate to the `client` directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```

## 📱 How to Use the QR Code Feature Locally

To successfully scan the QR code with your mobile phone while developing locally, follow these steps:

1. Ensure your computer and your phone are connected to the **exact same WiFi network**.
2. When you start the React app (`npm start`), look for the **"On Your Network"** IP address in the terminal (e.g., `http://192.168.1.X:3000`).
3. Open *that exact IP address* in your computer's browser instead of using `localhost:3000`.
4. Log in, go to your "My Pets" page, and click **Show QR Code**.
5. Scan it with your phone! The public, unauthenticated pet profile will open on your mobile browser instantly.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
