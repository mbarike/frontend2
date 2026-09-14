import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

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
          `http://localhost:3000/api/jobs/${id}`
        );

        setJob(jobRes.data);

        // ===============================
        // VÉRIFIER LA CANDIDATURE
        // ===============================

        if (role === "candidat" && token) {
          try {
            const applicationsRes = await axios.get(
              "http://localhost:3000/api/applications/mes-demandes",
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
            text-4xl
            mb-4
          ">
            💼
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

                {/* ICÔNE */}

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
                  text-3xl
                  md:text-4xl
                  flex-shrink-0
                ">
                  💼
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
                ✨ Opportunité
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
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  mb-3
                ">
                  📍
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
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  mb-3
                ">
                  👤
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
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                  mb-3
                ">
                  🕒
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
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                ">
                  📄
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
                      rounded-xl
                      flex
                      items-center
                      justify-center
                      text-xl
                    ">
                      🛠️
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
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">
                    🏢
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
                      text-2xl
                      font-bold
                      flex-shrink-0
                    ">
                      🏢
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
                          🏭 {job.auteur.secteur}
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
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-xl
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
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-xl
                    ">
                      🏢
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