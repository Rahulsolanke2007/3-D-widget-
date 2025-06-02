# 🌀 Interactive 3D Widget – Three.js + React

A sleek, interactive 3D torus widget built with **Three.js** and **React**, featuring smooth rotation, responsive UI controls, and dynamic lighting. Ideal for learning Three.js or integrating modern 3D visuals into any React app.

---

## 🚀 Features

- 🎯 Auto-rotating 3D object (Torus)
- 🖱️ Mouse hover interaction for dynamic motion
- ⏯️ Play/Pause toggle for rotation
- 🔁 Reset button for default orientation
- ⚙️ Speed adjustment slider
- 🌈 Ambient and directional lighting
- 💻 Responsive & modular component
- 🪄 Built with clean and concise custom logic

---

## 🛠️ Tech Stack

| Layer       | Tools / Libraries                    |
|-------------|--------------------------------------|
| Frontend    | React, Vite                          |
| 3D Engine   | Three.js                             |
| Styling     | Tailwind CSS                         |
| UI Icons    | Lucide React                         |
| Deployment  | Netlify / Vercel / GitHub Pages (up to you) |

---

## 📁 Project Structure

```
/src
├── components
│   └── Interactive3DWidget.jsx  # 3D logic + UI
├── App.jsx                      # Renders the widget
└── main.jsx                     # Entry point
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/interactive-3d-widget.git
cd interactive-3d-widget
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start Development Server

```bash
npm run dev
```

👉 App runs locally at:  
`http://localhost:5173`

---

## 📦 Build for Production

```bash
npm run build
```

To preview:

```bash
npm run preview
```

---

## 🌐 Environment (Optional)

If you want to expose environment variables:

```bash
# .env (optional)
VITE_API_URL=http://localhost:5173
```

---

## 🎮 Controls Summary

| Feature         | Description                              |
|----------------|------------------------------------------|
| Hover          | Interactive motion control via mouse     |
| ▶️ Play/Pause  | Toggle auto-rotation                     |
| 🔁 Reset       | Resets object rotation to default         |
| 🎚️ Speed       | Adjust rotation speed dynamically         |

---

## 🧩 Possible Improvements

- Add drag rotation via OrbitControls
- Use `SphereGeometry` / `BoxGeometry` etc.
- Export widget as a reusable NPM module
- Animate lighting or background environment

---

## 📸 Screenshots / Preview

> Add your screenshots or GIFs here

```
📷 Coming soon...
```

---

## 🚀 Deployment Tips

Deploy on:

- **Vercel**: Connect repo → Build: `npm run build`
- **Netlify**: Drag `dist/` folder or connect Git
- **GitHub Pages**: Use `vite-plugin-gh-pages` or `gh-pages` branch

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👤 Author

**Your Name**  
🔗 [GitHub](https://github.com/your-username)  
🌐 [Portfolio](https://yourportfolio.com)

---

## ✅ Done!

You’re ready to build, tweak, and ship your 3D experience!

---
