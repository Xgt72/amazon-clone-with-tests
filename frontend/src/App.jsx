import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Layout from "@pages/Layout";
import Login from "@pages/Login";
import Register from "@pages/Register";
import LinkPage from "@pages/LinkPage";
import Unauthorized from "@pages/Unauthorized";
import Home from "@pages/Home";
import Editor from "@pages/Editor";
import Admin from "@pages/Admin";
import Lounge from "@pages/Lounge";
import Missing from "@pages/Missing";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route path="/" element={<Home />} />
        <Route path="editor" element={<Editor />} />
        <Route path="admin" element={<Admin />} />
        <Route path="lounge" element={<Lounge />} />

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}
