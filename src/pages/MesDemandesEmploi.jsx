import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/* ==================================================
   ICÔNES SELON LE MÉTIER
================================================== */

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M8 9l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 5l-4 14" strokeLinecap="round" />
  </svg>
);

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M5 17h14l-1-7H6l-1 7Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 10l1.5-4h7L17 10" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="17" r="1.5" />
    <circle cx="16" cy="17" r="1.5" />
    <path d="M5 13h14" strokeLinecap="round" />
  </svg>
);

const HealthIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 9v6M9 12h6" strokeLinecap="round" />
  </svg>
);

const EducationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M3 9l9-5 9 5-9 5-9-5Z" strokeLinejoin="round" />
    <path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5" strokeLinecap="round" />
    <path d="M21 10v5" strokeLinecap="round" />
  </svg>
);

const MechanicIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M14.5 6.5a4 4 0 0 0-5.1 5.1L4 17l3 3 5.4-5.4a4 4 0 0 0 5.1-5.1l-2.3 2.3-2.7-2.7 2-2.6Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FinanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 16v-3M12 16V9M16 16v-5" strokeLinecap="round" />
  </svg>
);

const ConstructionIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M3 20h18" strokeLinecap="round" />
    <path d="M5 20V10l7-5 7 5v10" strokeLinejoin="round" />
    <path d="M9 20v-5h6v5" strokeLinejoin="round" />
    <path d="M8 10h8" strokeLinecap="round" />
  </svg>
);

const ChefIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M7 10a4 4 0 0 1 1-7 4 4 0 0 1 4 2 4 4 0 0 1 4-2 4 4 0 0 1 1 7"
      strokeLinecap="round"
    />
    <path d="M6 10h12v3H6z" strokeLinejoin="round" />
    <path d="M8 13v7h8v-7" strokeLinejoin="round" />
    <path d="M10 16h4" strokeLinecap="round" />
  </svg>
);

const ShoppingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M5 8h14l-1 11H6L5 8Z" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
    <path d="M9 12h6" strokeLinecap="round" />
  </svg>
);

const DesignIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M4 17.5V20h2.5L18 8.5 15.5 6 4 17.5Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14 7.5L16.5 10" strokeLinecap="round" />
    <path d="M19 5l.5.5M20 8h1M17 3v-1" strokeLinecap="round" />
  </svg>
);

const MarketingIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M4 12h4l9-5v10l-9-5H4v5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 9a5 5 0 0 1 0 6" strokeLinecap="round" />
  </svg>
);

const TruckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M3 6h11v11H3zM14 10h4l3 3v4h-7z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="7" cy="18" r="1.5" />
    <circle cx="18" cy="18" r="1.5" />
  </svg>
);

const ElectricalIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path
      d="M13 2L5 13h6l-1 9 8-11h-6l1-9Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CameraIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7l1.5-3h5L16 7" strokeLinecap="round" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <path d="M3 11.5L12 4l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 10v10h14V10" strokeLinejoin="round" />
    <path d="M9 20v-5h6v5" strokeLinejoin="round" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" strokeLinecap="round" />
    <path d="M10 12v2h4v-2" strokeLinecap="round" />
  </svg>
);

/* ==================================================
   CHOISIR L'ICÔNE SELON LE POSTE RECHERCHÉ
================================================== */

const getMetierIcon = (poste = "") => {
  const texte = poste
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (
    texte.includes("developpeur") ||
    texte.includes("developer") ||
    texte.includes("informatique") ||
    texte.includes("programm") ||
    texte.includes("full stack") ||
    texte.includes("frontend") ||
    texte.includes("backend") ||
    texte.includes("logiciel") ||
    texte.includes("software") ||
    texte.includes("data") ||
    texte.includes("cyber") ||
    texte.includes("reseau")
  ) {
    return <CodeIcon />;
  }

  if (
    texte.includes("chauffeur") ||
    texte.includes("conducteur") ||
    texte.includes("taxi") ||
    texte.includes("transport")
  ) {
    return <CarIcon />;
  }

  if (
    texte.includes("medecin") ||
    texte.includes("infirmier") ||
    texte.includes("pharmac") ||
    texte.includes("dentiste") ||
    texte.includes("sage-femme") ||
    texte.includes("sante")
  ) {
    return <HealthIcon />;
  }

  if (
    texte.includes("enseignant") ||
    texte.includes("professeur") ||
    texte.includes("formateur") ||
    texte.includes("educateur") ||
    texte.includes("education") ||
    texte.includes("instituteur")
  ) {
    return <EducationIcon />;
  }

  if (
    texte.includes("mecanicien") ||
    texte.includes("mecanique") ||
    texte.includes("garage")
  ) {
    return <MechanicIcon />;
  }

  if (
    texte.includes("comptable") ||
    texte.includes("comptabilite") ||
    texte.includes("finance") ||
    texte.includes("financier") ||
    texte.includes("banque") ||
    texte.includes("banquier") ||
    texte.includes("auditeur")
  ) {
    return <FinanceIcon />;
  }

  if (
    texte.includes("macon") ||
    texte.includes("construction") ||
    texte.includes("batiment") ||
    texte.includes("architecte") ||
    texte.includes("ingenieur") ||
    texte.includes("chantier") ||
    texte.includes("plombier")
  ) {
    return <ConstructionIcon />;
  }

  if (
    texte.includes("cuisinier") ||
    texte.includes("cuisine") ||
    texte.includes("chef cuisinier") ||
    texte.includes("patissier") ||
    texte.includes("restaurant") ||
    texte.includes("serveur")
  ) {
    return <ChefIcon />;
  }

  if (
    texte.includes("vendeur") ||
    texte.includes("commercial") ||
    texte.includes("commerce") ||
    texte.includes("caissier") ||
    texte.includes("boutique") ||
    texte.includes("vente")
  ) {
    return <ShoppingIcon />;
  }

  if (
    texte.includes("designer") ||
    texte.includes("graphiste") ||
    texte.includes("design") ||
    texte.includes("ux") ||
    texte.includes("ui")
  ) {
    return <DesignIcon />;
  }

  if (
    texte.includes("marketing") ||
    texte.includes("communication") ||
    texte.includes("community manager") ||
    texte.includes("publicite") ||
    texte.includes("reseaux sociaux")
  ) {
    return <MarketingIcon />;
  }

  if (
    texte.includes("livreur") ||
    texte.includes("livraison") ||
    texte.includes("logistique") ||
    texte.includes("transporteur") ||
    texte.includes("magasinier")
  ) {
    return <TruckIcon />;
  }

  if (
    texte.includes("electricien") ||
    texte.includes("electricite")
  ) {
    return <ElectricalIcon />;
  }

  if (
    texte.includes("photographe") ||
    texte.includes("photographie") ||
    texte.includes("photo") ||
    texte.includes("videaste")
  ) {
    return <CameraIcon />;
  }

  if (
    texte.includes("immobilier") ||
    texte.includes("agent immobilier") ||
    texte.includes("immobiliere")
  ) {
    return <HomeIcon />;
  }

  return <BriefcaseIcon />;
};

const MesDemandesEmploi = () => {
  const URL = "https://backend-emmt.onrender.com";
  const token = localStorage.getItem("token");

  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les demandes
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/job-requests/mes-demandes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDemandes(
          Array.isArray(res.data) ? res.data : []
        );
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Impossible de charger vos demandes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [token]);

  // Supprimer une demande
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette demande d'emploi ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await axios.delete(
        `${URL}/api/job-requests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDemandes((prev) =>
        prev.filter((demande) => demande._id !== id)
      );

      toast.success("Demande supprimée avec succès");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  // Chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-500">
            Chargement de vos demandes...
          </p>

        </div>
      </div>
    );
  }

  // Aucune demande
  if (demandes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

          <div className="max-w-6xl mx-auto px-6 py-12">

            <h1 className="text-3xl md:text-4xl font-bold">
              Mes demandes d'emploi
            </h1>

            <p className="mt-3 text-blue-100">
              Gérez vos demandes et présentez votre profil
              aux recruteurs.
            </p>

          </div>

        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">

            <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BriefcaseIcon />
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Aucune demande d'emploi
            </h2>

            <p className="text-slate-500 mt-3">
              Vous n'avez pas encore publié de demande
              d'emploi.
            </p>

            <Link
              to="/creer-demande-emploi"
              className="inline-block mt-7 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Créer une demande
            </Link>

          </div>

        </div>
      </div>
    );
  }

  // Affichage des demandes
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm mb-4">
                Ma recherche d'emploi
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">
                Mes demandes d'emploi
              </h1>

              <p className="mt-3 text-blue-100">
                Gérez les demandes d'emploi que vous avez
                publiées.
              </p>

            </div>

            <Link
              to="/creer-demande-emploi"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition text-center"
            >
              Nouvelle demande
            </Link>

          </div>

        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Compteur */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-7 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <BriefcaseIcon />
            </div>

            <div>

              <p className="text-sm text-slate-500">
                Mes publications
              </p>

              <p className="text-xl font-bold text-slate-800">
                {demandes.length}{" "}
                {demandes.length > 1
                  ? "demandes"
                  : "demande"}
              </p>

            </div>

          </div>

        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {demandes.map((demande) => (

            <div
              key={demande._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
            >

              {/* Barre bleue */}
              <div className="h-2 bg-blue-600"></div>

              <div className="p-6">

                {/* Titre et statut */}
                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-start gap-4 min-w-0">

                    {/* Icône correspondant au poste */}

                    <div
                      className="
                        w-14
                        h-14
                        flex-shrink-0
                        rounded-2xl
                        bg-blue-50
                        text-blue-600
                        border
                        border-blue-100
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                      "
                    >
                      {getMetierIcon(demande.posteRecherche)}
                    </div>

                    <div className="min-w-0">

                      <p className="text-xs font-semibold text-blue-600 uppercase mb-2">
                        Poste recherché
                      </p>

                      <h2 className="text-2xl font-bold text-slate-800">
                        {demande.posteRecherche}
                      </h2>

                    </div>

                  </div>

                  <span
                    className={
                      demande.statut === "Active"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                        : "bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                    }
                  >
                    {demande.statut}
                  </span>

                </div>

                {/* Date */}
                <p className="text-sm text-slate-400 mt-3">
                  Publiée le{" "}
                  {new Date(
                    demande.createdAt
                  ).toLocaleDateString("fr-FR")}
                </p>

                {/* Informations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                  <div className="bg-slate-50 rounded-xl p-4">

                    <p className="text-xs text-slate-400 mb-1">
                      Localisation
                    </p>

                    <p className="font-semibold text-slate-700">
                      {demande.localisation ||
                        "Non précisée"}
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">

                    <p className="text-xs text-slate-400 mb-1">
                      Type de contrat
                    </p>

                    <p className="font-semibold text-slate-700">
                      {demande.typeContrat ||
                        "Non précisé"}
                    </p>

                  </div>

                </div>

                {/* Compétences */}
                {demande.competences &&
                  demande.competences.length > 0 && (

                    <div className="mt-6">

                      <p className="font-bold text-slate-700 mb-3">
                        Compétences
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {demande.competences.map(
                          (competence, index) => (

                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-2 rounded-lg text-sm"
                            >
                              {competence}
                            </span>

                          )
                        )}

                      </div>

                    </div>
                  )}

                {/* Description */}
                {demande.description && (

                  <div className="mt-6 bg-slate-50 rounded-xl p-4">

                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                      Présentation
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {demande.description.length > 220
                        ? demande.description.substring(
                            0,
                            220
                          ) + "..."
                        : demande.description}
                    </p>

                  </div>
                )}

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-slate-100">

                  <Link
                    to={`/modifier-demande-emploi/${demande._id}`}
                    className="flex-1 text-center bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
                  >
                    Modifier
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(demande._id)
                    }
                    className="flex-1 bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default MesDemandesEmploi;

