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
import Settings from "./pages/Settings";
import MesCommandes from "./pages/MesCommandes";
import MesSalons from "./pages/MesSalons";
import UpdatePassword from "./pages/UpdatePassword";
import AdminCommandDetails from "./pages/AdminCommandDetails";
import AdminCommandList from "./pages/AdminCommandList";
import AdminCategoryList from "./pages/AdminCategoryList";
import AdminCategoryAdd from "./pages/AdminCategoryAdd";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategoryEdit from "./pages/AdminCategoryEdit";
import AdminSalonDetails from "./pages/AdminSalonDetails";
import AdminSalonEdit from "./pages/AdminSalonEdit";
import AdminActualiteEdit from "./pages/AdminActualiteEdit";
import Verification from "./pages/Verification";
import MessageVerfiMail from "./pages/MessageVerfiMail";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/messageverifmail" element={<MessageVerfiMail />} />
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/actualite" element={<Actualite />} />
        <Route path="/actualiteDetails/:id" element={<ActualiteDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/commandDetails/:id" element={<CommandDetails />} />
        <Route path="/verificationUser/:id" element={<Verification />} />
        <Route path="/commandList" element={<CommandList />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/inscription" element={<Inscription />} />
        <Route path="/salonDelails/:id" element={<SalonDelails />} />
        <Route path="/salonListe" element={<SalonListe />} />
        <Route path="/detailproduit/:id" element={<DetailProduit />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/mesCommandes" element={<MesCommandes />} />
        <Route path="/mesSalons" element={<MesSalons />} />
        <Route path="/updatePassword" element={<UpdatePassword />} />

        <Route path="/apropos" element={<Apropos />} />
        <Route path="/adminavislist" element={<AdminAvisList />} />
        <Route path="/adminaddproduct" element={<AdminProductAdd />} />
        <Route
          path="/adminactualitedetails/:id"
          element={<AdminActualiteDetails />}
        />
        <Route
          path="/adminactualityedit/:id"
          element={<AdminActualiteEdit />}
        />
        <Route path="/adminactualiteadd" element={<AdminActualiteAdd />} />
        <Route path="/adminactualitelist" element={<AdminActualiteList />} />
        <Route path="/adminavisadd" element={<AdminAvisAdd />} />
        <Route
          path="/adminproductdetails/:id"
          element={<AdminProductDetails />}
        />
        <Route path="/adminproducts" element={<AdminProducts />} />
        <Route path="/adminaddsalon" element={<AdminSalonAdd />} />
        <Route path="/adminsalonlist" element={<AdminSalonList />} />

        <Route path="/admincommandlist" element={<AdminCommandList />} />
        <Route path="/admincategorylist" element={<AdminCategoryList />} />
        <Route
          path="/admincommanddetails/:id"
          element={<AdminCommandDetails />}
        />
        <Route path="/adminsalondetails/:id" element={<AdminSalonDetails />} />
        <Route path="/admincategoryadd" element={<AdminCategoryAdd />} />
        <Route path="/admincategoryadit/:id" element={<AdminCategoryEdit />} />
        <Route path="/adminsalonedit/:id" element={<AdminSalonEdit />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />

        <Route path="/adminusers" element={<AdminUsers />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
