import React from 'react';
import ReactDOM from 'react-dom/client';
import '../css/index.css'
import Popup from './Popup';




const root = document.createElement("div")
root.className = "container"
document.body.appendChild(root)
const rootDiv = ReactDOM.createRoot(root);
rootDiv.render(
  <React.StrictMode>
    <Popup/>
  </React.StrictMode>
);