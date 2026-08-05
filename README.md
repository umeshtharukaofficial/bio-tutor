# 🧬 BioTutor AI — Sri Lanka A/L Biology Tutor Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)]()
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Mobile%20Responsive-purple.svg)]()

**BioTutor AI** is a comprehensive, interactive biology learning application designed specifically for **Sri Lanka G.C.E. Advanced Level (A/L) Biology students** (Grade 12 & Grade 13 curriculum based on the official National Institute of Education Resource Books).

---

## 🌟 Key Features

- **🤖 AI Tutor Chat (`pages/chat.html`)**: Interactive real-time study assistant powered by DeepSeek API (`deepseek-chat`) with strict Sinhala ZWJ spelling system rules (e.g. `න්‍යෂ්ටිය`, `ක්‍රෝමෝසෝමය`).
- **🧬 Interactive 3D Organ Systems Visualizer (`pages/anatomy.html`)**:
  - WebGL 3D anatomical viewer for **Unit 5 (Animal Form & Function)**: Digestive, Circulatory, Respiratory, Excretory, and Nervous systems.
  - GLTF/GLB 3D model loading with custom procedural organic fallback shaders.
  - Smooth camera target focus & glowing green emissive highlighting on organ sub-part selection.
  - Full **Bilingual State Synchronization** (`English` & `සිංහල`).
- **📝 MCQ Practice Engine (`pages/quiz.html`)**: Built-in bank of A/L biology questions, countdown timers, wrong-answer review, and AI question generation.
- **🎴 3D Smart Flashcards (`pages/flashcards.html`)**: Spaced Repetition System (SRS rating: *Again, Hard, Good, Easy*) with 3D flip card animations and AI elaboration.
- **📚 Interactive Curriculum Navigator (`pages/topics.html`)**: Complete Grade 12 & 13 Sri Lanka A/L unit breakdown.
- **📊 Progress & Analytics (`pages/progress.html`)**: Accuracy stats, session logs, and AI study plan recommendations.
- **📱 100% Mobile & Tablet Responsive**: Fully optimized for touch displays, smartphones, and web viewports.

---

## ⚠️ Important Note: Active Work-in-Progress & Process Limitations

While the core web application, 3D visualizers, quiz engine, and offline flashcard decks are fully functional, please note the following **limitations and active development processes**:

> [!NOTE]
> 1. **API Key Requirement for Live AI Generation**:
>    - The AI Chat, AI MCQ Generator, and AI Flashcard elaborator require a valid DeepSeek API key starting with `sk-` configured in LocalStorage via the sidebar settings modal. Without a configured key, fallback preloaded data or key configuration prompts are displayed.
> 2. **3D Model Asset Fallbacks**:
>    - 3D Organ System GLTF models are loaded via local/CDN paths. If external `.glb` files fail to load due to network restrictions, the viewer automatically switches to procedural 3D Bezier extruded organic meshes.
> 3. **Sinhala ZWJ Rendering Differences on Older Devices**:
>    - Sinhala technical terminology uses Zero-Width Joiners (`\u200D`). On older mobile operating systems, conjunct consonants (e.g. `න්‍ය`, `ක්‍ර`) may render as un-joined glyphs depending on system font support.
> 4. **Local Development Server Dependency for Heavy Assets**:
>    - When accessing directly via static `file://` protocol, some browser security policies (CORS) may block WebGL GLTF file loading. Run a local HTTP server (`python3 -m http.server 9090` or `npm run dev`) or host on GitHub Pages for full functionality.

---

## 🚀 Quick Setup & Local Running

1. **Clone the repository**:
   ```bash
   git clone https://github.com/umeshtharukaofficial/bio-tutor.git
   cd bio-tutor
   ```

2. **Run locally using Vite or Python HTTP Server**:
   ```bash
   # Using Python:
   python3 -m http.server 9090

   # Or using Node.js / Vite:
   npm install
   npm run dev
   ```

3. **Access in browser**:
   Open `http://localhost:9090` or `http://localhost:5173`

---

## 🌐 Live Hosted Link

Visit the official live site on GitHub Pages:
**[https://umeshtharukaofficial.github.io/bio-tutor/](https://umeshtharukaofficial.github.io/bio-tutor/)**

---

## 📄 License
This project is open-source under the [MIT License](LICENSE).
