import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalJobRequests, setTotalJobRequests] = useState(0);

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // ===============================
  // 🔐 VÉRIFICATION ADMIN
  // ===============================
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "admin") {
      toast.error("Accès réservé à l'administrateur");
      navigate("/");
      return;
    }

    fetchUsers();
    fetchJobs();
    fetchApplicationsCount();
    fetchJobRequestsCount();
    fetchJobRequests();
  }, []);

  // ===============================
  // 👥 UTILISATEURS
  // ===============================
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://backend-emmt.onrender.com/api/users/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(response.data);
    } catch (error) {
      console.log(error);

      if (error.response?.status === 403) {
        toast.error("Accès interdit");
        navigate("/");
      } else {
        toast.error(
          error.response?.data?.message ||
            "Erreur lors du chargement des utilisateurs"
        );
      }
    }
  };

  // ===============================
  // 📋 OFFRES
  // ===============================
  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        "https://backend-emmt.onrender.com/api/jobs/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data);
      setTotalJobs(response.data.length);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des offres"
      );
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // 📩 CANDIDATURES
  // ===============================
  const fetchApplicationsCount = async () => {
    try {
      const response = await axios.get(
        "https://backend-emmt.onrender.com/api/applications/admin/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalApplications(response.data.total);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des candidatures"
      );
    }
  };

  // ===============================
  // 📝 NOMBRE DE DEMANDES
  // ===============================
  const fetchJobRequestsCount = async () => {
    try {
      const response = await axios.get(
        "https://backend-emmt.onrender.com/api/job-requests/admin/count",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotalJobRequests(response.data.total);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des demandes d'emploi"
      );
    }
  };

  // ===============================
  // 📝 TOUTES LES DEMANDES
  // ===============================
  const fetchJobRequests = async () => {
    try {
      const response = await axios.get(
        "https://backend-emmt.onrender.com/api/job-requests/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobRequests(response.data);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des demandes d'emploi"
      );
    }
  };

  // ===============================
  // 🗑️ SUPPRIMER UTILISATEUR
  // ===============================
  const supprimerUtilisateur = async (id) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet utilisateur ?"
    );

    if (!confirmation) return;

    try {
      await axios.delete(
        `https://backend-emmt.onrender.com/api/users/admin/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers((usersActuels) =>
        usersActuels.filter((user) => user._id !== id)
      );

      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  // ===============================
  // 🗑️ SUPPRIMER OFFRE
  // ===============================
  const supprimerOffre = async (id) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette offre ?"
    );

    if (!confirmation) return;

    try {
      await axios.delete(
        `https://backend-emmt.onrender.com/api/jobs/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs((offresActuelles) =>
        offresActuelles.filter((job) => job._id !== id)
      );

      setTotalJobs((nombreActuel) => nombreActuel - 1);

      toast.success("Offre supprimée avec succès");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de l'offre"
      );
    }
  };

  // ===============================
  // 🗑️ SUPPRIMER DEMANDE
  // ===============================
  const supprimerDemande = async (id) => {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cette demande d'emploi ?"
    );

    if (!confirmation) return;

    try {
      await axios.delete(
        `https://backend-emmt.onrender.com/api/job-requests/admin/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobRequests((demandesActuelles) =>
        demandesActuelles.filter((demande) => demande._id !== id)
      );

      setTotalJobRequests((nombreActuel) => nombreActuel - 1);

      toast.success("Demande d'emploi supprimée avec succès");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la demande"
      );
    }
  };

  // ===============================
  // 📊 STATISTIQUES
  // ===============================
  const totalUsers = users.length;

  const totalCandidates = users.filter(
    (user) => user.role === "candidat"
  ).length;

  const totalRecruiters = users.filter(
    (user) => user.role === "recruteur"
  ).length;

  // ===============================
  // 📅 FORMAT DATE
  // ===============================
  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // ===============================
  // ⏳ CHARGEMENT
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl mb-5">
            ⏳
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Chargement du tableau de bord
          </h2>

          <p className="text-slate-500 mt-2">
            Préparation de votre espace d'administration...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 md:py-10 px-4">

      <div className="max-w-[1500px] mx-auto">

        {/* =========================================
            HEADER ADMIN
        ========================================= */}
        <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 shadow-sm mb-8">

          <div className="absolute top-0 left-0 right-0 h-1.5 bg-blue-600"></div>

          <div className="p-7 md:p-9">

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-7">

              <div className="flex items-start gap-5">

                <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl shadow-sm">
                  👑
                </div>

                <div>

                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-sm font-semibold text-blue-600">
                      ADMINISTRATION
                    </span>

                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>

                    <span className="text-sm text-slate-400">
                      JobConnect
                    </span>

                  </div>

                  <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Tableau de bord
                  </h1>

                  <p className="text-slate-500 mt-2 max-w-2xl">
                    Gérez les utilisateurs, les offres d'emploi,
                    les demandes et les candidatures de votre plateforme.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 min-w-[250px]">

                <div className="relative">

                  <span className="block w-3 h-3 bg-emerald-500 rounded-full"></span>

                  <span className="absolute inset-0 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-40"></span>

                </div>

                <div>

                  <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                    Statut
                  </p>

                  <p className="font-bold text-slate-700 mt-0.5">
                    Administrateur connecté
                  </p>

                </div>

              </div>

            </div>

          </div>
        </div>


        {/* =========================================
            STATISTIQUES
        ========================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-9">

          {/* UTILISATEURS */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

            <div className="flex items-center justify-between mb-5">

              <span className="text-sm font-semibold text-slate-500">
                Utilisateurs
              </span>

              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                👥
              </div>

            </div>

            <p className="text-3xl font-extrabold text-slate-900">
              {totalUsers}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              comptes inscrits
            </p>

          </div>


          {/* CANDIDATS */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

            <div className="flex items-center justify-between mb-5">

              <span className="text-sm font-semibold text-slate-500">
                Candidats
              </span>

              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                👨‍💻
              </div>

            </div>

            <p className="text-3xl font-extrabold text-slate-900">
              {totalCandidates}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              profils candidats
            </p>

          </div>


          {/* RECRUTEURS */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

            <div className="flex items-center justify-between mb-5">

              <span className="text-sm font-semibold text-slate-500">
                Recruteurs
              </span>

              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">
                💼
              </div>

            </div>

            <p className="text-3xl font-extrabold text-slate-900">
              {totalRecruiters}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              comptes recruteurs
            </p>

          </div>


          {/* OFFRES */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

            <div className="flex items-center justify-between mb-5">

              <span className="text-sm font-semibold text-slate-500">
                Offres
              </span>

              <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
                📋
              </div>

            </div>

            <p className="text-3xl font-extrabold text-slate-900">
              {totalJobs}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              offres publiées
            </p>

          </div>


          {/* DEMANDES */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

            <div className="flex items-center justify-between mb-5">

              <span className="text-sm font-semibold text-slate-500">
                Demandes
              </span>

              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                📝
              </div>

            </div>

            <p className="text-3xl font-extrabold text-slate-900">
              {totalJobRequests}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              demandes d'emploi
            </p>

          </div>


          {/* CANDIDATURES */}
          <div className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200">

            <div className="flex items-center justify-between mb-5">

              <span className="text-sm font-semibold text-slate-500">
                Candidatures
              </span>

              <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center text-xl">
                📩
              </div>

            </div>

            <p className="text-3xl font-extrabold text-slate-900">
              {totalApplications}
            </p>

            <p className="text-xs text-slate-400 mt-1">
              candidatures reçues
            </p>

          </div>

        </div>


        {/* =========================================
            UTILISATEURS
        ========================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-9">

          <div className="px-6 md:px-8 py-6 border-b border-slate-100">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                  👥
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Utilisateurs inscrits
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Liste des utilisateurs de la plateforme
                  </p>

                </div>

              </div>

              <span className="self-start md:self-auto bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                {totalUsers} utilisateur(s)
              </span>

            </div>

          </div>


          {users.length === 0 ? (

            <div className="p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-50 flex items-center justify-center text-3xl mb-4">
                👥
              </div>

              <p className="font-semibold text-slate-700">
                Aucun utilisateur trouvé
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b border-slate-100">

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Nom
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Rôle
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Téléphone
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Localisation
                    </th>

                    <th className="text-center px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>

                  </tr>

                </thead>

                <tbody className="divide-y divide-slate-100">

                  {users.map((user) => (

                    <tr
                      key={user._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                            {(user.prenom?.[0] || "").toUpperCase()}
                          </div>

                          <div>

                            <div className="font-bold text-slate-800">
                              {user.prenom} {user.nom}
                            </div>

                          </div>

                        </div>

                      </td>


                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {user.email}
                      </td>


                      <td className="px-6 py-4">

                        {user.role === "admin" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-100">
                            👑 Administrateur
                          </span>
                        )}

                        {user.role === "recruteur" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                            💼 Recruteur
                          </span>
                        )}

                        {user.role === "candidat" && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            👤 Candidat
                          </span>
                        )}

                      </td>


                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {user.telephone || "—"}
                      </td>


                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {user.localisation || "—"}
                      </td>


                      <td className="px-6 py-4 text-center">

                        {user.role === "admin" ? (

                          <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-400 text-xs font-semibold">
                            🔒 Protégé
                          </span>

                        ) : (

                          <button
                            onClick={() =>
                              supprimerUtilisateur(user._id)
                            }
                            className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 transition-all hover:scale-105"
                            title="Supprimer"
                          >
                            🗑️
                          </button>

                        )}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* =========================================
            OFFRES D'EMPLOI
        ========================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-9">

          <div className="px-6 md:px-8 py-6 border-b border-slate-100">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl">
                  📋
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Offres d'emploi
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Toutes les offres publiées sur JobConnect
                  </p>

                </div>

              </div>

              <span className="self-start md:self-auto bg-orange-50 text-orange-700 px-4 py-2 rounded-full text-sm font-bold">
                {totalJobs} offre(s)
              </span>

            </div>

          </div>


          {jobs.length === 0 ? (

            <div className="p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-50 flex items-center justify-center text-3xl mb-4">
                📋
              </div>

              <p className="font-semibold text-slate-700">
                Aucune offre d'emploi trouvée
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b border-slate-100">

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Offre
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Recruteur
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Localisation
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Publication
                    </th>

                    <th className="text-center px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {jobs.map((job) => (

                    <tr
                      key={job._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >

                      <td className="px-6 py-4">

                        <div className="font-bold text-slate-800">
                          {job.titre}
                        </div>

                        {job.description && (
                          <div className="text-sm text-slate-500 mt-1 max-w-md truncate">
                            {job.description}
                          </div>
                        )}

                      </td>


                      <td className="px-6 py-4">

                        <div className="font-semibold text-slate-700">
                          {job.auteur
                            ? `${job.auteur.prenom || ""} ${job.auteur.nom || ""}`
                            : "—"}
                        </div>

                        {job.auteur?.entreprise && (
                          <div className="text-sm text-slate-400 mt-1">
                            {job.auteur.entreprise}
                          </div>
                        )}

                      </td>


                      <td className="px-6 py-4 text-slate-600 text-sm">
                        📍 {job.localisation || "—"}
                      </td>


                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {formatDate(job.createdAt)}
                      </td>


                      <td className="px-6 py-4 text-center">

                        <button
                          onClick={() =>
                            supprimerOffre(job._id)
                          }
                          className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 transition-all hover:scale-105"
                          title="Supprimer l'offre"
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>


        {/* =========================================
            DEMANDES D'EMPLOI
        ========================================= */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="px-6 md:px-8 py-6 border-b border-slate-100">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                  📝
                </div>

                <div>

                  <h2 className="text-xl font-bold text-slate-900">
                    Demandes d'emploi
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Toutes les demandes publiées par les candidats
                  </p>

                </div>

              </div>

              <span className="self-start md:self-auto bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-bold">
                {totalJobRequests} demande(s)
              </span>

            </div>

          </div>


          {jobRequests.length === 0 ? (

            <div className="p-14 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-50 flex items-center justify-center text-3xl mb-4">
                📝
              </div>

              <p className="font-semibold text-slate-700">
                Aucune demande d'emploi trouvée
              </p>

            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="bg-slate-50 border-b border-slate-100">

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Poste recherché
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Candidat
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Email
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Localisation
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Contrat
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Statut
                    </th>

                    <th className="text-left px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Publication
                    </th>

                    <th className="text-center px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {jobRequests.map((demande) => (

                    <tr
                      key={demande._id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >

                      {/* POSTE */}

                      <td className="px-6 py-4">

                        <div className="font-bold text-slate-800">
                          {demande.posteRecherche || "—"}
                        </div>

                        {demande.description && (
                          <div className="text-sm text-slate-500 mt-1 max-w-xs truncate">
                            {demande.description}
                          </div>
                        )}

                      </td>


                      {/* CANDIDAT */}

                      <td className="px-6 py-4">

                        <div className="font-semibold text-slate-700">
                          {demande.candidat
                            ? `${demande.candidat.prenom || ""} ${demande.candidat.nom || ""}`
                            : "—"}
                        </div>

                      </td>


                      {/* EMAIL */}

                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {demande.candidat?.email || "—"}
                      </td>


                      {/* LOCALISATION */}

                      <td className="px-6 py-4 text-slate-600 text-sm">
                        📍 {demande.localisation || "—"}
                      </td>


                      {/* CONTRAT */}

                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {demande.typeContrat || "—"}
                      </td>


                      {/* STATUT */}

                      <td className="px-6 py-4">

                        {demande.statut === "Active" ? (

                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">

                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>

                            Active

                          </span>

                        ) : (

                          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">

                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>

                            Fermée

                          </span>

                        )}

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-4 text-slate-600 text-sm">
                        {formatDate(demande.createdAt)}
                      </td>


                      {/* ACTION */}

                      <td className="px-6 py-4 text-center">

                        <button
                          onClick={() =>
                            supprimerDemande(demande._id)
                          }
                          className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 transition-all hover:scale-105"
                          title="Supprimer la demande"
                        >
                          🗑️
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;