// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Home from "./Pages/Home";
// import Campaigns from "./Pages/Campaigns";
// import CampaignDetail from "./Pages/CampaignDetail";
// import ServicesPage from "./Pages/ServicesPage";
// import ContactUs from "./Pages/ContactUs";
// import AboutUs from "./Pages/AboutUs";
// import ScrollToTop from "./components/ScrollToTop";

// import AdminLogin from "./Pages/AdminLogin";
// import AdminCampaigns from "./Pages/AdminCampaigns";
// import NewCampaign from "./Pages/NewCampaign";
// import ProtectedAdminRoute from "./components/ProtectedAdminRoute";


// function Page({ title }) {
//   return (
//     <main className="min-h-screen p-10 text-3xl font-bold">
//       {title}
//     </main>
//   );
// }

// export default function App() {
//   return (
//     <BrowserRouter>
//     <ScrollToTop />
//       <Header />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/campaigns" element={<Campaigns />} />
//         <Route path="/campaigns/:id" element={<CampaignDetail />} />
//         <Route path="/services" element={<ServicesPage />} />
//         <Route path="/about-us" element={<AboutUs />} />
//         <Route path="/contact-us" element={<ContactUs />} />
//       </Routes>

//       <Footer />
//     </BrowserRouter>
//   );
// }

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
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import EditCampaign from "./Pages/EditCampaign";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* صفحات الموقع العادية */}
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
              </Routes>

              <Footer />
            </>
          }
        />

        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/campaigns"
          element={
            <ProtectedAdminRoute>
              <AdminCampaigns />
            </ProtectedAdminRoute>
          }
        />

        {/* Add Campaign */}
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
      </Routes>
    </BrowserRouter>
  );
}