import React from "react";
import Footer from "./components/Footer";
import Actualite from "./pages/Actualite";
import ActualiteDetails from "./pages/ActualiteDetails";
import AdminActualiteAdd from "./pages/AdminActualiteAdd";
import AdminActualiteDetails from "./pages/AdminActualiteDetails";
import AdminActualiteList from "./pages/AdminActualiteList";
import AdminAvisAdd from "./pages/AdminAvisAdd";
import AdminAvisList from "./pages/AdminAvisList";
import AdminProductAdd from "./pages/AdminProductAdd";
import AdminProductDetails from "./pages/AdminProductDetails";
import AdminProducts from "./pages/AdminProducts";
import AdminSalonAdd from "./pages/AdminSalonAdd";
import AdminSalonList from "./pages/AdminSalonList";
import AdminUsers from "./pages/AdminUsers";
import Apropos from "./pages/Apropos";
import Cart from "./pages/Cart";
import CommandDetails from "./pages/CommandDetails";
import CommandList from "./pages/CommandList";
import ContactUs from "./pages/ContactUs";
import DetailProduit from "./pages/DetailProduit";
import Home from "./pages/Home";
import Inscription from "./pages/Inscription";
import Login from "./pages/Login";
import Marketplace from "./pages/Marketplace";
import SalonDelails from "./pages/SalonDelails";
import SalonListe from "./pages/SalonListe";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/actualite" element={<Actualite />} />
        <Route path="/actualiteDetails/:id" element={<ActualiteDetails />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/commandDetails/:id" element={<CommandDetails />} />
        <Route path="/commandList" element={<CommandList />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/salonDelails/:id" element={<SalonDelails />} />
        <Route path="/salonListe" element={<SalonListe />} />
        <Route path="/detailproduit/:id" element={<DetailProduit />} />

        <Route path="/apropos" element={<Apropos />} />
        <Route path="/adminavislist" element={<AdminAvisList />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
