import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./Pages/Home";
import Campaigns from "./Pages/Campaigns";
import CampaignDetail from "./Pages/CampaignDetail";
import ServicesPage from "./Pages/ServicesPage";
import ContactUs from "./Pages/ContactUs";
import AboutUs from "./Pages/AboutUs";

import AdminLogin from "./Pages/AdminLogin";
import AdminCampaigns from "./Pages/AdminCampaigns";
import NewCampaign from "./Pages/NewCampaign";
import EditCampaign from "./Pages/EditCampaign";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import UserLogin from "./Pages/UserLogin";
import UserRegister from "./Pages/UserRegister";
import UserDashboard from "./Pages/UserDashboard";
import ProtectedUserRoute from "./components/ProtectedUserRoute";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/campaigns"
          element={
            <ProtectedAdminRoute>
              <AdminCampaigns />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/campaigns/new"
          element={
            <ProtectedAdminRoute>
              <NewCampaign />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/campaigns/edit/:slug"
          element={
            <ProtectedAdminRoute>
              <EditCampaign />
            </ProtectedAdminRoute>
          }
        />

        {/* Website pages with Header/Footer */}
        <Route
          path="*"
          element={
            <>
              <Header />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/campaigns/:id" element={<CampaignDetail />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/contact-us" element={<ContactUs />} />

                {/* User Auth */}
                <Route path="/login" element={<UserLogin />} />
                <Route path="/register" element={<UserRegister />} />

                <Route
                  path="/user/dashboard"
                  element={
                    <ProtectedUserRoute>
                      <UserDashboard />
                    </ProtectedUserRoute>
                  }
                />
              </Routes>

              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}