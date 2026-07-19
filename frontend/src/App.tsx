import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import Header from "./components/Header";
import Login from "./components/Login";
import { Home } from "./components/Home";
import { Toaster } from "sonner";

export default function App() {
  return (
    <>
      <Toaster position="bottom-right" richColors />
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
