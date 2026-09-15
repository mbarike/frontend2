import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateJob from "./pages/CreateJob";
import JobDetail from "./pages/JobDetail";
import EditJob from "./pages/EditJob";
import ApplyJob from "./pages/ApplyJob";
import Candidats from "./pages/Candidats";
import MyApplications from "./pages/MyApplications";
import MesOffres from "./pages/MesOffres";
import Profile from "./pages/profile";
import Footer from "./components/Footer";
import CreateJobRequest from "./pages/CreateJobRequest";
import MesDemandesEmploi from "./pages/MesDemandesEmploi";
import EditJobRequest from "./pages/EditJobRequest";
import DemandesEmploi from "./pages/DemandesEmploi";
import ProfilCandidat from "./pages/ProfilCandidat";
import AdminDashboard from "./pages/AdminDashboard";


// =====================================================
// 🔐 PROTECTION DES ROUTES
// =====================================================

function ProtectedRoute({ children, role }) {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  useEffect(() => {

    // -----------------------------------------------
    // Utilisateur non connecté
    // -----------------------------------------------
    if (!token) {

      toast.error(
        "🔐 Vous devez être connecté pour accéder à cette page."
      );

      navigate("/login", { replace: true });

      return;
    }


    // -----------------------------------------------
    // Mauvais rôle
    // -----------------------------------------------
    if (role && userRole !== role) {

      if (role === "recruteur") {

        toast.error(
          "🔒 Accès refusé : cette fonctionnalité est réservée aux recruteurs."
        );

      } else if (role === "candidat") {

        toast.error(
          "🔒 Accès refusé : cette fonctionnalité est réservée aux candidats."
        );

      }

      navigate("/", { replace: true });

    }

  }, [token, userRole, role, navigate]);


  // Pendant la vérification
  if (!token) {
    return null;
  }

  if (role && userRole !== role) {
    return null;
  }


  return children;
}


// =====================================================
// APPLICATION
// =====================================================

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ==========================================
            🌍 PAGES PUBLIQUES
        ========================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetail />}
        />


        {/* ==========================================
            🏢 PAGES RECRUTEUR
        ========================================== */}

        <Route
          path="/create"
          element={
            <ProtectedRoute role="recruteur">
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute role="recruteur">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mes-offres"
          element={
            <ProtectedRoute role="recruteur">
              <MesOffres />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidats/:id"
          element={
            <ProtectedRoute role="recruteur">
              <Candidats />
            </ProtectedRoute>
          }
        />

        <Route
          path="/demandes-emploi"
          element={
            <ProtectedRoute role="recruteur">
              <DemandesEmploi />
            </ProtectedRoute>
          }
        />


        {/* ==========================================
            👤 PAGES CANDIDAT
        ========================================== */}

        <Route
          path="/apply/:id"
          element={
            <ProtectedRoute role="candidat">
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mes-candidatures"
          element={
            <ProtectedRoute role="candidat">
              <MyApplications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/creer-demande-emploi"
          element={
            <ProtectedRoute role="candidat">
              <CreateJobRequest />
            </ProtectedRoute>
          }
        />

        <Route
          path="/mes-demandes-emploi"
          element={
            <ProtectedRoute role="candidat">
              <MesDemandesEmploi />
            </ProtectedRoute>
          }
        />

        <Route
          path="/modifier-demande-emploi/:id"
          element={
            <ProtectedRoute role="candidat">
              <EditJobRequest />
            </ProtectedRoute>
          }
        />


        {/* ==========================================
            👤 PROFIL
        ========================================== */}

        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profil/:id"
          element={
            <ProtectedRoute role="recruteur">
              <ProfilCandidat />
            </ProtectedRoute>
          }
        />
        <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>


        {/* ==========================================
            🚫 ROUTE INCONNUE
        ========================================== */}

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />

      </Routes>

      <Footer />

    </BrowserRouter>

  );
}


export default App;

