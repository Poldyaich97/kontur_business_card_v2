import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { CardViewer } from "./pages/CardViewer";
import { AdminPanel } from "./pages/AdminPanel";
import { CardRequestProvider } from "./context/CardRequestContext";

function App() {
  return (
    <CardRequestProvider>
      <HashRouter>
        <Routes>
          <Route path="/card/:id" element={<CardViewer />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/" element={<Navigate to="/card/1" replace />} />
        </Routes>
      </HashRouter>
    </CardRequestProvider>
  );
}

export default App;
