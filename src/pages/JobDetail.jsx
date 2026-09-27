import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

// ===============================
// ICÔNES MÉTIERS
// ===============================

const CodeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="m8 9-3 3 3 3" />
    <path d="m16 9 3 3-3 3" />
    <path d="m14 5-4 14" />
  </svg>
);

const CarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M5 17h14" />
    <path d="M6 17a2 2 0 1 0 4 0" />
    <path d="M14 17a2 2 0 1 0 4 0" />
    <path d="M5 17v-5l2-5h10l2 5v5" />
    <path d="M7 12h10" />
  </svg>
);

const HealthIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M12 21s-7-4.4-9.2-8.8C1 8.6 3.2 5 6.8 5c2 0 3.7 1.1 5.2 2.8C13.5 6.1 15.2 5 17.2 5 20.8 5 23 8.6 21.2 12.2 19 16.6 12 21 12 21Z" />
    <path d="M12 9v6" />
    <path d="M9 12h6" />
  </svg>
);

const EducationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="m3 9 9-5 9 5-9 5-9-5Z" />
    <path d="M7 11.5V16c2.5 2 7.5 2 10 0v-4.5" />
    <path d="M21 9v6" />
  </svg>
);

const MechanicIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="m14.5 6.5 3-3 3 3-3 3" />
    <path d="m12 9 3 3" />
    <path d="m4 20 8-8" />
    <path d="M5 19a2 2 0 1 0 3 0l7-7-3-3-7 7a2 2 0 0 0 0 3Z" />
  </svg>
);

const FinanceIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M7 9h10" />
    <path d="M7 13h3" />
    <path d="M15 13h2" />
  </svg>
);

const ConstructionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M4 20V8l8-5 8 5v12" />
    <path d="M8 20v-5h8v5" />
    <path d="M9 9h6" />
    <path d="M12 6v6" />
  </svg>
);

const ChefIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M6 10h12v8H6z" />
    <path d="M8 10V7a2 2 0 0 1 4 0v3" />
    <path d="M12 10V6a2 2 0 0 1 4 0v4" />
    <path d="M6 18h12" />
    <path d="M9 21h6" />
  </svg>
);

const ShoppingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M4 5h2l2 11h9l3-8H7" />
    <circle cx="10" cy="20" r="1.5" />
    <circle cx="17" cy="20" r="1.5" />
  </svg>
);

const DesignIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="m4 16 10-10 4 4L8 20H4v-4Z" />
    <path d="m13 7 4 4" />
    <path d="M4 20h16" />
  </svg>
);

const MarketingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M4 10v4" />
    <path d="M7 9v6" />
    <path d="M7 9c5 0 7-4 11-4v14c-4 0-6-4-11-4" />
    <path d="M18 9a3 3 0 0 1 0 6" />
  </svg>
);

const TruckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M3 6h11v11H3z" />
    <path d="M14 10h4l3 3v4h-7z" />
    <circle cx="7" cy="19" r="2" />
    <circle cx="18" cy="19" r="2" />
  </svg>
);

const ElectricalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />
  </svg>
);

const CameraIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="M4 7h4l2-2h4l2 2h4v12H4z" />
    <circle cx="12" cy="13" r="4" />
  </svg>
);

const HomeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <path d="m3 11 9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M9 20v-6h6v6" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-8 h-8 md:w-10 md:h-10"
  >
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <path d="M3 12h18" />
    <path d="M10 12v2h4v-2" />
  </svg>
);

// ===============================
// ICÔNES INFORMATIONS
// ===============================

const LocationIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-4 3-6 7-6s6.2 2 7 6" />
  </svg>
);

const ClockIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

const DescriptionIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path d="M6 3h9l3 3v15H6z" />
    <path d="M14 3v4h4" />
    <path d="M9 12h6" />
    <path d="M9 16h6" />
  </svg>
);

const SkillsIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path d="m14.5 6.5 3-3 3 3-3 3" />
    <path d="m12 9 3 3" />
    <path d="m4 20 8-8" />
    <path d="M5 19a2 2 0 1 0 3 0l7-7-3-3-7 7a2 2 0 0 0 0 3Z" />
  </svg>
);

const CompanyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="w-5 h-5"
  >
    <path d="M4 21V4h10v17" />
    <path d="M14 9h6v12" />
    <path d="M7 7h3" />
    <path d="M7 11h3" />
    <path d="M7 15h3" />
    <path d="M17 13h1" />
    <path d="M17 17h1" />
  </svg>
);

// ===============================
// CHOISIR L'ICÔNE SELON LE MÉTIER
// ===============================

const getMetierIcon = (titre) => {
  const texte = (titre || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (
    texte.includes("developpeur") ||
    texte.includes("developer") ||
    texte.includes("informatique") ||
    texte.includes("programming") ||
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
    texte.includes("pharmacien") ||
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

const JobDetail = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loadingApplication, setLoadingApplication] = useState(true);

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ===============================
        // RÉCUPÉRER L'OFFRE
        // ===============================

        const jobRes = await axios.get(
          `https://backend-emmt.onrender.com/api/jobs/${id}`
        );

        setJob(jobRes.data);

        // ===============================
        // VÉRIFIER LA CANDIDATURE
        // ===============================

        if (role === "candidat" && token) {
          try {
            const applicationsRes = await axios.get(
              "https://backend-emmt.onrender.com/api/applications/mes-demandes",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const applications = applicationsRes.data;

            const alreadyApplied = applications.some(
              (app) =>
                app.offre?._id === id ||
                app.offre === id
            );

            setHasApplied(alreadyApplied);
          } catch (error) {
            console.log(
              "Impossible de vérifier la candidature :",
              error
            );
          }
        }
      } catch (error) {
        console.log(
          "Impossible de charger l'offre :",
          error
        );
      } finally {
        setLoadingApplication(false);
      }
    };

    fetchData();
  }, [id, role, token]);

  // ===============================
  // CHARGEMENT
  // ===============================

  if (!job) {
    return (
      <div className="
        min-h-screen
        bg-gray-50
        flex
        items-center
        justify-center
        p-6
      ">
        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          px-10
          py-8
          text-center
        ">
          <div className="
            w-16
            h-16
            mx-auto
            mb-4
            rounded-2xl
            bg-blue-50
            text-blue-600
            flex
            items-center
            justify-center
          ">
            {getMetierIcon("")}
          </div>

          <p className="
            text-gray-600
            font-medium
          ">
            Chargement de l'offre...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="
      min-h-screen
      bg-gray-50
      py-8
      md:py-12
      px-4
    ">
      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* =============================== */}
        {/* RETOUR */}
        {/* =============================== */}

        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-gray-500
            hover:text-blue-600
            font-medium
            mb-6
            transition
          "
        >
          ← Retour aux offres
        </Link>

        {/* =============================== */}
        {/* CARTE PRINCIPALE */}
        {/* =============================== */}

        <div className="
          bg-white
          rounded-3xl
          border
          border-gray-200
          shadow-sm
          overflow-hidden
        ">

          {/* =============================== */}
          {/* EN-TÊTE */}
          {/* =============================== */}

          <div className="
            bg-gradient-to-r
            from-blue-600
            to-blue-500
            px-6
            md:px-10
            py-8
            md:py-10
            text-white
          ">
            <div className="
              flex
              flex-col
              md:flex-row
              md:items-center
              md:justify-between
              gap-6
            ">

              <div className="
                flex
                items-center
                gap-5
              ">

                {/* ICÔNE MÉTIER */}

                <div className="
                  w-16
                  h-16
                  md:w-20
                  md:h-20
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  flex-shrink-0
                ">
                  {getMetierIcon(job.titre)}
                </div>

                <div>
                  <p className="
                    text-blue-100
                    text-sm
                    font-medium
                    mb-1
                  ">
                    Offre d'emploi
                  </p>

                  <h1 className="
                    text-2xl
                    md:text-4xl
                    font-bold
                    leading-tight
                  ">
                    {job.titre}
                  </h1>
                </div>

              </div>

              {/* BADGE */}

              <div className="
                self-start
                md:self-center
                bg-white/15
                border
                border-white/20
                rounded-full
                px-4
                py-2
                text-sm
                font-medium
              ">
                Opportunité
              </div>

            </div>
          </div>

          {/* =============================== */}
          {/* CONTENU */}
          {/* =============================== */}

          <div className="
            p-6
            md:p-10
          ">

            {/* =============================== */}
            {/* INFORMATIONS RAPIDES */}
            {/* =============================== */}

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
              mb-10
            ">

              {/* LOCALISATION */}

              <div className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                p-5
              ">
                <div className="
                  w-10
                  h-10
                  bg-blue-100
                  text-blue-600
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  mb-3
                ">
                  <LocationIcon />
                </div>

                <p className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-gray-400
                  font-semibold
                ">
                  Localisation
                </p>

                <p className="
                  text-gray-800
                  font-semibold
                  mt-1
                ">
                  {job.localisation || "Non précisé"}
                </p>
              </div>

              {/* PUBLIÉ PAR */}

              <div className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                p-5
              ">
                <div className="
                  w-10
                  h-10
                  bg-blue-100
                  text-blue-600
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  mb-3
                ">
                  <UserIcon />
                </div>

                <p className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-gray-400
                  font-semibold
                ">
                  Publié par
                </p>

                <p className="
                  text-gray-800
                  font-semibold
                  mt-1
                ">
                  {job.auteur?.prenom || ""}
                  {" "}
                  {job.auteur?.nom || ""}
                </p>
              </div>

              {/* DATE + HEURE */}

              <div className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                p-5
              ">
                <div className="
                  w-10
                  h-10
                  bg-blue-100
                  text-blue-600
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  mb-3
                ">
                  <ClockIcon />
                </div>

                <p className="
                  text-xs
                  uppercase
                  tracking-wide
                  text-gray-400
                  font-semibold
                ">
                  Date de publication
                </p>

                <p className="
                  text-gray-800
                  font-semibold
                  mt-1
                ">
                  {job.createdAt
                    ? `${new Date(
                        job.createdAt
                      ).toLocaleDateString("fr-FR")} à ${new Date(
                        job.createdAt
                      ).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "Non précisée"}
                </p>
              </div>

            </div>

            {/* =============================== */}
            {/* DESCRIPTION */}
            {/* =============================== */}

            <section className="mb-10">

              <div className="
                flex
                items-center
                gap-3
                mb-4
              ">
                <div className="
                  w-10
                  h-10
                  bg-blue-100
                  text-blue-600
                  rounded-xl
                  flex
                  items-center
                  justify-center
                ">
                  <DescriptionIcon />
                </div>

                <h2 className="
                  text-xl
                  md:text-2xl
                  font-bold
                  text-gray-800
                ">
                  Description de l'offre
                </h2>
              </div>

              <div className="
                bg-gray-50
                border
                border-gray-100
                rounded-2xl
                p-6
              ">
                <p className="
                  text-gray-700
                  leading-8
                  whitespace-pre-line
                ">
                  {job.description}
                </p>
              </div>

            </section>

            {/* =============================== */}
            {/* COMPÉTENCES */}
            {/* =============================== */}

            {job.competences &&
              job.competences.length > 0 && (

                <section className="mb-10">

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-4
                  ">
                    <div className="
                      w-10
                      h-10
                      bg-purple-100
                      text-purple-600
                      rounded-xl
                      flex
                      items-center
                      justify-center
                    ">
                      <SkillsIcon />
                    </div>

                    <h2 className="
                      text-xl
                      md:text-2xl
                      font-bold
                      text-gray-800
                    ">
                      Compétences recherchées
                    </h2>
                  </div>

                  <div className="
                    bg-gray-50
                    border
                    border-gray-100
                    rounded-2xl
                    p-6
                  ">
                    <div className="
                      flex
                      flex-wrap
                      gap-3
                    ">

                      {Array.isArray(job.competences) ? (
                        job.competences.map(
                          (competence, index) => (
                            <span
                              key={index}
                              className="
                                bg-blue-100
                                text-blue-700
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                              "
                            >
                              {competence}
                            </span>
                          )
                        )
                      ) : (
                        <span className="
                          bg-blue-100
                          text-blue-700
                          px-4
                          py-2
                          rounded-full
                          text-sm
                          font-semibold
                        ">
                          {job.competences}
                        </span>
                      )}

                    </div>
                  </div>

                </section>
              )}

            {/* =============================== */}
            {/* PROFIL ENTREPRISE */}
            {/* =============================== */}

            {job.auteur?.entreprise && (

              <section className="mb-10">

                <div className="
                  flex
                  items-center
                  gap-3
                  mb-4
                ">
                  <div className="
                    w-10
                    h-10
                    bg-blue-100
                    text-blue-600
                    rounded-xl
                    flex
                    items-center
                    justify-center
                  ">
                    <CompanyIcon />
                  </div>

                  <div>
                    <h2 className="
                      text-xl
                      md:text-2xl
                      font-bold
                      text-gray-800
                    ">
                      Profil entreprise
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      Informations sur l'entreprise
                    </p>
                  </div>

                </div>

                <div className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  p-6
                  shadow-sm
                ">

                  <div className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    gap-5
                  ">

                    {/* ICÔNE ENTREPRISE */}

                    <div className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-blue-600
                      text-white
                      flex
                      items-center
                      justify-center
                      flex-shrink-0
                    ">
                      <CompanyIcon />
                    </div>

                    <div className="flex-1">

                      <h3 className="
                        text-xl
                        font-bold
                        text-gray-800
                      ">
                        {job.auteur.entreprise}
                      </h3>

                      {job.auteur?.secteur && (

                        <p className="
                          text-gray-500
                          mt-1
                        ">
                          {job.auteur.secteur}
                        </p>

                      )}

                    </div>

                  </div>

                </div>

              </section>

            )}

            {/* =============================== */}
            {/* ESPACE CANDIDATURE */}
            {/* =============================== */}

            {role === "candidat" && (

              <div className="
                border-t
                border-gray-100
                pt-8
              ">

                {loadingApplication ? (

                  <div className="
                    bg-gray-50
                    border
                    border-gray-100
                    rounded-2xl
                    p-6
                    text-center
                  ">

                    <div className="
                      w-8
                      h-8
                      border-4
                      border-blue-200
                      border-t-blue-600
                      rounded-full
                      animate-spin
                      mx-auto
                      mb-3
                    "></div>

                    <p className="text-gray-500">
                      Vérification de votre candidature...
                    </p>

                  </div>

                ) : hasApplied ? (

                  /* =============================== */
                  /* DÉJÀ POSTULÉ */
                  /* =============================== */

                  <div className="
                    bg-green-50
                    border
                    border-green-200
                    rounded-2xl
                    p-6
                  ">

                    <div className="
                      flex
                      items-center
                      gap-4
                    ">

                      <div className="
                        w-12
                        h-12
                        bg-green-100
                        text-green-600
                        rounded-full
                        flex
                        items-center
                        justify-center
                        font-bold
                        flex-shrink-0
                      ">
                        ✓
                      </div>

                      <div>

                        <h3 className="
                          font-bold
                          text-green-700
                          text-lg
                        ">
                          Candidature déjà envoyée
                        </h3>

                        <p className="
                          text-green-600
                          text-sm
                          mt-1
                        ">
                          Vous avez déjà postulé à cette offre.
                        </p>

                      </div>

                    </div>

                  </div>

                ) : (

                  /* =============================== */
                  /* POSTULER */
                  /* =============================== */

                  <div className="
                    bg-blue-50
                    border
                    border-blue-100
                    rounded-2xl
                    p-6
                    md:p-7
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-5
                  ">

                    <div>

                      <h3 className="
                        text-xl
                        font-bold
                        text-gray-800
                      ">
                        Cette offre vous intéresse ?
                      </h3>

                      <p className="
                        text-gray-500
                        mt-1
                      ">
                        Envoyez votre candidature dès maintenant.
                      </p>

                    </div>

                    <Link
                      to={`/apply/${job._id}`}
                      className="
                        inline-flex
                        items-center
                        justify-center
                        gap-2
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-7
                        py-3.5
                        rounded-xl
                        font-bold
                        shadow-sm
                        hover:shadow-md
                        transition
                        whitespace-nowrap
                      "
                    >
                      Postuler maintenant
                      <span>→</span>
                    </Link>

                  </div>

                )}

              </div>

            )}

            {/* =============================== */}
            {/* RECRUTEUR */}
            {/* =============================== */}

            {role === "recruteur" && (

              <div className="
                border-t
                border-gray-100
                pt-8
              ">

                <div className="
                  bg-blue-50
                  border
                  border-blue-100
                  rounded-2xl
                  p-6
                ">

                  <div className="
                    flex
                    items-center
                    gap-4
                  ">

                    <div className="
                      w-12
                      h-12
                      bg-blue-100
                      text-blue-600
                      rounded-full
                      flex
                      items-center
                      justify-center
                    ">
                      <CompanyIcon />
                    </div>

                    <div>

                      <h3 className="
                        font-bold
                        text-blue-800
                        text-lg
                      ">
                        Vous êtes recruteur
                      </h3>

                      <p className="
                        text-blue-600
                        text-sm
                        mt-1
                      ">
                        Les candidats peuvent postuler à cette offre.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default JobDetail;