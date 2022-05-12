import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "@contexts/AuthProvider";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </AuthContextProvider>
  </BrowserRouter>
);
