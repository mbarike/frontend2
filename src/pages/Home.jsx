import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* ==================================================
   ICÔNES SELON LE MÉTIER
================================================== */

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path d="M8 9l-3 3 3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 9l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M14 5l-4 14" strokeLinecap="round" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M5 17h14l-1-7H6l-1 7Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7 10l1.5-4h7L17 10" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="8" cy="17" r="1.5" />
    <circle cx="16" cy="17" r="1.5" />
    <path d="M5 13h14" strokeLinecap="round" />
  </svg>
);

const HealthIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 9v6M9 12h6" strokeLinecap="round" />
  </svg>
);

const EducationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path d="M3 9l9-5 9 5-9 5-9-5Z" strokeLinejoin="round" />
    <path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5" strokeLinecap="round" />
    <path d="M21 10v5" strokeLinecap="round" />
  </svg>
);

const MechanicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M14.5 6.5a4 4 0 0 0-5.1 5.1L4 17l3 3 5.4-5.4a4 4 0 0 0 5.1-5.1l-2.3 2.3-2.7-2.7 2-2.6Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FinanceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M8 16v-3M12 16V9M16 16v-5" strokeLinecap="round" />
  </svg>
);

const ConstructionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path d="M3 20h18" strokeLinecap="round" />
    <path d="M5 20V10l7-5 7 5v10" strokeLinejoin="round" />
    <path d="M9 20v-5h6v5" strokeLinejoin="round" />
    <path d="M8 10h8" strokeLinecap="round" />
  </svg>
);

const ChefIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M5 8h14l-1 11H6L5 8Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 8a3 3 0 0 1 6 0" strokeLinecap="round" />
    <path d="M9 12h6" strokeLinecap="round" />
  </svg>
);

const DesignIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M4 12h4l9-5v10l-9-5H4v5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M20 9a5 5 0 0 1 0 6" strokeLinecap="round" />
  </svg>
);

const TruckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
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
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M13 2L5 13h6l-1 9 8-11h-6l1-9Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7l1.5-3h5L16 7" strokeLinecap="round" />
    <circle cx="12" cy="13.5" r="3.5" />
  </svg>
);

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <path
      d="M3 11.5L12 4l9 7.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M5 10v10h14V10" strokeLinejoin="round" />
    <path d="M9 20v-5h6v5" strokeLinejoin="round" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-7 h-7"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" strokeLinecap="round" />
    <path d="M10 12v2h4v-2" strokeLinecap="round" />
  </svg>
);

/* ==================================================
   CHOISIR L'ICÔNE SELON LE TITRE DU POSTE
================================================== */

const getMetierIcon = (titre = "") => {
  const texte = titre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

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
    texte.includes("instituteur") ||
    texte.includes("enseignante")
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

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [loading, setLoading] = useState(true);

  const URL = "https://backend-emmt.onrender.com";

  // ===============================
  // RÉCUPÉRER LES OFFRES
  // ===============================

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams();

      if (search.trim()) {
        params.append("search", search.trim());
      }

      if (localisation.trim()) {
        params.append("localisation", localisation.trim());
      }

      const res = await axios.get(
        `${URL}/api/jobs?${params.toString()}`
      );

      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // CHARGEMENT INITIAL
  // ===============================

  useEffect(() => {
    fetchJobs();
  }, []);

  // ===============================
  // EFFACER LES FILTRES
  // ===============================

  const resetFilters = () => {
    setSearch("");
    setLocalisation("");

    setTimeout(() => {
      fetchJobs();
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="relative text-white overflow-hidden bg-blue-900">

        <div
          className="
            absolute
            inset-0
            bg-cover
            bg-[center_25%]
            bg-no-repeat
          "
          style={{
            backgroundImage: "url('/hero-job.jpg')",
          }}
        ></div>

        <div className="absolute inset-0 bg-slate-950/65"></div>

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-16
            md:py-20
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              lg:gap-16
              items-center
            "
          >

            <div className="text-center lg:text-left">

              <p
                className="
                  text-sm
                  sm:text-base
                  font-semibold
                  text-blue-100
                  mb-5
                "
              >
                Plateforme de mise en relation professionnelle
              </p>

              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  font-extrabold
                  leading-tight
                  tracking-tight
                "
              >
                Trouvez votre
                <br />
                <span className="text-white">
                  prochain emploi
                </span>
              </h1>

              <p
                className="
                  mt-6
                  text-base
                  sm:text-lg
                  text-blue-100
                  max-w-xl
                  mx-auto
                  lg:mx-0
                  leading-relaxed
                "
              >
                JobConnect met en relation les candidats
                à la recherche d'une opportunité et les
                recruteurs à la recherche de nouveaux profils.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  sm:flex-row
                  gap-3
                  justify-center
                  lg:justify-start
                "
              >

                <a
                  href="#offres"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-3.5
                    rounded-xl
                    bg-white
                    text-blue-700
                    font-bold
                    hover:bg-blue-50
                    transition
                    shadow-lg
                  "
                >
                  Consulter les offres
                </a>

                <Link
                  to="/register"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-6
                    py-3.5
                    rounded-xl
                    border
                    border-white
                    text-white
                    font-bold
                    hover:bg-white
                    hover:text-blue-700
                    transition
                  "
                >
                  Créer un compte
                </Link>

              </div>

            </div>

            <div className="hidden lg:block"></div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* RECHERCHE */}
      {/* ================================================== */}

      <section
        className="
          relative
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          -mt-8
          md:-mt-10
        "
      >
        <div
          className="
            bg-white
            rounded-2xl
            shadow-xl
            border
            border-gray-100
            p-3
            md:p-4
          "
        >

          <div className="flex flex-col lg:flex-row gap-3">

            <div className="relative flex-1">

              <input
                type="text"
                placeholder="Rechercher un poste ou une compétence"
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-5
                  py-4
                  text-gray-700
                  bg-gray-50
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchJobs();
                  }
                }}
              />

            </div>

            <div className="relative lg:w-72">

              <input
                type="text"
                placeholder="Localisation"
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  px-5
                  py-4
                  text-gray-700
                  bg-gray-50
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    fetchJobs();
                  }
                }}
              />

            </div>

            <div
              className="
                flex
                flex-col
                sm:flex-row
                gap-2
                lg:flex-shrink-0
              "
            >

              <button
                onClick={fetchJobs}
                className="
                  lg:w-40
                  bg-blue-600
                  hover:bg-blue-700
                  active:bg-blue-800
                  text-white
                  px-6
                  py-4
                  rounded-xl
                  font-bold
                  transition
                  shadow-sm
                  hover:shadow-md
                "
              >
                Rechercher
              </button>

              {(search || localisation) && (
                <button
                  onClick={resetFilters}
                  className="
                    lg:w-28
                    bg-gray-100
                    hover:bg-gray-200
                    text-gray-600
                    px-5
                    py-4
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  Effacer
                </button>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* PRÉSENTATION */}
      {/* ================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-14
          md:pt-16
        "
      >

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              p-7
              shadow-sm
            "
          >

            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Vous êtes candidat ?
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Consultez les offres disponibles, créez votre
              profil professionnel, envoyez vos candidatures
              et gérez vos demandes d'emploi depuis votre espace.
            </p>

            <Link
              to="/register"
              className="
                inline-block
                mt-5
                text-blue-600
                font-bold
                hover:text-blue-700
                transition
              "
            >
              Créer un compte candidat
            </Link>

          </div>

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-gray-200
              p-7
              shadow-sm
            "
          >

            <h2 className="text-xl md:text-2xl font-bold text-gray-900">
              Vous êtes recruteur ?
            </h2>

            <p className="mt-3 text-gray-600 leading-relaxed">
              Publiez vos offres d'emploi, présentez votre
              entreprise et consultez les candidatures reçues
              depuis votre espace recruteur.
            </p>

            <Link
              to="/register"
              className="
                inline-block
                mt-5
                text-blue-600
                font-bold
                hover:text-blue-700
                transition
              "
            >
              Créer un compte recruteur
            </Link>

          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* DERNIÈRES OFFRES */}
      {/* ================================================== */}

      <section
        id="offres"
        className="
          w-full
          max-w-[1500px]
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          pt-14
          md:pt-16
          pb-20
        "
      >

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-5
            mb-9
          "
        >

          <div>

            <div
              className="
                text-xs
                font-bold
                uppercase
                tracking-widest
                text-blue-600
                mb-2
              "
            >
              Opportunités professionnelles
            </div>

            <h2
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-extrabold
                text-gray-900
              "
            >
              Dernières offres
            </h2>

            <p className="text-gray-500 mt-3 text-sm sm:text-base">
              Découvrez les offres d'emploi publiées récemment.
            </p>

          </div>

          {jobs.length > 0 && (
            <div
              className="
                inline-flex
                items-center
                bg-white
                border
                border-gray-200
                rounded-xl
                px-5
                py-3
                shadow-sm
                self-start
                sm:self-auto
              "
            >

              <span className="text-xl font-extrabold text-blue-600">
                {jobs.length}
              </span>

              <span className="text-gray-500 text-sm font-medium ml-2">
                offre{jobs.length > 1 ? "s" : ""} disponible
                {jobs.length > 1 ? "s" : ""}
              </span>

            </div>
          )}

        </div>

        {/* CHARGEMENT */}

        {loading && (
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              shadow-sm
              py-20
              text-center
            "
          >

            <div
              className="
                w-12
                h-12
                border-4
                border-blue-100
                border-t-blue-600
                rounded-full
                animate-spin
                mx-auto
                mb-5
              "
            ></div>

            <p className="text-gray-500 font-semibold">
              Chargement des offres...
            </p>

            <p className="text-gray-400 text-sm mt-1">
              Veuillez patienter quelques secondes.
            </p>

          </div>
        )}

        {/* AUCUNE OFFRE */}

        {!loading && jobs.length === 0 && (
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-gray-200
              shadow-sm
              py-20
              px-6
              text-center
            "
          >

            <h3 className="text-xl md:text-2xl font-bold text-gray-800">
              Aucune offre disponible
            </h3>

            <p className="text-gray-500 mt-2">
              Revenez bientôt pour découvrir de nouvelles offres.
            </p>

          </div>
        )}

        {/* GRILLE DES OFFRES */}

        {!loading && jobs.length > 0 && (
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-6
              lg:gap-7
            "
          >

            {jobs.map((job) => (
              <article
                key={job._id}
                className="
                  group
                  relative
                  bg-white
                  rounded-3xl
                  border
                  border-gray-200
                  shadow-sm
                  hover:shadow-xl
                  hover:-translate-y-1
                  transition-all
                  duration-300
                  overflow-hidden
                  flex
                  flex-col
                "
              >

                {/* BARRE SUPÉRIEURE */}

                <div className="h-1.5 w-full bg-blue-600"></div>

                {/* HAUT DE LA CARTE */}

                <div className="p-6 md:p-7">

                  <div
                    className="
                      flex
                      items-start
                      justify-between
                      gap-4
                    "
                  >

                    <div className="flex items-start gap-4 min-w-0">

                      {/* ICÔNE DU MÉTIER */}

                      <div
                        className="
                          flex
                          items-center
                          justify-center
                          w-14
                          h-14
                          flex-shrink-0
                          rounded-2xl
                          bg-blue-50
                          text-blue-600
                          border
                          border-blue-100
                          group-hover:bg-blue-600
                          group-hover:text-white
                          group-hover:border-blue-600
                          transition-all
                          duration-300
                        "
                      >
                        {getMetierIcon(job.titre)}
                      </div>

                      <div className="min-w-0">

                        <p
                          className="
                            text-xs
                            font-bold
                            text-blue-600
                            uppercase
                            tracking-wider
                            mb-1.5
                          "
                        >
                          Offre d'emploi
                        </p>

                        <h3
                          className="
                            text-xl
                            md:text-2xl
                            font-extrabold
                            text-gray-800
                            group-hover:text-blue-600
                            transition
                            leading-tight
                            line-clamp-2
                          "
                        >
                          {job.titre}
                        </h3>

                      </div>

                    </div>

                    <span
                      className="
                        hidden
                        sm:inline-flex
                        bg-green-50
                        text-green-600
                        border
                        border-green-100
                        px-3
                        py-1.5
                        rounded-full
                        text-xs
                        font-bold
                        whitespace-nowrap
                      "
                    >
                      Disponible
                    </span>

                  </div>

                  {/* DESCRIPTION */}

                  <p
                    className="
                      text-gray-600
                      mt-5
                      leading-relaxed
                      line-clamp-3
                      text-sm
                      md:text-base
                    "
                  >
                    {job.description}
                  </p>

                </div>

                {/* CONTENU */}

                <div
                  className="
                    px-6
                    pb-6
                    md:px-7
                    md:pb-7
                    flex
                    flex-col
                    flex-1
                  "
                >

                  {/* LOCALISATION */}

                  <div
                    className="
                      bg-gray-50
                      border
                      border-gray-100
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >

                    <p
                      className="
                        text-[10px]
                        text-gray-400
                        font-bold
                        uppercase
                        tracking-wider
                      "
                    >
                      Localisation
                    </p>

                    <p
                      className="
                        text-sm
                        font-semibold
                        text-gray-700
                        mt-1
                      "
                    >
                      {job.localisation || "Non précisée"}
                    </p>

                  </div>

                  {/* COMPÉTENCES */}

                  {job.competences &&
                    job.competences.length > 0 && (
                      <div className="mt-5">

                        <p
                          className="
                            text-sm
                            font-bold
                            text-gray-700
                            mb-3
                          "
                        >
                          Compétences recherchées
                        </p>

                        <div className="flex flex-wrap gap-2">

                          {Array.isArray(job.competences) ? (
                            job.competences
                              .slice(0, 4)
                              .map((competence, index) => (
                                <span
                                  key={index}
                                  className="
                                    bg-blue-50
                                    text-blue-700
                                    border
                                    border-blue-100
                                    text-xs
                                    font-semibold
                                    px-3
                                    py-1.5
                                    rounded-full
                                  "
                                >
                                  {String(competence).trim()}
                                </span>
                              ))
                          ) : (
                            <span
                              className="
                                bg-blue-50
                                text-blue-700
                                border
                                border-blue-100
                                text-xs
                                font-semibold
                                px-3
                                py-1.5
                                rounded-full
                              "
                            >
                              {job.competences}
                            </span>
                          )}

                        </div>

                      </div>
                    )}

                  {/* DATE */}

                  <div className="mt-5 text-xs text-gray-400">

                    Publiée le{" "}

                    {job.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleDateString("fr-FR")
                      : "Date inconnue"}

                    {" à "}

                    {job.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--:--"}

                  </div>

                  {/* BOUTON */}

                  <div
                    className="
                      mt-6
                      pt-5
                      border-t
                      border-gray-100
                      mt-auto
                    "
                  >

                    <Link
                      to={`/jobs/${job._id}`}
                      className="
                        flex
                        items-center
                        justify-center
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        py-3.5
                        rounded-2xl
                        font-bold
                        transition
                        shadow-sm
                        hover:shadow-lg
                      "
                    >
                      Voir l'offre
                    </Link>

                  </div>

                </div>

              </article>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Home;

