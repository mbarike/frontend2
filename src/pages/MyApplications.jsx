import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

/* ===============================
   ICÔNES DES MÉTIERS
================================ */

const BriefcaseIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
    <path d="M10 12v2h4v-2" />
  </svg>
);

const CodeIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="8 8 4 12 8 16" />
    <polyline points="16 8 20 12 16 16" />
    <line x1="14" y1="5" x2="10" y2="19" />
  </svg>
);

const CarIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 17h14" />
    <path d="M6 17l1-5 2-4h6l2 4 1 5" />
    <path d="M4 17v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
    <circle cx="7.5" cy="17.5" r="1.5" />
    <circle cx="16.5" cy="17.5" r="1.5" />
    <path d="M9 12h6" />
  </svg>
);

const HealthIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 21s-7-4.5-7-10.2A4.1 4.1 0 0 1 12 8a4.1 4.1 0 0 1 7 2.8C19 16.5 12 21 12 21z" />
    <path d="M12 7v6" />
    <path d="M9 10h6" />
  </svg>
);

const EducationIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-5 9 5-9 5-9-5z" />
    <path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5" />
    <path d="M21 9v6" />
  </svg>
);

const MechanicIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.2 2.2-2.5-.5-.5-2.5z" />
  </svg>
);

const FinanceIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 9h10" />
    <path d="M7 13h3" />
    <path d="M15 13h2" />
    <path d="M7 16h5" />
  </svg>
);

const ConstructionIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20h16" />
    <path d="M6 20V9l6-4 6 4v11" />
    <path d="M9 20v-5h6v5" />
    <path d="M9 9h.01" />
    <path d="M15 9h.01" />
  </svg>
);

const ChefIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 4v6" />
    <path d="M9 4v6" />
    <path d="M12 4v6" />
    <path d="M6 10h6" />
    <path d="M9 10v10" />
    <path d="M16 4c2 1 3 3 3 5 0 2-1 3-3 3v8" />
  </svg>
);

const ShoppingIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 8h16l-1 12H5L4 8z" />
    <path d="M8 8a4 4 0 0 1 8 0" />
    <path d="M8 12h.01" />
    <path d="M16 12h.01" />
  </svg>
);

const DesignIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 17l10-10 3 3L7 20H4v-3z" />
    <path d="M13 8l3 3" />
    <path d="M18 4l2 2" />
    <path d="M17 7l3-3" />
  </svg>
);

const MarketingIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 12h4l8-4v8l-8-4H4z" />
    <path d="M8 12v6" />
    <path d="M20 9a4 4 0 0 1 0 6" />
  </svg>
);

const TruckIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h11v11H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

const ElectricalIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" />
  </svg>
);

const CameraIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 8h4l2-2h4l2 2h4v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

const HomeIcon = ({ className = "w-7 h-7" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>
);


/* ===============================
   CHOIX DE L'ICÔNE SELON LE POSTE
================================ */

const getMetierIcon = (titre = "") => {
  const texte = titre.toLowerCase();

  if (
    texte.includes("développeur") ||
    texte.includes("developpeur") ||
    texte.includes("informatique") ||
    texte.includes("informaticien") ||
    texte.includes("programm") ||
    texte.includes("full stack") ||
    texte.includes("frontend") ||
    texte.includes("front-end") ||
    texte.includes("backend") ||
    texte.includes("back-end") ||
    texte.includes("software") ||
    texte.includes("logiciel") ||
    texte.includes("data") ||
    texte.includes("cyber") ||
    texte.includes("web")
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
    texte.includes("médecin") ||
    texte.includes("medecin") ||
    texte.includes("infirmier") ||
    texte.includes("infirmière") ||
    texte.includes("pharmacien") ||
    texte.includes("pharmacienne") ||
    texte.includes("dentiste") ||
    texte.includes("sage-femme") ||
    texte.includes("santé") ||
    texte.includes("sante")
  ) {
    return <HealthIcon />;
  }

  if (
    texte.includes("enseignant") ||
    texte.includes("enseignante") ||
    texte.includes("professeur") ||
    texte.includes("professeure") ||
    texte.includes("formateur") ||
    texte.includes("formatrice") ||
    texte.includes("éducateur") ||
    texte.includes("educateur") ||
    texte.includes("instituteur") ||
    texte.includes("institutrice") ||
    texte.includes("éducation") ||
    texte.includes("education")
  ) {
    return <EducationIcon />;
  }

  if (
    texte.includes("mécanicien") ||
    texte.includes("mecanicien") ||
    texte.includes("mécanique") ||
    texte.includes("mecanique") ||
    texte.includes("garage")
  ) {
    return <MechanicIcon />;
  }

  if (
    texte.includes("comptable") ||
    texte.includes("comptabilité") ||
    texte.includes("comptabilite") ||
    texte.includes("finance") ||
    texte.includes("financier") ||
    texte.includes("financière") ||
    texte.includes("banque") ||
    texte.includes("banquier") ||
    texte.includes("auditeur") ||
    texte.includes("audit")
  ) {
    return <FinanceIcon />;
  }

  if (
    texte.includes("maçon") ||
    texte.includes("macon") ||
    texte.includes("construction") ||
    texte.includes("bâtiment") ||
    texte.includes("batiment") ||
    texte.includes("architecte") ||
    texte.includes("ingénieur") ||
    texte.includes("ingenieur") ||
    texte.includes("chantier") ||
    texte.includes("plombier")
  ) {
    return <ConstructionIcon />;
  }

  if (
    texte.includes("cuisinier") ||
    texte.includes("cuisinière") ||
    texte.includes("cuisine") ||
    texte.includes("chef cuisinier") ||
    texte.includes("pâtissier") ||
    texte.includes("patissier") ||
    texte.includes("restaurant") ||
    texte.includes("serveur")
  ) {
    return <ChefIcon />;
  }

  if (
    texte.includes("vendeur") ||
    texte.includes("vendeuse") ||
    texte.includes("commercial") ||
    texte.includes("commerce") ||
    texte.includes("caissier") ||
    texte.includes("caissière") ||
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
    texte.includes("publicité") ||
    texte.includes("publicite") ||
    texte.includes("réseaux sociaux") ||
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
    texte.includes("électricien") ||
    texte.includes("electricien") ||
    texte.includes("électricité") ||
    texte.includes("electricite")
  ) {
    return <ElectricalIcon />;
  }

  if (
    texte.includes("photographe") ||
    texte.includes("photographie") ||
    texte.includes("photo") ||
    texte.includes("vidéaste") ||
    texte.includes("videaste")
  ) {
    return <CameraIcon />;
  }

  if (
    texte.includes("immobilier") ||
    texte.includes("immobilière") ||
    texte.includes("immobiliere") ||
    texte.includes("agent immobilier")
  ) {
    return <HomeIcon />;
  }

  return <BriefcaseIcon />;
};


/* ===============================
   COMPOSANT PRINCIPAL
================================ */

const MyApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(
        "https://backend-emmt.onrender.com/api/applications/mes-demandes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setApplications(res.data);
      })
      .catch((error) => {
        console.log(error);

        toast.error(
          "Impossible de charger vos candidatures"
        );
      });
  }, []);


  // ===============================
  // STATUT
  // ===============================

  const getStatusStyle = (statut) => {
    if (statut === "Acceptée") {
      return {
        container:
          "bg-green-50 border-green-200 text-green-700",
        icon: "Acceptée",
        text: "Candidature acceptée",
      };
    }

    if (statut === "Refusée") {
      return {
        container:
          "bg-red-50 border-red-200 text-red-700",
        icon: "Refusée",
        text: "Candidature refusée",
      };
    }

    return {
      container:
        "bg-yellow-50 border-yellow-200 text-yellow-700",
      icon: "En attente",
      text: "En attente de réponse",
    };
  };


  // ===============================
  // DATE
  // ===============================

  const formatDate = (date) => {
    if (!date) {
      return null;
    }

    return new Date(date).toLocaleDateString(
      "fr-FR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );
  };


  const formatTime = (date) => {
    if (!date) {
      return null;
    }

    return new Date(date).toLocaleTimeString(
      "fr-FR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };


  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        py-10
        px-4
        md:px-6
      "
    >
      <div className="max-w-6xl mx-auto">

        {/* ========================= */}
        {/* EN-TÊTE */}
        {/* ========================= */}

        <div
          className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-6
            md:p-8
            mb-8
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-5
            "
          >
            <div>
              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-2
                "
              >
                <div
                  className="
                    w-12
                    h-12
                    bg-blue-50
                    text-blue-600
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  "
                >
                  <BriefcaseIcon className="w-6 h-6" />
                </div>

                <h1
                  className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    text-gray-800
                  "
                >
                  Mes candidatures
                </h1>
              </div>

              <p className="text-gray-500 mt-2">
                Suivez l'évolution de vos candidatures.
              </p>
            </div>

            {applications.length > 0 && (
              <div
                className="
                  border
                  border-gray-200
                  rounded-xl
                  px-5
                  py-3
                  text-center
                  min-w-[120px]
                "
              >
                <div className="text-2xl font-bold text-blue-600">
                  {applications.length}
                </div>

                <div className="text-sm text-gray-500">
                  candidature{applications.length > 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        </div>


        {/* ========================= */}
        {/* AUCUNE CANDIDATURE */}
        {/* ========================= */}

        {applications.length === 0 && (
          <div
            className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              border-gray-100
              p-10
              md:p-16
              text-center
            "
          >
            <div
              className="
                w-20
                h-20
                bg-blue-50
                text-blue-600
                rounded-full
                flex
                items-center
                justify-center
                mx-auto
                mb-5
              "
            >
              <BriefcaseIcon className="w-9 h-9" />
            </div>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >
              Aucune candidature
            </h2>

            <p
              className="
                text-gray-500
                mt-2
                max-w-md
                mx-auto
              "
            >
              Vous n'avez encore envoyé aucune candidature.
              Découvrez les offres disponibles et postulez
              à celles qui vous intéressent.
            </p>

            <Link
              to="/"
              className="
                inline-block
                mt-6
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-6
                py-3
                rounded-xl
                font-semibold
                transition
              "
            >
              Voir les offres
            </Link>
          </div>
        )}


        {/* ========================= */}
        {/* LISTE DES CANDIDATURES */}
        {/* ========================= */}

        {applications.length > 0 && (
          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >
            {applications.map((app) => {
              const status = getStatusStyle(app.statut);

              return (
                <div
                  key={app._id}
                  className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    hover:-translate-y-1
                    transition-all
                    duration-200
                    overflow-hidden
                  "
                >
                  <div className="p-6">

                    {/* ICÔNE + TITRE */}

                    <div
                      className="
                        flex
                        items-start
                        gap-4
                      "
                    >
                      <div
                        className="
                          w-14
                          h-14
                          bg-blue-50
                          text-blue-600
                          rounded-xl
                          flex
                          items-center
                          justify-center
                          flex-shrink-0
                        "
                      >
                        {getMetierIcon(app.offre?.titre)}
                      </div>

                      <div className="min-w-0">
                        <h2
                          className="
                            text-xl
                            font-bold
                            text-gray-800
                            line-clamp-2
                          "
                        >
                          {app.offre?.titre || "Offre inconnue"}
                        </h2>

                        <p
                          className="
                            text-sm
                            text-gray-500
                            mt-1
                          "
                        >
                          {app.offre?.localisation ||
                            "Localisation non précisée"}
                        </p>
                      </div>
                    </div>


                    {/* DESCRIPTION */}

                    {app.offre?.description && (
                      <p
                        className="
                          text-gray-600
                          mt-5
                          leading-relaxed
                          line-clamp-2
                        "
                      >
                        {app.offre.description}
                      </p>
                    )}


                    {/* DATE DE CANDIDATURE */}

                    {app.createdAt && (
                      <div
                        className="
                          mt-5
                          text-sm
                          text-gray-400
                        "
                      >
                        Candidature envoyée le{" "}
                        {formatDate(app.createdAt)}
                        {" "}à{" "}
                        {formatTime(app.createdAt)}
                      </div>
                    )}


                    {/* MESSAGE */}

                    {app.message && (
                      <div
                        className="
                          mt-5
                          bg-gray-50
                          border
                          border-gray-100
                          rounded-xl
                          p-4
                        "
                      >
                        <div
                          className="
                            text-sm
                            font-semibold
                            text-gray-700
                            mb-2
                          "
                        >
                          Votre message
                        </div>

                        <p
                          className="
                            text-gray-600
                            text-sm
                            leading-relaxed
                            line-clamp-3
                          "
                        >
                          {app.message}
                        </p>
                      </div>
                    )}


                    {/* STATUT */}

                    <div
                      className={`
                        mt-5
                        border
                        rounded-xl
                        px-4
                        py-3
                        flex
                        items-center
                        gap-3
                        ${status.container}
                      `}
                    >
                      <div
                        className="
                          w-2.5
                          h-2.5
                          rounded-full
                          bg-current
                          flex-shrink-0
                        "
                      ></div>

                      <div>
                        <div className="text-sm font-semibold">
                          {status.text}
                        </div>

                        <div
                          className="
                            text-xs
                            opacity-75
                            mt-0.5
                          "
                        >
                          Statut : {app.statut}
                        </div>
                      </div>
                    </div>
                  </div>


                  {/* BOUTON */}

                  {app.offre?._id && (
                    <div
                      className="
                        border-t
                        border-gray-100
                        px-6
                        py-4
                        bg-gray-50
                      "
                    >
                      <Link
                        to={`/jobs/${app.offre._id}`}
                        className="
                          block
                          w-full
                          text-center
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          py-3
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >
                        Voir l'offre
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;

