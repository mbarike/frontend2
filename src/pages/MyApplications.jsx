import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MyApplications = () => {

  const [applications, setApplications] = useState([]);


  useEffect(() => {

    const token = localStorage.getItem("token");

    axios
      .get(
        "https://backend-emmt.onrender.com/api/applications/mes-demandes",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      .then((res) => {

        setApplications(res.data);

      })

      .catch((error) => {

        console.log(error);

        toast.error(
          "Impossible de charger vos candidatures ❌"
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

        icon: "🟢",

        text: "Candidature acceptée"
      };

    }


    if (statut === "Refusée") {

      return {
        container:
          "bg-red-50 border-red-200 text-red-700",

        icon: "🔴",

        text: "Candidature refusée"
      };

    }


    return {
      container:
        "bg-yellow-50 border-yellow-200 text-yellow-700",

      icon: "🟡",

      text: "En attente de réponse"
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
        year: "numeric"
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
        minute: "2-digit"
      }
    );

  };


  return (

    <div className="
      min-h-screen
      bg-gray-100
      py-10
      px-4
      md:px-6
    ">


      <div className="
        max-w-6xl
        mx-auto
      ">


        {/* ========================= */}
        {/* EN-TÊTE */}
        {/* ========================= */}

        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          p-6
          md:p-8
          mb-8
        ">


          <div className="
            flex
            flex-col
            md:flex-row
            md:items-center
            md:justify-between
            gap-5
          ">


            <div>

              <div className="
                flex
                items-center
                gap-3
                mb-2
              ">

                <div className="
                  w-12
                  h-12
                  bg-blue-50
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-2xl
                ">
                  📩
                </div>


                <h1 className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-gray-800
                ">
                  Mes candidatures
                </h1>

              </div>


              <p className="
                text-gray-500
                mt-2
              ">
                Suivez l'évolution de vos candidatures
                et consultez vos demandes d'emploi.
              </p>

            </div>


            {/* NOMBRE DE CANDIDATURES */}

            {applications.length > 0 && (

              <div className="
                bg-blue-50
                border
                border-blue-100
                rounded-xl
                px-5
                py-4
                text-center
                min-w-[130px]
              ">

                <div className="
                  text-2xl
                  font-bold
                  text-blue-600
                ">
                  {applications.length}
                </div>

                <div className="
                  text-sm
                  text-gray-500
                ">
                  candidature
                  {applications.length > 1 ? "s" : ""}
                </div>

              </div>

            )}

          </div>

        </div>


        {/* ========================= */}
        {/* AUCUNE CANDIDATURE */}
        {/* ========================= */}

        {applications.length === 0 && (

          <div className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-10
            md:p-16
            text-center
          ">

            <div className="
              w-20
              h-20
              bg-blue-50
              rounded-full
              flex
              items-center
              justify-center
              text-4xl
              mx-auto
              mb-5
            ">
              📩
            </div>


            <h2 className="
              text-2xl
              font-bold
              text-gray-800
            ">
              Aucune candidature
            </h2>


            <p className="
              text-gray-500
              mt-2
              max-w-md
              mx-auto
            ">
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
              🔎 Voir les offres
            </Link>

          </div>

        )}


        {/* ========================= */}
        {/* LISTE DES CANDIDATURES */}
        {/* ========================= */}

        {applications.length > 0 && (

          <div className="
            grid
            md:grid-cols-2
            gap-6
          ">

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
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-200
                    overflow-hidden
                  "
                >


                  {/* ========================= */}
                  {/* PARTIE PRINCIPALE */}
                  {/* ========================= */}

                  <div className="p-6">


                    {/* ICONE + TITRE */}

                    <div className="
                      flex
                      items-start
                      gap-4
                    ">


                      <div className="
                        w-14
                        h-14
                        bg-blue-50
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-2xl
                        flex-shrink-0
                      ">
                        💼
                      </div>


                      <div className="min-w-0">

                        <h2 className="
                          text-xl
                          font-bold
                          text-gray-800
                          line-clamp-2
                        ">
                          {app.offre?.titre || "Offre inconnue"}
                        </h2>


                        <p className="
                          text-sm
                          text-gray-500
                          mt-1
                        ">
                          📍{" "}
                          {app.offre?.localisation ||
                            "Localisation non précisée"}
                        </p>

                      </div>

                    </div>


                    {/* DESCRIPTION */}

                    {app.offre?.description && (

                      <p className="
                        text-gray-600
                        mt-5
                        leading-relaxed
                        line-clamp-2
                      ">
                        {app.offre.description}
                      </p>

                    )}


                    {/* DATE DE CANDIDATURE */}

                    {app.createdAt && (

                      <div className="
                        mt-5
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-gray-400
                      ">

                        <span>🕒</span>

                        <span>
                          Candidature envoyée le{" "}
                          {formatDate(app.createdAt)}
                          {" "}à{" "}
                          {formatTime(app.createdAt)}
                        </span>

                      </div>

                    )}


                    {/* MESSAGE */}

                    {app.message && (

                      <div className="
                        mt-5
                        bg-gray-50
                        border
                        border-gray-100
                        rounded-xl
                        p-4
                      ">

                        <div className="
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        ">
                          💬 Votre message
                        </div>


                        <p className="
                          text-gray-600
                          text-sm
                          leading-relaxed
                          line-clamp-3
                        ">
                          {app.message}
                        </p>

                      </div>

                    )}


                    {/* STATUT */}

                    <div className={`
                      mt-5
                      border
                      rounded-xl
                      px-4
                      py-3
                      flex
                      items-center
                      gap-3
                      ${status.container}
                    `}>

                      <span className="text-lg">
                        {status.icon}
                      </span>


                      <div>

                        <div className="
                          text-sm
                          font-semibold
                        ">
                          {status.text}
                        </div>


                        <div className="
                          text-xs
                          opacity-75
                          mt-0.5
                        ">
                          Statut : {app.statut}
                        </div>

                      </div>

                    </div>


                  </div>


                  {/* ========================= */}
                  {/* BOUTON */}
                  {/* ========================= */}

                  {app.offre?._id && (

                    <div className="
                      border-t
                      border-gray-100
                      px-6
                      py-4
                      bg-gray-50
                    ">

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
                        Voir l'offre →
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