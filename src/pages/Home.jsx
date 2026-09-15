import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [loading, setLoading] = useState(true);

  // ===============================
  // 📊 STATISTIQUES
  // ===============================

  const [stats, setStats] = useState({
    totalUsers: 0,
    candidats: 0,
    recruteurs: 0,
    offres: 0,
  });

  const [loadingStats, setLoadingStats] = useState(true);

 const URL = import.meta.env.VITE_API_URL;

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
  // 📊 RÉCUPÉRER LES STATISTIQUES
  // ===============================

  const fetchStats = async () => {
    try {
      setLoadingStats(true);

      const [usersRes, jobsRes] = await Promise.all([
        axios.get(`${URL}/api/users/stats/public`),
        axios.get(`${URL}/api/jobs`),
      ]);

      setStats({
        totalUsers: usersRes.data.totalUsers || 0,
        candidats: usersRes.data.candidats || 0,
        recruteurs: usersRes.data.recruteurs || 0,
        offres: Array.isArray(jobsRes.data)
          ? jobsRes.data.length
          : 0,
      });
    } catch (error) {
      console.log("Erreur statistiques :", error);
    } finally {
      setLoadingStats(false);
    }
  };

  // ===============================
  // CHARGEMENT INITIAL
  // ===============================

  useEffect(() => {
    fetchJobs();
    fetchStats();
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

      <section
        className="
          relative
          bg-gradient-to-br
          from-blue-800
          via-blue-700
          to-blue-500
          text-white
          overflow-hidden
        "
      >

        {/* FORMES DÉCORATIVES */}

        <div
          className="
            absolute
            -top-32
            -right-32
            w-96
            h-96
            bg-white/10
            rounded-full
          "
        ></div>

        <div
          className="
            absolute
            -bottom-40
            -left-32
            w-96
            h-96
            bg-white/10
            rounded-full
          "
        ></div>


        {/* CONTENU HERO */}

        <div
          className="
            relative
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            pt-12
            md:pt-16
            pb-28
            md:pb-32
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-2
              gap-10
              lg:gap-14
              items-center
            "
          >

            {/* ================================================== */}
            {/* TEXTE À GAUCHE */}
            {/* ================================================== */}

            <div className="text-center lg:text-left">

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  bg-white/10
                  border
                  border-white/20
                  backdrop-blur-sm
                  px-5
                  py-2.5
                  rounded-full
                  text-sm
                  font-semibold
                  mb-6
                "
              >
                💼 Votre carrière commence ici
              </div>


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

                <span className="ml-2">
                  🚀
                </span>
              </h1>


              <p
                className="
                  mt-5
                  text-base
                  sm:text-lg
                  text-blue-100
                  max-w-xl
                  mx-auto
                  lg:mx-0
                  leading-relaxed
                "
              >
                Découvrez les meilleures opportunités et
                connectez-vous directement avec les recruteurs.
              </p>


              {/* PETITS BADGES */}

              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  lg:justify-start
                  gap-3
                  mt-7
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-white/10
                    border
                    border-white/20
                    px-4
                    py-2
                    rounded-full
                    text-sm
                  "
                >
                  ✓ Offres disponibles
                </div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    bg-white/10
                    border
                    border-white/20
                    px-4
                    py-2
                    rounded-full
                    text-sm
                  "
                >
                  ✓ Recruteurs vérifiés
                </div>

              </div>

            </div>


            {/* ================================================== */}
            {/* IMAGE À DROITE */}
            {/* ================================================== */}

            <div
              className="
                relative
                w-full
                max-w-xl
                mx-auto
                lg:ml-auto
              "
            >

              {/* Halo derrière l'image */}

              <div
                className="
                  absolute
                  -inset-3
                  bg-white/10
                  rounded-[2rem]
                  rotate-2
                "
              ></div>


              {/* IMAGE */}

              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-white/20
                  shadow-2xl
                  bg-blue-900
                "
              >

                <img
                  src="/hero-job.jpg"
                  alt="Professionnelle dans son environnement de travail"
                  className="
                    w-full
                    h-[300px]
                    sm:h-[360px]
                    lg:h-[390px]
                    object-cover
                    object-right
                  "
                />

                {/* Dégradé léger */}

                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-blue-900/30
                    via-transparent
                    to-transparent
                  "
                ></div>

              </div>


              {/* CARTE FLOTTANTE */}

              <div
                className="
                  absolute
                  -bottom-5
                  left-4
                  sm:left-8
                  bg-white
                  text-gray-800
                  rounded-2xl
                  shadow-2xl
                  px-4
                  py-3
                  flex
                  items-center
                  gap-3
                "
              >

                <div
                  className="
                    w-10
                    h-10
                    bg-blue-100
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                  "
                >
                  💼
                </div>

                <div>

                  <p className="text-xs text-gray-400">
                    JobConnect
                  </p>

                  <p className="text-sm font-bold text-gray-800">
                    Construisez votre avenir
                  </p>

                </div>

              </div>

            </div>

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
          -mt-12
          md:-mt-14
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            md:rounded-3xl
            shadow-xl
            border
            border-gray-100
            p-3
            md:p-4
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row
              gap-3
            "
          >

            {/* RECHERCHE */}

            <div className="relative flex-1">

              <span
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-xl
                "
              >
                🔍
              </span>

              <input
                type="text"
                placeholder="Rechercher un poste, une compétence..."
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  md:rounded-2xl
                  pl-13
                  pr-5
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


            {/* LOCALISATION */}

            <div className="relative lg:w-72">

              <span
                className="
                  absolute
                  left-5
                  top-1/2
                  -translate-y-1/2
                  text-xl
                "
              >
                📍
              </span>

              <input
                type="text"
                placeholder="Localisation"
                className="
                  w-full
                  border
                  border-gray-200
                  rounded-xl
                  md:rounded-2xl
                  pl-13
                  pr-5
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


            {/* BOUTONS */}

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
                  md:rounded-2xl
                  font-bold
                  transition
                  shadow-sm
                  hover:shadow-md
                "
              >
                🔍 Rechercher
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
                    md:rounded-2xl
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
      {/* JOBCONNECT EN CHIFFRES */}
      {/* ================================================== */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-4
          sm:px-6
          pt-10
          md:pt-12
        "
      >

        <div
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            overflow-hidden
          "
        >

          {/* EN-TÊTE */}

          <div
            className="
              text-center
              px-4
              pt-5
              pb-4
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-blue-50
                text-blue-600
                px-3
                py-1.5
                rounded-full
                text-xs
                font-bold
                mb-2
              "
            >
              📊 JobConnect
            </div>

            <h2
              className="
                text-xl
                sm:text-2xl
                font-extrabold
                text-gray-800
              "
            >
              JobConnect en chiffres
            </h2>

            <p
              className="
                text-gray-400
                mt-1
                text-xs
                sm:text-sm
              "
            >
              Une plateforme qui connecte candidats et recruteurs.
            </p>

          </div>


          {/* STATISTIQUES */}

          <div
            className="
              grid
              grid-cols-2
              lg:grid-cols-4
              border-t
              border-gray-100
            "
          >

            {/* UTILISATEURS */}

            <div
              className="
                px-4
                py-5
                sm:py-6
                text-center
                border-b
                lg:border-b-0
                border-r
                border-gray-100
              "
            >

              <div
                className="
                  w-10
                  h-10
                  bg-blue-100
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  mx-auto
                  mb-2
                "
              >
                👥
              </div>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-blue-600
                "
              >
                {loadingStats ? "..." : stats.totalUsers}
              </p>

              <p
                className="
                  text-gray-500
                  text-xs
                  sm:text-sm
                  font-semibold
                  mt-0.5
                "
              >
                Utilisateurs
              </p>

            </div>


            {/* CANDIDATS */}

            <div
              className="
                px-4
                py-5
                sm:py-6
                text-center
                border-b
                lg:border-b-0
                lg:border-r
                border-gray-100
              "
            >

              <div
                className="
                  w-10
                  h-10
                  bg-green-100
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  mx-auto
                  mb-2
                "
              >
                👤
              </div>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-green-600
                "
              >
                {loadingStats ? "..." : stats.candidats}
              </p>

              <p
                className="
                  text-gray-500
                  text-xs
                  sm:text-sm
                  font-semibold
                  mt-0.5
                "
              >
                Candidats
              </p>

            </div>


            {/* RECRUTEURS */}

            <div
              className="
                px-4
                py-5
                sm:py-6
                text-center
                border-r
                border-gray-100
              "
            >

              <div
                className="
                  w-10
                  h-10
                  bg-purple-100
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  mx-auto
                  mb-2
                "
              >
                🏢
              </div>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-purple-600
                "
              >
                {loadingStats ? "..." : stats.recruteurs}
              </p>

              <p
                className="
                  text-gray-500
                  text-xs
                  sm:text-sm
                  font-semibold
                  mt-0.5
                "
              >
                Recruteurs
              </p>

            </div>


            {/* OFFRES */}

            <div
              className="
                px-4
                py-5
                sm:py-6
                text-center
              "
            >

              <div
                className="
                  w-10
                  h-10
                  bg-orange-100
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-lg
                  mx-auto
                  mb-2
                "
              >
                💼
              </div>

              <p
                className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  text-orange-600
                "
              >
                {loadingStats ? "..." : stats.offres}
              </p>

              <p
                className="
                  text-gray-500
                  text-xs
                  sm:text-sm
                  font-semibold
                  mt-0.5
                "
              >
                Offres d'emploi
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================== */}
      {/* DERNIÈRES OFFRES */}
      {/* ================================================== */}

      <section
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

        {/* EN-TÊTE */}

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

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  bg-blue-600
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  shadow-md
                  shadow-blue-200
                "
              >
                💼
              </div>

              <div>

                <div
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-widest
                    text-blue-600
                    mb-1
                  "
                >
                  Opportunités
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

              </div>

            </div>

            <p
              className="
                text-gray-500
                mt-3
                text-sm
                sm:text-base
                ml-0
                sm:ml-15
              "
            >
              Découvrez les opportunités disponibles actuellement.
            </p>

          </div>


          {/* COMPTEUR */}

          {jobs.length > 0 && (

            <div
              className="
                inline-flex
                items-center
                gap-2
                bg-white
                border
                border-blue-100
                rounded-2xl
                px-5
                py-3
                shadow-sm
                self-start
                sm:self-auto
              "
            >

              <span
                className="
                  w-2
                  h-2
                  bg-green-500
                  rounded-full
                  animate-pulse
                "
              ></span>

              <span className="text-xl font-extrabold text-blue-600">
                {jobs.length}
              </span>

              <span className="text-gray-500 text-sm font-medium">
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

            <div
              className="
                w-20
                h-20
                bg-blue-50
                rounded-3xl
                flex
                items-center
                justify-center
                text-4xl
                mx-auto
                mb-5
              "
            >
              🔎
            </div>

            <h3
              className="
                text-xl
                md:text-2xl
                font-bold
                text-gray-800
              "
            >
              Aucune offre disponible
            </h3>

            <p className="text-gray-500 mt-2">
              Revenez bientôt pour découvrir de nouvelles opportunités.
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
                  hover:shadow-2xl
                  hover:-translate-y-1.5
                  transition-all
                  duration-300
                  overflow-hidden
                  flex
                  flex-col
                "
              >

                {/* BARRE BLEUE */}

                <div
                  className="
                    h-1.5
                    w-full
                    bg-gradient-to-r
                    from-blue-600
                    via-blue-500
                    to-cyan-400
                  "
                ></div>


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

                      <div
                        className="
                          w-14
                          h-14
                          bg-blue-50
                          group-hover:bg-blue-100
                          rounded-2xl
                          flex
                          items-center
                          justify-center
                          text-2xl
                          flex-shrink-0
                          transition
                        "
                      >
                        💼
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
                        items-center
                        gap-1.5
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
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
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
                      flex
                      items-center
                      gap-3
                      bg-gray-50
                      border
                      border-gray-100
                      rounded-2xl
                      px-4
                      py-3
                    "
                  >

                    <div
                      className="
                        w-10
                        h-10
                        bg-white
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        shadow-sm
                        text-lg
                      "
                    >
                      📍
                    </div>

                    <div>

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
                          mt-0.5
                        "
                      >
                        {job.localisation || "Non précisée"}
                      </p>

                    </div>

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
                        🛠️ Compétences recherchées
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
                                  transition
                                  group-hover:bg-blue-100
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

                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-gray-400
                    "
                  >

                    <span className="text-base">
                      🕒
                    </span>

                    <span>

                      Publiée le{" "}

                      {job.createdAt
                        ? new Date(
                            job.createdAt
                          ).toLocaleDateString("fr-FR")
                        : "Date inconnue"
                      }

                      {" à "}

                      {job.createdAt
                        ? new Date(
                            job.createdAt
                          ).toLocaleTimeString("fr-FR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "--:--"
                      }

                    </span>

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
                        gap-2
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

                      <span
                        className="
                          group-hover:translate-x-1
                          transition
                          text-lg
                        "
                      >
                        →
                      </span>

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
