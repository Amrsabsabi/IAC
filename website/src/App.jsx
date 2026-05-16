import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

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
import AdminDashboard from "./Pages/AdminDashboard";
import AdminCampaigns from "./Pages/AdminCampaigns";
import NewCampaign from "./Pages/NewCampaign";
import EditCampaign from "./Pages/EditCampaign";
import AdminHomeContent from "./Pages/AdminHomeContent";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

import ProtectedUserRoute from "./components/ProtectedUserRoute";
import DonorDashboard from "./Pages/DonorDashboard";
import Donate from "./Pages/Donate";
import Profile from "./Pages/Profile";
import AuthRedirect from "./Pages/AuthRedirect";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* Admin Clerk Auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        />

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

        <Route
          path="/admin/home-content"
          element={
            <ProtectedAdminRoute>
              <AdminHomeContent />
            </ProtectedAdminRoute>
          }
        />

        {/* Website */}
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

                <Route path="/auth-redirect" element={<AuthRedirect />} />

                <Route
                  path="/login/*"
                  element={
                    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6] px-4 py-10">
                      <SignIn
                        routing="path"
                        path="/login"
                        signUpUrl="/register"
                        fallbackRedirectUrl="/auth-redirect"
                        forceRedirectUrl="/auth-redirect"
                      />
                    </main>
                  }
                />

                <Route
                  path="/register/*"
                  element={
                    <main className="flex min-h-screen items-center justify-center bg-[#F4F7F6] px-4 py-10">
                      <SignUp
                        routing="path"
                        path="/register"
                        signInUrl="/login"
                        fallbackRedirectUrl="/auth-redirect"
                        forceRedirectUrl="/auth-redirect"
                      />
                    </main>
                  }
                />

                <Route
                  path="/donor"
                  element={
                    <ProtectedUserRoute>
                      <DonorDashboard />
                    </ProtectedUserRoute>
                  }
                />

                <Route
                  path="/donate"
                  element={
                    <ProtectedUserRoute>
                      <Donate />
                    </ProtectedUserRoute>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedUserRoute>
                      <Profile />
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