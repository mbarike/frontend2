
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// =================================================
// ICÔNES
// =================================================

const BriefcaseIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 7V5C8 3.9 8.9 3 10 3H14C15.1 3 16 3.9 16 5V7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 11H21" stroke="currentColor" strokeWidth="1.8" />
    <path d="M10 11V13H14V11" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const CodeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M8 8L4 12L8 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8L20 12L16 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 5L10 19" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const CarIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 17H19L20 12L18 7H6L4 12L5 17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 7L8 4H16L18 7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="8" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="16" cy="17" r="1.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const HealthIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 21C12 21 4 16.5 4 10C4 6.7 6.2 4 9.2 4C10.7 4 11.7 4.7 12 6C12.3 4.7 13.3 4 14.8 4C17.8 4 20 6.7 20 10C20 16.5 12 21 12 21Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 11H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 8V14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const EducationIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 9L12 4L21 9L12 14L3 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 11V16C9.8 18.5 14.2 18.5 17 16V11" stroke="currentColor" strokeWidth="1.8" />
    <path d="M21 9V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const MechanicIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M14 6.5C14 8.4 15.6 10 17.5 10C18.2 10 18.8 9.8 19.3 9.5L21 11.2L16.2 16L14.5 14.3C14.8 13.8 15 13.2 15 12.5C15 10.6 13.4 9 11.5 9C10.8 9 10.2 9.2 9.7 9.5L8 7.8L12.8 3L14.5 4.7C14.2 5.2 14 5.8 14 6.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M5 19L9.5 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M4 20L7 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const FinanceIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 9H21" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="14" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M12 12.5V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ConstructionIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 20L9 8L14 20" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M7 14H11" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15 20V5H20V20" stroke="currentColor" strokeWidth="1.8" />
    <path d="M14 5H21" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ChefIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6 10C4.9 10 4 9.1 4 8C4 6.9 4.9 6 6 6C6.2 4.3 7.7 3 9.5 3C10.5 3 11.4 3.4 12 4.1C12.6 3.4 13.5 3 14.5 3C16.3 3 17.8 4.3 18 6C19.1 6 20 6.9 20 8C20 9.1 19.1 10 18 10H6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M6 10V20H18V10" stroke="currentColor" strokeWidth="1.8" />
    <path d="M9 14H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const ShoppingIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 8H20L18.5 20H5.5L4 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M8 8C8 5.8 9.8 4 12 4C14.2 4 16 5.8 16 8" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const DesignIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 17L17 4L20 7L7 20H4V17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M14 7L17 10" stroke="currentColor" strokeWidth="1.8" />
    <path d="M4 20H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const MarketingIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 11V17H7L12 20V4L7 7H4V11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M16 9C17.3 10.3 17.3 13.7 16 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M19 6.5C22 9.5 22 14.5 19 17.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const TruckIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 6H15V17H3V6Z" stroke="currentColor" strokeWidth="1.8" />
    <path d="M15 10H19L21 13V17H15V10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="7" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="18" cy="18" r="2" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const ElectricalIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M13 2L5 13H11L10 22L19 10H13L13 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const CameraIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 7H8L10 4H14L16 7H20V19H4V7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="12" cy="13" r="3.5" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const HomeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M3 11L12 3L21 11V20H3V11Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M9 20V14H15V20" stroke="currentColor" strokeWidth="1.8" />
  </svg>
);

const UsersIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="9" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3 21V19C3 16.8 4.8 15 7 15H11C13.2 15 15 16.8 15 19V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 11C18.2 11 20 12.8 20 15V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M15 5.2C16.9 5.7 18 7.5 17.5 9.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const EditIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 20H21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16.5 3.5C17.3 2.7 18.7 2.7 19.5 3.5C20.3 4.3 20.3 5.7 19.5 6.5L8 18L3 19.5L4.5 14.5L16.5 3.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

const TrashIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M4 7H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M9 7V4H15V7" stroke="currentColor" strokeWidth="1.8" />
    <path d="M6 7L7 20H17L18 7" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="M10 11V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 11V17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const PlusIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// =================================================
// ICÔNE SELON LE MÉTIER
// =================================================

const getMetierIcon = (titre) => {
  const texte = (titre || "").toLowerCase();

  // Informatique / développement
  if (
    texte.includes("développeur") ||
    texte.includes("developpeur") ||
    texte.includes("developer") ||
    texte.includes("programmeur") ||
    texte.includes("programmation") ||
    texte.includes("informatique") ||
    texte.includes("informaticien") ||
    texte.includes("full stack") ||
    texte.includes("frontend") ||
    texte.includes("front-end") ||
    texte.includes("backend") ||
    texte.includes("back-end") ||
    texte.includes("logiciel") ||
    texte.includes("data") ||
    texte.includes("cybersécurité") ||
    texte.includes("cybersecurite")
  ) {
    return <CodeIcon size={27} />;
  }

  // Chauffeur / transport
  if (
    texte.includes("chauffeur") ||
    texte.includes("conducteur") ||
    texte.includes("taxi") ||
    texte.includes("transport")
  ) {
    return <CarIcon size={27} />;
  }

  // Santé
  if (
    texte.includes("médecin") ||
    texte.includes("medecin") ||
    texte.includes("infirmier") ||
    texte.includes("infirmière") ||
    texte.includes("infirmiere") ||
    texte.includes("pharmacien") ||
    texte.includes("pharmacie") ||
    texte.includes("dentiste") ||
    texte.includes("sage-femme") ||
    texte.includes("santé") ||
    texte.includes("sante")
  ) {
    return <HealthIcon size={27} />;
  }

  // Enseignement
  if (
    texte.includes("enseignant") ||
    texte.includes("enseignante") ||
    texte.includes("professeur") ||
    texte.includes("professeure") ||
    texte.includes("formateur") ||
    texte.includes("formatrice") ||
    texte.includes("éducateur") ||
    texte.includes("educateur") ||
    texte.includes("éducation") ||
    texte.includes("education") ||
    texte.includes("instituteur")
  ) {
    return <EducationIcon size={27} />;
  }

  // Mécanique
  if (
    texte.includes("mécanicien") ||
    texte.includes("mecanicien") ||
    texte.includes("mécanique") ||
    texte.includes("mecanique") ||
    texte.includes("garage")
  ) {
    return <MechanicIcon size={27} />;
  }

  // Finance / comptabilité
  if (
    texte.includes("comptable") ||
    texte.includes("comptabilité") ||
    texte.includes("comptabilite") ||
    texte.includes("finance") ||
    texte.includes("financier") ||
    texte.includes("banque") ||
    texte.includes("banquier") ||
    texte.includes("auditeur")
  ) {
    return <FinanceIcon size={27} />;
  }

  // BTP / construction
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
    return <ConstructionIcon size={27} />;
  }

  // Cuisine / restauration
  if (
    texte.includes("cuisinier") ||
    texte.includes("cuisine") ||
    texte.includes("chef cuisinier") ||
    texte.includes("pâtissier") ||
    texte.includes("patissier") ||
    texte.includes("restaurant") ||
    texte.includes("serveur")
  ) {
    return <ChefIcon size={27} />;
  }

  // Commerce / vente
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
    return <ShoppingIcon size={27} />;
  }

  // Design / graphisme
  if (
    texte.includes("designer") ||
    texte.includes("graphiste") ||
    texte.includes("design") ||
    texte.includes("ux") ||
    texte.includes("ui")
  ) {
    return <DesignIcon size={27} />;
  }

  // Marketing / communication
  if (
    texte.includes("marketing") ||
    texte.includes("communication") ||
    texte.includes("communicateur") ||
    texte.includes("publicité") ||
    texte.includes("publicite") ||
    texte.includes("community manager") ||
    texte.includes("réseaux sociaux") ||
    texte.includes("reseaux sociaux")
  ) {
    return <MarketingIcon size={27} />;
  }

  // Logistique / livraison
  if (
    texte.includes("livreur") ||
    texte.includes("livraison") ||
    texte.includes("logistique") ||
    texte.includes("transporteur") ||
    texte.includes("magasinier")
  ) {
    return <TruckIcon size={27} />;
  }

  // Électricité
  if (
    texte.includes("électricien") ||
    texte.includes("electricien") ||
    texte.includes("électricité") ||
    texte.includes("electricite")
  ) {
    return <ElectricalIcon size={27} />;
  }

  // Photographie
  if (
    texte.includes("photographe") ||
    texte.includes("photographie") ||
    texte.includes("photo") ||
    texte.includes("vidéaste") ||
    texte.includes("videaste")
  ) {
    return <CameraIcon size={27} />;
  }

  // Immobilier
  if (
    texte.includes("immobilier") ||
    texte.includes("agent immobilier") ||
    texte.includes("immobilière") ||
    texte.includes("immobiliere")
  ) {
    return <HomeIcon size={27} />;
  }

  // Icône par défaut
  return <BriefcaseIcon size={27} />;
};

// =================================================
// COMPOSANT PRINCIPAL
// =================================================

const MesOffres = () => {
  const [offres, setOffres] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  // =================================================
  // CHARGER MES OFFRES
  // =================================================

  const fetchOffres = async () => {
    try {
      const res = await axios.get(
        "https://backend-emmt.onrender.com/api/jobs/mes-offres",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOffres(res.data);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      toast.error("Impossible de charger vos offres.");
    }
  };

  useEffect(() => {
    fetchOffres();
  }, []);

  // =================================================
  // SUPPRIMER UNE OFFRE
  // =================================================

  const supprimerOffre = (id) => {
    const toastId = toast.custom(
      (t) => (
        <div
          className={`
            ${
              t.visible
                ? "animate-enter"
                : "animate-leave"
            }
            bg-white
            border
            border-gray-200
            shadow-xl
            rounded-2xl
            p-5
            w-[360px]
            max-w-[calc(100vw-32px)]
          `}
        >
          <div className="flex items-start gap-3">
            <div
              className="
                w-11
                h-11
                bg-red-50
                text-red-600
                rounded-xl
                flex
                items-center
                justify-center
                flex-shrink-0
              "
            >
              <TrashIcon size={21} />
            </div>

            <div>
              <h3 className="font-bold text-gray-800">
                Supprimer cette offre ?
              </h3>

              <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                Cette action est définitive.
              </p>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => toast.dismiss(toastId)}
              className="
                flex-1
                border
                border-gray-200
                bg-gray-50
                hover:bg-gray-100
                text-gray-700
                py-2.5
                rounded-lg
                font-semibold
                text-sm
                transition
              "
            >
              Annuler
            </button>

            <button
              onClick={async () => {
                toast.dismiss(toastId);

                try {
                  await axios.delete(
                    `https://backend-emmt.onrender.com/api/jobs/${id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  );

                  setOffres((offresActuelles) =>
                    offresActuelles.filter(
                      (offre) => offre._id !== id
                    )
                  );

                  toast.success(
                    "Offre supprimée avec succès !",
                    {
                      duration: 3000,
                      position: "top-right"
                    }
                  );
                } catch (error) {
                  console.log(
                    error.response?.data ||
                      error.message
                  );

                  toast.error(
                    "Impossible de supprimer l'offre.",
                    {
                      duration: 3000,
                      position: "top-right"
                    }
                  );
                }
              }}
              className="
                flex-1
                bg-red-600
                hover:bg-red-700
                text-white
                py-2.5
                rounded-lg
                font-semibold
                text-sm
                transition
              "
            >
              Supprimer
            </button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-right"
      }
    );
  };

  return (
    <div
      className="
        min-h-screen
        bg-gray-100
        px-4
        py-8
        md:py-10
      "
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="max-w-7xl mx-auto mb-8">
        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-6
            md:p-8
          "
        >
          <div
            className="
              flex
              flex-col
              lg:flex-row
              lg:items-center
              lg:justify-between
              gap-6
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  w-14
                  h-14
                  bg-blue-50
                  text-blue-600
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                "
              >
                <BriefcaseIcon size={28} />
              </div>

              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">
                  Espace recruteur
                </p>

                <h1
                  className="
                    text-3xl
                    md:text-4xl
                    font-bold
                    text-gray-800
                  "
                >
                  Mes offres
                </h1>

                <p className="text-gray-500 mt-1">
                  Gérez vos offres d'emploi et vos candidatures.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="
                  bg-blue-50
                  border
                  border-blue-100
                  rounded-xl
                  px-5
                  py-3
                  text-center
                  min-w-[100px]
                "
              >
                <div className="text-2xl font-bold text-blue-600">
                  {offres.length}
                </div>

                <div className="text-xs font-medium text-blue-500">
                  Offre{offres.length > 1 ? "s" : ""}
                </div>
              </div>

              <button
                onClick={() => navigate("/create")}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                  shadow-sm
                  flex
                  items-center
                  gap-2
                "
              >
                <PlusIcon size={18} />
                Publier une offre
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================= */}
      {/* AUCUNE OFFRE */}
      {/* ================================================= */}

      {offres.length === 0 && (
        <div
          className="
            max-w-7xl
            mx-auto
            bg-white
            rounded-2xl
            border
            border-gray-100
            shadow-sm
            p-10
            md:p-16
            text-center
          "
        >
          <div
            className="
              w-20
              h-20
              mx-auto
              bg-blue-50
              text-blue-600
              rounded-2xl
              flex
              items-center
              justify-center
              mb-5
            "
          >
            <BriefcaseIcon size={38} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Aucune offre pour le moment
          </h2>

          <p
            className="
              text-gray-500
              mt-2
              max-w-md
              mx-auto
            "
          >
            Vous n'avez encore publié aucune offre d'emploi.
            Commencez dès maintenant à rechercher vos futurs candidats.
          </p>

          <button
            onClick={() => navigate("/create")}
            className="
              mt-7
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-7
              py-3
              rounded-xl
              font-semibold
              transition
              shadow-sm
              inline-flex
              items-center
              gap-2
            "
          >
            <PlusIcon size={18} />
            Créer ma première offre
          </button>
        </div>
      )}

      {/* ================================================= */}
      {/* LISTE DES OFFRES */}
      {/* ================================================= */}

      <div
        className="
          max-w-7xl
          mx-auto
          grid
          md:grid-cols-2
          xl:grid-cols-3
          gap-6
        "
      >
        {offres.map((offre) => (
          <div
            key={offre._id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-200
              overflow-hidden
              flex
              flex-col
            "
          >
            <div className="h-2 bg-blue-600" />

            <div className="p-6 flex flex-col flex-1">
              {/* TITRE + ICÔNE DU MÉTIER */}

              <div className="flex items-start gap-4">
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
                    flex-shrink-0
                  "
                >
                  {getMetierIcon(offre.titre)}
                </div>

                <div className="flex-1 min-w-0">
                  <h2
                    className="
                      text-xl
                      font-bold
                      text-gray-800
                      leading-snug
                      line-clamp-2
                    "
                  >
                    {offre.titre}
                  </h2>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-2
                      text-xs
                      text-gray-400
                    "
                  >
                    <span
                      className="
                        w-2
                        h-2
                        rounded-full
                        bg-green-500
                        flex-shrink-0
                      "
                    />

                    <span>Offre publiée</span>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}

              <div
                className="
                  mt-5
                  bg-gray-50
                  rounded-xl
                  p-4
                "
              >
                <p
                  className="
                    text-sm
                    text-gray-600
                    leading-relaxed
                    line-clamp-3
                  "
                >
                  {offre.description}
                </p>
              </div>

              {/* INFORMATIONS */}

              <div className="mt-4 space-y-2">
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-600
                  "
                >
                  <span
                    className="
                      w-8
                      h-8
                      bg-gray-100
                      text-gray-600
                      rounded-lg
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    "
                  >
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.6 7.6 2 12 2C16.4 2 20 5.6 20 10Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                  </span>

                  <span className="truncate">
                    {offre.localisation ||
                      "Localisation non précisée"}
                  </span>
                </div>

                {offre.createdAt && (
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-sm
                      text-gray-500
                    "
                  >
                    <span
                      className="
                        w-8
                        h-8
                        bg-gray-100
                        text-gray-600
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        flex-shrink-0
                      "
                    >
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="17"
                          rx="2"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M8 2V6M16 2V6M3 9H21"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>

                    <span>
                      Publiée le{" "}
                      {new Date(
                        offre.createdAt
                      ).toLocaleDateString("fr-FR")}
                      {" à "}
                      {new Date(
                        offre.createdAt
                      ).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* COMPÉTENCES */}

              {offre.competences &&
                offre.competences.length > 0 && (
                  <div className="mt-5">
                    <p
                      className="
                        text-xs
                        font-semibold
                        text-gray-500
                        uppercase
                        tracking-wide
                        mb-2
                      "
                    >
                      Compétences recherchées
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {offre.competences
                        .slice(0, 5)
                        .map((competence, index) => (
                          <span
                            key={index}
                            className="
                              bg-blue-50
                              text-blue-600
                              border
                              border-blue-100
                              text-xs
                              font-medium
                              px-3
                              py-1.5
                              rounded-full
                            "
                          >
                            {competence.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}

              {/* ACTIONS */}

              <div
                className="
                  border-t
                  border-gray-100
                  mt-6
                  pt-5
                "
              >
                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-3
                    gap-2
                  "
                >
                  <button
                    onClick={() =>
                      navigate(`/candidats/${offre._id}`)
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <UsersIcon size={17} />
                    Candidatures
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/edit/${offre._id}`)
                    }
                    className="
                      bg-amber-500
                      hover:bg-amber-600
                      text-white
                      px-3
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <EditIcon size={17} />
                    Modifier
                  </button>

                  <button
                    onClick={() =>
                      supprimerOffre(offre._id)
                    }
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      transition
                      flex
                      items-center
                      justify-center
                      gap-2
                    "
                  >
                    <TrashIcon size={17} />
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MesOffres;

