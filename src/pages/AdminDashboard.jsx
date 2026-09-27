import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const API =
    import.meta.env.VITE_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://backend-emmt.onrender.com");

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // =========================
  // STATES
  // =========================

  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [jobRequests, setJobRequests] = useState([]);

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalJobRequests, setTotalJobRequests] = useState(0);

  const [loading, setLoading] = useState(true);

  const [currentView, setCurrentView] = useState("dashboard");

  const [candidateSearch, setCandidateSearch] = useState("");
  const [recruiterSearch, setRecruiterSearch] = useState("");
  const [jobSearch, setJobSearch] = useState("");
  const [requestSearch, setRequestSearch] = useState("");

  const [modalType, setModalType] = useState(null);
  const [saving, setSaving] = useState(false);

  const [userForm, setUserForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    password: "",
    role: "candidat",
    telephone: "",
    localisation: "",
    entreprise: "",
    secteur: "",
    competences: "",
    description: "",
  });

  const [jobForm, setJobForm] = useState({
    titre: "",
    description: "",
    competences: "",
    localisation: "",
    auteur: "",
  });

  const [requestForm, setRequestForm] = useState({
    candidat: "",
    posteRecherche: "",
    competences: "",
    localisation: "",
    typeContrat: "",
    description: "",
    statut: "Active",
  });

  const [editingId, setEditingId] = useState(null);

  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    type: null,
    id: null,
    label: "",
  });

  // =========================
  // ICONS
  // =========================

  const Icons = {
    Search: ({ size = 20 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),

    Plus: ({ size = 20 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),

    Edit: ({ size = 18 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" />
      </svg>
    ),

    Trash: ({ size = 18 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>
    ),

    ArrowLeft: ({ size = 18 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    ),

    X: ({ size = 20 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),

    MapPin: ({ size = 16 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),

    Users: ({ size = 22 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),

    Briefcase: ({ size = 22 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        <path d="M3 12h18" />
        <path d="M10 12v2h4v-2" />
      </svg>
    ),

    Clipboard: ({ size = 22 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="4" y="4" width="16" height="17" rx="2" />
        <path d="M9 4V2h6v2" />
        <path d="M8 9h8" />
        <path d="M8 13h8" />
        <path d="M8 17h5" />
      </svg>
    ),

    FileText: ({ size = 22 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6" />
        <path d="M8 13h8" />
        <path d="M8 17h6" />
      </svg>
    ),

    Shield: ({ size = 22 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),

    Home: ({ size = 20 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="m3 10 9-7 9 7" />
        <path d="M5 9v11h14V9" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),

    Logout: ({ size = 20 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M21 19V5a2 2 0 0 0-2-2h-6" />
      </svg>
    ),

    Loader: ({ size = 18 }) => (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="animate-spin"
      >
        <path d="M12 2v4" />
        <path d="m16.24 3.76-2.83 2.83" />
        <path d="M22 12h-4" />
        <path d="m20.24 20.24-2.83-2.83" />
        <path d="M12 22v-4" />
        <path d="m3.76 20.24 2.83-2.83" />
        <path d="M2 12h4" />
        <path d="m3.76 3.76 2.83 2.83" />
      </svg>
    ),
  };

  // =========================
  // AUTH / CHARGEMENT
  // =========================

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
    fetchJobRequestsCount();
    fetchJobRequests();
  }, []);

  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API}/api/users/admin/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data.users || response.data || []);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des utilisateurs"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH JOBS
  // =========================

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`${API}/api/jobs/admin/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.jobs || response.data || [];

      setJobs(data);
      setTotalJobs(data.length);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des offres"
      );
    }
  };

  // =========================
  // FETCH DEMANDES COUNT
  // =========================

  const fetchJobRequestsCount = async () => {
    try {
      const response = await axios.get(
        `${API}/api/job-requests/admin/count`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const count =
        response.data.count ??
        response.data.total ??
        response.data.totalJobRequests ??
        0;

      setTotalJobRequests(count);
    } catch (error) {
      console.error(error);
    }
  };

  // =========================
  // FETCH DEMANDES
  // =========================

  const fetchJobRequests = async () => {
    try {
      const response = await axios.get(
        `${API}/api/job-requests/admin/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        response.data.jobRequests ||
        response.data.requests ||
        response.data ||
        [];

      setJobRequests(data);
      setTotalJobRequests(data.length);
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des demandes"
      );
    }
  };

  // =========================
  // MODALES
  // =========================

  const closeModal = () => {
    setModalType(null);
    setEditingId(null);
  };

  const ouvrirAjoutCandidat = () => {
    setEditingId(null);

    setUserForm({
      prenom: "",
      nom: "",
      email: "",
      password: "",
      role: "candidat",
      telephone: "",
      localisation: "",
      entreprise: "",
      secteur: "",
      competences: "",
      description: "",
    });

    setModalType("user");
  };

  const ouvrirAjoutRecruteur = () => {
    setEditingId(null);

    setUserForm({
      prenom: "",
      nom: "",
      email: "",
      password: "",
      role: "recruteur",
      telephone: "",
      localisation: "",
      entreprise: "",
      secteur: "",
      competences: "",
      description: "",
    });

    setModalType("user");
  };

  const ouvrirModificationUtilisateur = (user) => {
    setEditingId(user._id);

    setUserForm({
      prenom: user.prenom || "",
      nom: user.nom || "",
      email: user.email || "",
      password: "",
      role: user.role || "candidat",
      telephone: user.telephone || "",
      localisation: user.localisation || "",
      entreprise: user.entreprise || "",
      secteur: user.secteur || "",
      competences: Array.isArray(user.competences)
        ? user.competences.join(", ")
        : user.competences || "",
      description: user.description || "",
    });

    setModalType("user");
  };

  const ouvrirAjoutOffre = () => {
    setEditingId(null);

    setJobForm({
      titre: "",
      description: "",
      competences: "",
      localisation: "",
      auteur: "",
    });

    setModalType("job");
  };

  const ouvrirModificationOffre = (job) => {
    setEditingId(job._id);

    setJobForm({
      titre: job.titre || "",
      description: job.description || "",
      competences: Array.isArray(job.competences)
        ? job.competences.join(", ")
        : job.competences || "",
      localisation: job.localisation || "",
      auteur: job.auteur?._id || job.auteur || "",
    });

    setModalType("job");
  };

  const ouvrirAjoutDemande = () => {
    setEditingId(null);

    setRequestForm({
      candidat: "",
      posteRecherche: "",
      competences: "",
      localisation: "",
      typeContrat: "",
      description: "",
      statut: "Active",
    });

    setModalType("request");
  };

  const ouvrirModificationDemande = (request) => {
    setEditingId(request._id);

    setRequestForm({
      candidat: request.candidat?._id || request.candidat || "",
      posteRecherche: request.posteRecherche || "",
      competences: Array.isArray(request.competences)
        ? request.competences.join(", ")
        : request.competences || "",
      localisation: request.localisation || "",
      typeContrat: request.typeContrat || "",
      description: request.description || "",
      statut: request.statut || "Active",
    });

    setModalType("request");
  };

  // =========================
  // ENREGISTRER UTILISATEUR
  // =========================

  const enregistrerUtilisateur = async (e) => {
    e.preventDefault();

    if (!userForm.prenom.trim() || !userForm.nom.trim()) {
      toast.error("Le prénom et le nom sont obligatoires");
      return;
    }

    if (!userForm.email.trim()) {
      toast.error("L'email est obligatoire");
      return;
    }

    if (!editingId && !userForm.password.trim()) {
      toast.error("Le mot de passe est obligatoire");
      return;
    }

    try {
      setSaving(true);

      const data = {
        prenom: userForm.prenom,
        nom: userForm.nom,
        email: userForm.email,
        role: userForm.role,
        telephone: userForm.telephone,
        localisation: userForm.localisation,
        entreprise: userForm.entreprise,
        secteur: userForm.secteur,
        competences: userForm.competences
          ? userForm.competences
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        description: userForm.description,
      };

      if (userForm.password.trim()) {
        data.password = userForm.password;
      }

      if (editingId) {
        const response = await axios.put(
          `${API}/api/users/admin/users/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedUser =
          response.data.user || response.data.updatedUser || response.data;

        setUsers((prev) =>
          prev.map((user) =>
            user._id === editingId ? updatedUser : user
          )
        );

        toast.success("Utilisateur modifié avec succès");
      } else {
        const response = await axios.post(
          `${API}/api/users/admin/users`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newUser =
          response.data.user || response.data.createdUser || response.data;

        setUsers((prev) => [...prev, newUser]);

        toast.success("Utilisateur ajouté avec succès");
      }

      closeModal();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement de l'utilisateur"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // ENREGISTRER OFFRE
  // =========================

  const enregistrerOffre = async (e) => {
    e.preventDefault();

    if (!jobForm.titre.trim()) {
      toast.error("Le titre de l'offre est obligatoire");
      return;
    }

    if (!jobForm.description.trim()) {
      toast.error("La description est obligatoire");
      return;
    }

    if (!jobForm.localisation.trim()) {
      toast.error("La localisation est obligatoire");
      return;
    }

    if (!jobForm.auteur) {
      toast.error("Le recruteur est obligatoire");
      return;
    }

    try {
      setSaving(true);

      const data = {
        titre: jobForm.titre,
        description: jobForm.description,
        competences: jobForm.competences
          ? jobForm.competences
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        localisation: jobForm.localisation,
        auteur: jobForm.auteur,
      };

      if (editingId) {
        const response = await axios.put(
          `${API}/api/jobs/admin/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedJob =
          response.data.job || response.data.updatedJob || response.data;

        setJobs((prev) =>
          prev.map((job) =>
            job._id === editingId ? updatedJob : job
          )
        );

        toast.success("Offre modifiée avec succès");
      } else {
        const response = await axios.post(
          `${API}/api/jobs/admin`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newJob =
          response.data.job || response.data.createdJob || response.data;

        setJobs((prev) => [...prev, newJob]);
        setTotalJobs((prev) => prev + 1);

        toast.success("Offre ajoutée avec succès");
      }

      closeModal();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement de l'offre"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // ENREGISTRER DEMANDE
  // =========================

  const enregistrerDemande = async (e) => {
    e.preventDefault();

    if (!requestForm.candidat) {
      toast.error("Le candidat est obligatoire");
      return;
    }

    if (!requestForm.posteRecherche.trim()) {
      toast.error("Le poste recherché est obligatoire");
      return;
    }

    if (!requestForm.localisation.trim()) {
      toast.error("La localisation est obligatoire");
      return;
    }

    if (!requestForm.typeContrat.trim()) {
      toast.error("Le type de contrat est obligatoire");
      return;
    }

    if (!requestForm.description.trim()) {
      toast.error("La description est obligatoire");
      return;
    }

    try {
      setSaving(true);

      const data = {
        candidat: requestForm.candidat,
        posteRecherche: requestForm.posteRecherche,
        competences: requestForm.competences
          ? requestForm.competences
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean)
          : [],
        localisation: requestForm.localisation,
        typeContrat: requestForm.typeContrat,
        description: requestForm.description,
        statut: requestForm.statut,
      };

      if (editingId) {
        const response = await axios.put(
          `${API}/api/job-requests/admin/${editingId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedRequest =
          response.data.jobRequest ||
          response.data.request ||
          response.data.updatedRequest ||
          response.data;

        setJobRequests((prev) =>
          prev.map((request) =>
            request._id === editingId ? updatedRequest : request
          )
        );

        toast.success("Demande modifiée avec succès");
      } else {
        const response = await axios.post(
          `${API}/api/job-requests/admin`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const newRequest =
          response.data.jobRequest ||
          response.data.request ||
          response.data.createdRequest ||
          response.data;

        setJobRequests((prev) => [...prev, newRequest]);
        setTotalJobRequests((prev) => prev + 1);

        toast.success("Demande ajoutée avec succès");
      }

      closeModal();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de l'enregistrement de la demande"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // SUPPRESSIONS
  // =========================

  const supprimerUtilisateur = async (id) => {
    try {
      await axios.delete(`${API}/api/users/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((user) => user._id !== id));

      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de l'utilisateur"
      );
    }
  };

  const supprimerOffre = async (id) => {
    try {
      await axios.delete(`${API}/api/jobs/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs((prev) => prev.filter((job) => job._id !== id));
      setTotalJobs((prev) => Math.max(0, prev - 1));

      toast.success("Offre supprimée avec succès");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de l'offre"
      );
    }
  };

  const supprimerDemande = async (id) => {
    try {
      await axios.delete(`${API}/api/job-requests/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobRequests((prev) =>
        prev.filter((request) => request._id !== id)
      );

      setTotalJobRequests((prev) => Math.max(0, prev - 1));

      toast.success("Demande supprimée avec succès");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la demande"
      );
    }
  };

  // =========================
  // CONFIRMATION SUPPRESSION
  // =========================

  const demanderSuppression = (type, id, label) => {
    setConfirmDelete({
      open: true,
      type,
      id,
      label,
    });
  };

  const annulerSuppression = () => {
    setConfirmDelete({
      open: false,
      type: null,
      id: null,
      label: "",
    });
  };

  const confirmerSuppression = async () => {
    const { type, id } = confirmDelete;

    setConfirmDelete({
      open: false,
      type: null,
      id: null,
      label: "",
    });

    if (type === "user") {
      await supprimerUtilisateur(id);
    }

    if (type === "job") {
      await supprimerOffre(id);
    }

    if (type === "request") {
      await supprimerDemande(id);
    }
  };

  // =========================
  // DECONNEXION
  // =========================

  const deconnexionAdmin = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");

    toast.success("Déconnexion réussie");
    navigate("/login");
  };

  // =========================
  // DONNEES
  // =========================

  const candidates = users.filter(
    (user) => user.role === "candidat"
  );

  const recruiters = users.filter(
    (user) => user.role === "recruteur"
  );

  const totalCandidates = candidates.length;
  const totalRecruiters = recruiters.length;

  const filteredCandidates = candidates.filter((user) => {
    const search = candidateSearch.toLowerCase();

    return (
      `${user.prenom || ""} ${user.nom || ""}`
        .toLowerCase()
        .includes(search) ||
      (user.email || "").toLowerCase().includes(search) ||
      (user.telephone || "").toLowerCase().includes(search) ||
      (user.localisation || "").toLowerCase().includes(search)
    );
  });

  const filteredRecruiters = recruiters.filter((user) => {
    const search = recruiterSearch.toLowerCase();

    return (
      `${user.prenom || ""} ${user.nom || ""}`
        .toLowerCase()
        .includes(search) ||
      (user.email || "").toLowerCase().includes(search) ||
      (user.entreprise || "").toLowerCase().includes(search) ||
      (user.secteur || "").toLowerCase().includes(search) ||
      (user.localisation || "").toLowerCase().includes(search)
    );
  });

  const filteredJobs = jobs.filter((job) => {
    const search = jobSearch.toLowerCase();

    const auteur =
      job.auteur?.prenom && job.auteur?.nom
        ? `${job.auteur.prenom} ${job.auteur.nom}`
        : job.auteur?.email || "";

    return (
      (job.titre || "").toLowerCase().includes(search) ||
      (job.description || "").toLowerCase().includes(search) ||
      (job.localisation || "").toLowerCase().includes(search) ||
      auteur.toLowerCase().includes(search)
    );
  });

  const filteredRequests = jobRequests.filter((request) => {
    const search = requestSearch.toLowerCase();

    const candidat =
      request.candidat?.prenom && request.candidat?.nom
        ? `${request.candidat.prenom} ${request.candidat.nom}`
        : request.candidat?.email || "";

    return (
      (request.posteRecherche || "").toLowerCase().includes(search) ||
      (request.description || "").toLowerCase().includes(search) ||
      (request.localisation || "").toLowerCase().includes(search) ||
      (request.typeContrat || "").toLowerCase().includes(search) ||
      (request.statut || "").toLowerCase().includes(search) ||
      candidat.toLowerCase().includes(search)
    );
  });

  // =========================
  // DATE
  // =========================

  const formatDate = (date) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // =========================
  // MENU
  // =========================

  const menuItems = [
    {
      id: "dashboard",
      label: "Tableau de bord",
      icon: Icons.Home,
    },
    {
      id: "candidates",
      label: "Candidats",
      icon: Icons.Users,
    },
    {
      id: "recruiters",
      label: "Recruteurs",
      icon: Icons.Briefcase,
    },
    {
      id: "jobs",
      label: "Offres d'emploi",
      icon: Icons.FileText,
    },
    {
      id: "requests",
      label: "Demandes d'emploi",
      icon: Icons.Clipboard,
    },
  ];

  // =========================
  // BOUTON ACTION
  // =========================

  const ActionButtons = ({ onEdit, onDelete }) => (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={onEdit}
        className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition"
        title="Modifier"
      >
        <Icons.Edit />
      </button>

      <button
        type="button"
        onClick={onDelete}
        className="p-2 rounded-lg text-slate-600 hover:bg-red-50 hover:text-red-600 transition"
        title="Supprimer"
      >
        <Icons.Trash />
      </button>
    </div>
  );

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-6 sm:px-8 py-7 flex flex-col items-center text-center">
          <div className="text-blue-600 mb-3">
            <Icons.Loader size={30} />
          </div>

          <p className="text-slate-700 font-medium">
            Chargement du tableau de bord...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================

  return (
    <div className="min-h-screen bg-slate-100 overflow-x-hidden">
      <div className="flex min-h-screen">

        {/* =====================================================
            SIDEBAR
        ====================================================== */}

        <aside className="w-[72px] lg:w-64 bg-slate-950 text-white flex flex-col fixed left-0 top-0 bottom-0 z-30 transition-all">

          {/* LOGO */}
          <div className="px-3 lg:px-6 py-5 lg:py-6 border-b border-slate-800">
            <div className="flex items-center justify-center lg:justify-start gap-3">

              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-blue-600 flex items-center justify-center">
                <Icons.Shield size={24} />
              </div>

              <div className="hidden lg:block">
                <div className="text-xl font-bold tracking-tight">
                  <span className="text-blue-400">Job</span>
                  <span className="text-white">Connect</span>
                </div>

                <p className="text-xs text-slate-400 mt-0.5">
                  Administration
                </p>
              </div>

            </div>
          </div>

          {/* MENU */}
          <div className="px-2 lg:px-4 py-6 flex-1">
            <p className="hidden lg:block text-[11px] uppercase tracking-wider text-slate-500 font-semibold px-3 mb-3">
              Menu principal
            </p>

            <nav className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCurrentView(item.id)}
                    title={item.label}
                    className={`w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl text-sm font-medium transition ${
                      active
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <Icon size={19} />

                    <span className="hidden lg:block">
                      {item.label}
                    </span>

                    {item.id === "candidates" && (
                      <span
                        className={`hidden lg:inline ml-auto text-xs px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {totalCandidates}
                      </span>
                    )}

                    {item.id === "recruiters" && (
                      <span
                        className={`hidden lg:inline ml-auto text-xs px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {totalRecruiters}
                      </span>
                    )}

                    {item.id === "jobs" && (
                      <span
                        className={`hidden lg:inline ml-auto text-xs px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {totalJobs}
                      </span>
                    )}

                    {item.id === "requests" && (
                      <span
                        className={`hidden lg:inline ml-auto text-xs px-2 py-0.5 rounded-full ${
                          active
                            ? "bg-blue-500 text-white"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {totalJobRequests}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ADMIN + DECONNEXION */}
          <div className="p-2 lg:p-4 border-t border-slate-800">

            <div className="hidden lg:block bg-slate-900 rounded-xl p-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center">
                  <Icons.Shield size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    Administrateur
                  </p>

                  <p className="text-xs text-slate-500 truncate">
                    Accès sécurisé
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={deconnexionAdmin}
              title="Déconnexion"
              className="w-full flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-red-500/10 hover:text-red-400 transition"
            >
              <Icons.Logout size={19} />
              <span className="hidden lg:block">
                Déconnexion
              </span>
            </button>
          </div>
        </aside>

        {/* =====================================================
            CONTENU PRINCIPAL
        ====================================================== */}

        <main className="ml-[72px] lg:ml-64 flex-1 min-w-0">

          {/* HEADER */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex items-center justify-between gap-4">

              <div className="min-w-0">
                <p className="text-xs sm:text-sm text-slate-500">
                  Administration
                </p>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 truncate">
                  {currentView === "dashboard" &&
                    "Tableau de bord"}

                  {currentView === "candidates" &&
                    "Gestion des candidats"}

                  {currentView === "recruiters" &&
                    "Gestion des recruteurs"}

                  {currentView === "jobs" &&
                    "Gestion des offres d'emploi"}

                  {currentView === "requests" &&
                    "Gestion des demandes d'emploi"}
                </h1>
              </div>

              <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                <div className="w-9 h-9 rounded-full bg-green-50 text-green-600 flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    Système actif
                  </p>

                  <p className="text-xs text-slate-400">
                    Administration
                  </p>
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-6 lg:p-8">

            {/* =================================================
                DASHBOARD
            ================================================== */}

            {currentView === "dashboard" && (
              <div className="space-y-7">

                {/* BIENVENUE */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    <div className="min-w-0">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold mb-4">
                        <Icons.Shield size={14} />
                        Espace administrateur
                      </div>

                      <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                        Bienvenue dans votre espace d'administration
                      </h2>

                      <p className="text-slate-500 mt-2 max-w-2xl">
                        Gérez les utilisateurs, les offres d'emploi et
                        les demandes depuis un seul espace.
                      </p>
                    </div>

                    <div className="hidden lg:flex w-20 h-20 flex-shrink-0 rounded-2xl bg-blue-50 text-blue-600 items-center justify-center">
                      <Icons.Shield size={38} />
                    </div>
                  </div>
                </section>

                {/* STATISTIQUES */}
                <section>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

                    {/* CANDIDATS */}
                    <button
                      type="button"
                      onClick={() => setCurrentView("candidates")}
                      className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:border-blue-200 hover:shadow-md transition group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Candidats
                          </p>

                          <p className="text-3xl font-bold text-slate-900 mt-2">
                            {totalCandidates}
                          </p>
                        </div>

                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                          <Icons.Users size={24} />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-5">
                        Voir tous les candidats
                      </p>
                    </button>

                    {/* RECRUTEURS */}
                    <button
                      type="button"
                      onClick={() => setCurrentView("recruiters")}
                      className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:border-emerald-200 hover:shadow-md transition group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Recruteurs
                          </p>

                          <p className="text-3xl font-bold text-slate-900 mt-2">
                            {totalRecruiters}
                          </p>
                        </div>

                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition">
                          <Icons.Briefcase size={24} />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-5">
                        Voir tous les recruteurs
                      </p>
                    </button>

                    {/* OFFRES */}
                    <button
                      type="button"
                      onClick={() => setCurrentView("jobs")}
                      className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:border-violet-200 hover:shadow-md transition group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Offres d'emploi
                          </p>

                          <p className="text-3xl font-bold text-slate-900 mt-2">
                            {totalJobs}
                          </p>
                        </div>

                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center group-hover:bg-violet-600 group-hover:text-white transition">
                          <Icons.FileText size={24} />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-5">
                        Voir toutes les offres
                      </p>
                    </button>

                    {/* DEMANDES */}
                    <button
                      type="button"
                      onClick={() => setCurrentView("requests")}
                      className="text-left bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6 hover:border-amber-200 hover:shadow-md transition group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-medium text-slate-500">
                            Demandes d'emploi
                          </p>

                          <p className="text-3xl font-bold text-slate-900 mt-2">
                            {totalJobRequests}
                          </p>
                        </div>

                        <div className="w-12 h-12 flex-shrink-0 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
                          <Icons.Clipboard size={24} />
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 mt-5">
                        Voir toutes les demandes
                      </p>
                    </button>
                  </div>
                </section>

                {/* ACCES RAPIDES */}
                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
                  <div className="mb-5">
                    <h3 className="text-lg font-bold text-slate-900">
                      Accès rapides
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      Accédez rapidement aux principales fonctionnalités.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">

                    <button
                      type="button"
                      onClick={ouvrirAjoutCandidat}
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition text-left"
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Icons.Plus />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">
                          Ajouter un candidat
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Créer un compte candidat
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={ouvrirAjoutRecruteur}
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition text-left"
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Icons.Plus />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">
                          Ajouter un recruteur
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Créer un compte recruteur
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={ouvrirAjoutOffre}
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50/50 transition text-left"
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">
                        <Icons.Plus />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">
                          Ajouter une offre
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Publier une nouvelle offre
                        </p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={ouvrirAjoutDemande}
                      className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 transition text-left"
                    >
                      <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Icons.Plus />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">
                          Ajouter une demande
                        </p>

                        <p className="text-xs text-slate-400 mt-0.5">
                          Créer une demande d'emploi
                        </p>
                      </div>
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* =================================================
                CANDIDATS
            ================================================== */}

            {currentView === "candidates" && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                  <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Candidats
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {filteredCandidates.length} candidat(s)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 sm:flex-none">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Icons.Search size={18} />
                        </div>

                        <input
                          type="text"
                          value={candidateSearch}
                          onChange={(e) =>
                            setCandidateSearch(e.target.value)
                          }
                          placeholder="Rechercher..."
                          className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={ouvrirAjoutCandidat}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        <Icons.Plus size={18} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-5 py-4 font-semibold">
                            Candidat
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Email
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Téléphone
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Localisation
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Date
                          </th>
                          <th className="px-5 py-4 font-semibold text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredCandidates.length > 0 ? (
                          filteredCandidates.map((user) => (
                            <tr
                              key={user._id}
                              className="hover:bg-slate-50/70 transition"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                                    {(user.prenom?.charAt(0) || "").toUpperCase()}
                                    {(user.nom?.charAt(0) || "").toUpperCase()}
                                  </div>

                                  <div>
                                    <p className="font-semibold text-slate-800">
                                      {user.prenom} {user.nom}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                      Candidat
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {user.email || "—"}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {user.telephone || "—"}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                  <Icons.MapPin size={15} />
                                  {user.localisation || "—"}
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-500">
                                {formatDate(user.createdAt)}
                              </td>

                              <td className="px-5 py-4">
                                <ActionButtons
                                  onEdit={() =>
                                    ouvrirModificationUtilisateur(user)
                                  }
                                  onDelete={() =>
                                    demanderSuppression(
                                      "user",
                                      user._id,
                                      `le candidat ${user.prenom || ""} ${
                                        user.nom || ""
                                      }`
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-5 py-12 text-center text-slate-400"
                            >
                              Aucun candidat trouvé.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                RECRUTEURS
            ================================================== */}

            {currentView === "recruiters" && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                  <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Recruteurs
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {filteredRecruiters.length} recruteur(s)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 sm:flex-none">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Icons.Search size={18} />
                        </div>

                        <input
                          type="text"
                          value={recruiterSearch}
                          onChange={(e) =>
                            setRecruiterSearch(e.target.value)
                          }
                          placeholder="Rechercher..."
                          className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={ouvrirAjoutRecruteur}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        <Icons.Plus size={18} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[950px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-5 py-4 font-semibold">
                            Recruteur
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Email
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Entreprise
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Secteur
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Localisation
                          </th>
                          <th className="px-5 py-4 font-semibold text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredRecruiters.length > 0 ? (
                          filteredRecruiters.map((user) => (
                            <tr
                              key={user._id}
                              className="hover:bg-slate-50/70 transition"
                            >
                              <td className="px-5 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 flex-shrink-0 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                                    {(user.prenom?.charAt(0) || "").toUpperCase()}
                                    {(user.nom?.charAt(0) || "").toUpperCase()}
                                  </div>

                                  <div>
                                    <p className="font-semibold text-slate-800">
                                      {user.prenom} {user.nom}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                      Recruteur
                                    </p>
                                  </div>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {user.email || "—"}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {user.entreprise || "—"}
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {user.secteur || "—"}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                  <Icons.MapPin size={15} />
                                  {user.localisation || "—"}
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <ActionButtons
                                  onEdit={() =>
                                    ouvrirModificationUtilisateur(user)
                                  }
                                  onDelete={() =>
                                    demanderSuppression(
                                      "user",
                                      user._id,
                                      `le recruteur ${user.prenom || ""} ${
                                        user.nom || ""
                                      }`
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-5 py-12 text-center text-slate-400"
                            >
                              Aucun recruteur trouvé.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                OFFRES
            ================================================== */}

            {currentView === "jobs" && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                  <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Offres d'emploi
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {filteredJobs.length} offre(s)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 sm:flex-none">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Icons.Search size={18} />
                        </div>

                        <input
                          type="text"
                          value={jobSearch}
                          onChange={(e) =>
                            setJobSearch(e.target.value)
                          }
                          placeholder="Rechercher..."
                          className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={ouvrirAjoutOffre}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        <Icons.Plus size={18} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1000px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-5 py-4 font-semibold">
                            Offre
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Recruteur
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Localisation
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Compétences
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Date
                          </th>
                          <th className="px-5 py-4 font-semibold text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredJobs.length > 0 ? (
                          filteredJobs.map((job) => (
                            <tr
                              key={job._id}
                              className="hover:bg-slate-50/70 transition"
                            >
                              <td className="px-5 py-4">
                                <div className="max-w-xs">
                                  <p className="font-semibold text-slate-800">
                                    {job.titre || "Sans titre"}
                                  </p>

                                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                                    {job.description || "—"}
                                  </p>
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-600">
                                {job.auteur?.prenom ||
                                job.auteur?.nom ? (
                                  <>
                                    {job.auteur?.prenom || ""}{" "}
                                    {job.auteur?.nom || ""}
                                  </>
                                ) : (
                                  job.auteur?.email || "—"
                                )}
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                  <Icons.MapPin size={15} />
                                  {job.localisation || "—"}
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex flex-wrap gap-1.5 max-w-xs">
                                  {Array.isArray(job.competences) &&
                                  job.competences.length > 0 ? (
                                    job.competences
                                      .slice(0, 3)
                                      .map((competence, index) => (
                                        <span
                                          key={index}
                                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs"
                                        >
                                          {competence}
                                        </span>
                                      ))
                                  ) : (
                                    <span className="text-sm text-slate-400">
                                      —
                                    </span>
                                  )}

                                  {Array.isArray(job.competences) &&
                                    job.competences.length > 3 && (
                                      <span className="text-xs text-slate-400 py-1">
                                        +{job.competences.length - 3}
                                      </span>
                                    )}
                                </div>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-500">
                                {formatDate(job.createdAt)}
                              </td>

                              <td className="px-5 py-4">
                                <ActionButtons
                                  onEdit={() =>
                                    ouvrirModificationOffre(job)
                                  }
                                  onDelete={() =>
                                    demanderSuppression(
                                      "job",
                                      job._id,
                                      `l'offre "${job.titre || ""}"`
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
                              className="px-5 py-12 text-center text-slate-400"
                            >
                              Aucune offre trouvée.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================
                DEMANDES
            ================================================== */}

            {currentView === "requests" && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                  <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    <div>
                      <h2 className="font-bold text-slate-900">
                        Demandes d'emploi
                      </h2>

                      <p className="text-sm text-slate-500 mt-1">
                        {filteredRequests.length} demande(s)
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative flex-1 sm:flex-none">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                          <Icons.Search size={18} />
                        </div>

                        <input
                          type="text"
                          value={requestSearch}
                          onChange={(e) =>
                            setRequestSearch(e.target.value)
                          }
                          placeholder="Rechercher..."
                          className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 text-sm"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={ouvrirAjoutDemande}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold"
                      >
                        <Icons.Plus size={18} />
                        Ajouter
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[1100px]">
                      <thead className="bg-slate-50">
                        <tr className="text-left text-xs uppercase tracking-wide text-slate-500">
                          <th className="px-5 py-4 font-semibold">
                            Candidat
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Poste recherché
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Localisation
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Contrat
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Statut
                          </th>
                          <th className="px-5 py-4 font-semibold">
                            Date
                          </th>
                          <th className="px-5 py-4 font-semibold text-right">
                            Actions
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-slate-100">
                        {filteredRequests.length > 0 ? (
                          filteredRequests.map((request) => (
                            <tr
                              key={request._id}
                              className="hover:bg-slate-50/70 transition"
                            >
                              <td className="px-5 py-4">
                                <div>
                                  <p className="font-semibold text-slate-800">
                                    {request.candidat?.prenom || ""}{" "}
                                    {request.candidat?.nom || ""}
                                  </p>

                                  <p className="text-xs text-slate-400 mt-1">
                                    {request.candidat?.email || "—"}
                                  </p>
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <p className="font-medium text-slate-700">
                                  {request.posteRecherche || "—"}
                                </p>
                              </td>

                              <td className="px-5 py-4">
                                <div className="flex items-center gap-1.5 text-sm text-slate-600">
                                  <Icons.MapPin size={15} />
                                  {request.localisation || "—"}
                                </div>
                              </td>

                              <td className="px-5 py-4">
                                <span className="inline-flex px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                                  {request.typeContrat || "—"}
                                </span>
                              </td>

                              <td className="px-5 py-4">
                                <span
                                  className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                    request.statut === "Active"
                                      ? "bg-green-50 text-green-700"
                                      : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {request.statut || "—"}
                                </span>
                              </td>

                              <td className="px-5 py-4 text-sm text-slate-500">
                                {formatDate(request.createdAt)}
                              </td>

                              <td className="px-5 py-4">
                                <ActionButtons
                                  onEdit={() =>
                                    ouvrirModificationDemande(request)
                                  }
                                  onDelete={() =>
                                    demanderSuppression(
                                      "request",
                                      request._id,
                                      `la demande de ${
                                        request.candidat?.prenom || ""
                                      } ${
                                        request.candidat?.nom || ""
                                      }`
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              colSpan="7"
                              className="px-5 py-12 text-center text-slate-400"
                            >
                              Aucune demande trouvée.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* =======================================================
          MODALE UTILISATEUR
      ======================================================== */}

      {modalType === "user" && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] overflow-hidden">

            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 flex items-center justify-between gap-3">

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingId
                    ? "Modifier l'utilisateur"
                    : userForm.role === "candidat"
                    ? "Ajouter un candidat"
                    : "Ajouter un recruteur"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Renseignez les informations du compte.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-2 flex-shrink-0 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <Icons.X />
              </button>
            </div>

            <form
              onSubmit={enregistrerUtilisateur}
              className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-145px)]"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Prénom *
                  </label>

                  <input
                    type="text"
                    value={userForm.prenom}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        prenom: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Nom *
                  </label>

                  <input
                    type="text"
                    value={userForm.nom}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        nom: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email *
                  </label>

                  <input
                    type="email"
                    value={userForm.email}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                {!editingId && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Mot de passe *
                    </label>

                    <input
                      type="password"
                      value={userForm.password}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          password: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rôle
                  </label>

                  <select
                    value={userForm.role}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        role: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
                  >
                    <option value="candidat">Candidat</option>
                    <option value="recruteur">Recruteur</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Téléphone
                  </label>

                  <input
                    type="text"
                    value={userForm.telephone}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        telephone: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Localisation
                  </label>

                  <input
                    type="text"
                    value={userForm.localisation}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        localisation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                {userForm.role === "recruteur" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Entreprise
                      </label>

                      <input
                        type="text"
                        value={userForm.entreprise}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            entreprise: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Secteur
                      </label>

                      <input
                        type="text"
                        value={userForm.secteur}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            secteur: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                      />
                    </div>
                  </>
                )}

                {userForm.role === "candidat" && (
                  <>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Compétences
                      </label>

                      <input
                        type="text"
                        value={userForm.competences}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            competences: e.target.value,
                          })
                        }
                        placeholder="Ex : JavaScript, React, Node.js"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                      />

                      <p className="text-xs text-slate-400 mt-1">
                        Séparez les compétences par des virgules.
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>

                      <textarea
                        rows="4"
                        value={userForm.description}
                        onChange={(e) =>
                          setUserForm({
                            ...userForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && <Icons.Loader size={17} />}
                  {editingId ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          MODALE OFFRE
      ======================================================== */}

      {modalType === "job" && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden">

            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 flex items-center justify-between gap-3">

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingId
                    ? "Modifier l'offre"
                    : "Ajouter une offre"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Renseignez les informations de l'offre.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-2 flex-shrink-0 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <Icons.X />
              </button>
            </div>

            <form
              onSubmit={enregistrerOffre}
              className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-145px)]"
            >
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Titre de l'offre *
                  </label>

                  <input
                    type="text"
                    value={jobForm.titre}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        titre: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Recruteur *
                  </label>

                  <select
                    value={jobForm.auteur}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        auteur: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
                  >
                    <option value="">
                      Sélectionner un recruteur
                    </option>

                    {recruiters.map((recruiter) => (
                      <option
                        key={recruiter._id}
                        value={recruiter._id}
                      >
                        {recruiter.prenom} {recruiter.nom}
                        {recruiter.entreprise
                          ? ` — ${recruiter.entreprise}`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Localisation *
                  </label>

                  <input
                    type="text"
                    value={jobForm.localisation}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        localisation: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Compétences
                  </label>

                  <input
                    type="text"
                    value={jobForm.competences}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        competences: e.target.value,
                      })
                    }
                    placeholder="Ex : React, Node.js, MongoDB"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />

                  <p className="text-xs text-slate-400 mt-1">
                    Séparez les compétences par des virgules.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description *
                  </label>

                  <textarea
                    rows="6"
                    value={jobForm.description}
                    onChange={(e) =>
                      setJobForm({
                        ...jobForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && <Icons.Loader size={17} />}
                  {editingId ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          MODALE DEMANDE
      ======================================================== */}

      {modalType === "request" && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-hidden">

            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-200 flex items-center justify-between gap-3">

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  {editingId
                    ? "Modifier la demande"
                    : "Ajouter une demande"}
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Renseignez les informations de la demande.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="p-2 flex-shrink-0 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              >
                <Icons.X />
              </button>
            </div>

            <form
              onSubmit={enregistrerDemande}
              className="p-4 sm:p-6 overflow-y-auto max-h-[calc(92vh-145px)]"
            >
              <div className="space-y-5">

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Candidat *
                  </label>

                  <select
                    value={requestForm.candidat}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        candidat: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
                  >
                    <option value="">
                      Sélectionner un candidat
                    </option>

                    {candidates.map((candidate) => (
                      <option
                        key={candidate._id}
                        value={candidate._id}
                      >
                        {candidate.prenom} {candidate.nom}
                        {candidate.email
                          ? ` — ${candidate.email}`
                          : ""}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Poste recherché *
                  </label>

                  <input
                    type="text"
                    value={requestForm.posteRecherche}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        posteRecherche: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Localisation *
                    </label>

                    <input
                      type="text"
                      value={requestForm.localisation}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          localisation: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Type de contrat *
                    </label>

                    <input
                      type="text"
                      value={requestForm.typeContrat}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          typeContrat: e.target.value,
                        })
                      }
                      placeholder="Ex : CDI, CDD, Stage..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Compétences
                  </label>

                  <input
                    type="text"
                    value={requestForm.competences}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        competences: e.target.value,
                      })
                    }
                    placeholder="Ex : Communication, Excel, Gestion"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
                  />

                  <p className="text-xs text-slate-400 mt-1">
                    Séparez les compétences par des virgules.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Statut
                  </label>

                  <select
                    value={requestForm.statut}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        statut: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 bg-white"
                  >
                    <option value="Active">Active</option>
                    <option value="Fermée">Fermée</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description *
                  </label>

                  <textarea
                    rows="6"
                    value={requestForm.description}
                    onChange={(e) =>
                      setRequestForm({
                        ...requestForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 resize-none"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7 pt-5 border-t border-slate-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving && <Icons.Loader size={17} />}
                  {editingId ? "Enregistrer" : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =======================================================
          CONFIRMATION SUPPRESSION
      ======================================================== */}

      {confirmDelete.open && (
        <div className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">

          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">

            <div className="p-5 sm:p-6">

              <div className="flex items-start gap-3 sm:gap-4">

                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                  <Icons.Trash size={22} />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">
                    Confirmer la suppression
                  </h2>

                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    Voulez-vous vraiment supprimer{" "}
                    <span className="font-semibold text-slate-700 break-words">
                      {confirmDelete.label}
                    </span>
                    {" "}?
                  </p>

                  <p className="text-xs text-slate-400 mt-2">
                    Cette action est irréversible.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={annulerSuppression}
                  className="p-1.5 flex-shrink-0 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                >
                  <Icons.X size={18} />
                </button>
              </div>

              <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={annulerSuppression}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={confirmerSuppression}
                  className="px-5 py-2.5 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                >
                  Supprimer
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

