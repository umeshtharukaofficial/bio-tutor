import React from 'react';
import { createRoot } from 'react-dom/client';
import Anatomy3D from './components/Anatomy3D.jsx';
import './components/Anatomy3D.css';

const container = document.getElementById('anatomy3d-root');
if (container) {
  const root = createRoot(container);
  root.render(<Anatomy3D />);
}
