# 🧩 Interactive 3D Widget with Three.js and React

A responsive and interactive 3D widget built using **Three.js** and **React**, showcasing a torus geometry that users can rotate by hovering over it. Includes controls to **play/pause** rotation, adjust **rotation speed**, and **reset orientation**. Built using **Vite** and styled with **Tailwind CSS**.

---

## ✨ Features

- 🎯 Real-time 3D rendering using `three.js`
- 🌀 Smooth auto-rotation with speed control
- 🎮 Interactive behavior on hover (responds to mouse movement)
- ⏸️ Play/Pause toggle for rotation animation
- 🔄 Reset button to bring geometry back to default position
- 📱 Fully responsive & styled with Tailwind CSS

---

## 📸 Preview

![Interactive 3D Widget Preview](https://your-preview-image-url.com) <!-- Replace with actual screenshot or demo GIF -->

---

## 🚀 Getting Started

Follow these steps to set up the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/your-username/interactive-3d-widget.git
cd interactive-3d-widget
2. Install dependencies
Make sure you have Node.js installed. Then run:

bash
Copy
Edit
npm install
3. Start the development server
bash
Copy
Edit
npm run dev
This will start Vite and host the app at http://localhost:5173 (or similar). It supports hot-reloading during development.

🧱 Built With
Tech	Description
React	UI library for building interactive UIs
Three.js	3D graphics library for rendering in WebGL
Vite	Fast frontend build tool and dev server
Tailwind CSS	Utility-first CSS framework
Lucide React	Clean and consistent icon pack

🛠 Folder Structure
pgsql
Copy
Edit
src/
├── components/
│   └── Interactive3DWidget.jsx  # The main 3D widget component
├── App.jsx                      # App wrapper
└── main.jsx                     # Entry point
⚙️ Customization
You can easily extend or tweak:

🎨 Color and material of the geometry (MeshPhongMaterial)

🔺 Geometry type (TorusGeometry, BoxGeometry, etc.)

⚙️ Rotation behavior or add gesture support (drag/scroll)

🧪 Future Improvements
✋ Add drag-to-rotate support with OrbitControls

🌌 Add stars or space background

📦 Publish as reusable NPM component

📦 Production Build
To create an optimized production build:

bash
Copy
Edit
npm run build
To preview the production build locally:

bash
Copy
Edit
npm run preview
🧑‍💻 Author
Your Name
GitHub: @your-username
Portfolio: your-portfolio.com

