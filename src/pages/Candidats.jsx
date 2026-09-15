import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Candidats = () => {
  const { id } = useParams();

  const [candidats, setCandidats] = useState([]);

  const token = localStorage.getItem("token");

  // ===============================
  // CHARGER LES CANDIDATURES
  // ===============================

  const fetchCandidats = async () => {
    try {
      const res = await axios.get(
        `https://backend-emmt.onrender.com/api/applications/offre/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("CANDIDATURES :", res.data);

      setCandidats(res.data);
    } catch (error) {
      console.log(error);

      toast.error(
        "Impossible de charger les candidats ❌"
      );
    }
  };

  useEffect(() => {
    fetchCandidats();
  }, [id]);

  // ===============================
  // CHANGER LE STATUT
  // ===============================

  const changerStatut = async (
    candidatureId,
    statut
  ) => {
    try {
      await axios.put(
        `https://backend-emmt.onrender.com/api/applications/${candidatureId}/statut`,
        {
          statut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        `Candidature ${statut} ✅`
      );

      fetchCandidats();
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      toast.error(
        "Erreur changement statut ❌"
      );
    }
  };

  // ===============================
  // STYLE DU STATUT
  // ===============================

  const getStatusStyle = (statut) => {
    if (statut === "Acceptée") {
      return {
        container:
          "bg-green-50 border-green-200 text-green-700",
        icon: "✓",
        text: "Candidature acceptée",
      };
    }

    if (statut === "Refusée") {
      return {
        container:
          "bg-red-50 border-red-200 text-red-700",
        icon: "✕",
        text: "Candidature refusée",
      };
    }

    return {
      container:
        "bg-yellow-50 border-yellow-200 text-yellow-700",
      icon: "⏳",
      text: "En attente de réponse",
    };
  };

  return (
    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-blue-50
        via-gray-50
        to-white
        py-10
        px-4
        md:px-6
      "
    >
      <div className="max-w-5xl mx-auto">

        {/* ================================= */}
        {/* EN-TÊTE */}
        {/* ================================= */}

        <div
          className="
            bg-white
            rounded-3xl
            border
            border-gray-100
            shadow-sm
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
              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    bg-blue-100
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >
                  👥
                </div>

                <div>
                  <h1
                    className="
                      text-2xl
                      md:text-3xl
                      font-bold
                      text-gray-800
                    "
                  >
                    Candidats
                  </h1>

                  <p
                    className="
                      text-gray-500
                      mt-1
                    "
                  >
                    Consultez et gérez les candidatures
                    reçues pour cette offre.
                  </p>
                </div>

              </div>
            </div>

            {/* COMPTEUR */}

            <div
              className="
                bg-blue-50
                border
                border-blue-100
                rounded-2xl
                px-6
                py-4
                text-center
                min-w-[130px]
              "
            >
              <div
                className="
                  text-3xl
                  font-bold
                  text-blue-600
                "
              >
                {candidats.length}
              </div>

              <div
                className="
                  text-sm
                  text-gray-500
                "
              >
                candidat
                {candidats.length > 1
                  ? "s"
                  : ""}
              </div>
            </div>
          </div>
        </div>

        {/* ================================= */}
        {/* AUCUN CANDIDAT */}
        {/* ================================= */}

        {candidats.length === 0 ? (
          <div
            className="
              bg-white
              rounded-3xl
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
                w-24
                h-24
                bg-blue-50
                rounded-full
                flex
                items-center
                justify-center
                text-4xl
                mx-auto
                mb-6
              "
            >
              📋
            </div>

            <h2
              className="
                text-2xl
                font-bold
                text-gray-800
              "
            >
              Aucun candidat
            </h2>

            <p
              className="
                text-gray-500
                mt-3
              "
            >
              Aucun candidat n'a encore postulé
              à cette offre.
            </p>
          </div>
        ) : (
          <div className="space-y-6">

            {candidats.map((candidat) => {
              const status = getStatusStyle(
                candidat.statut
              );

              return (
                <div
                  key={candidat._id}
                  className="
                    bg-white
                    rounded-3xl
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-lg
                    transition
                    duration-300
                    overflow-hidden
                  "
                >
                  <div className="p-6 md:p-8">

                    {/* ================================= */}
                    {/* INFORMATIONS CANDIDAT */}
                    {/* ================================= */}

                    <div
                      className="
                        flex
                        flex-col
                        md:flex-row
                        md:items-start
                        md:justify-between
                        gap-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >

                        {/* AVATAR */}

                        <div
                          className="
                            w-16
                            h-16
                            bg-blue-100
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            text-2xl
                            flex-shrink-0
                          "
                        >
                          👤
                        </div>

                        <div>
                          <h2
                            className="
                              text-xl
                              md:text-2xl
                              font-bold
                              text-gray-800
                            "
                          >
                            {candidat.candidat?.prenom ||
                              ""}{" "}
                            {candidat.candidat?.nom ||
                              ""}
                          </h2>

                          <p
                            className="
                              text-gray-500
                              text-sm
                              mt-1
                            "
                          >
                            📧{" "}
                            {candidat.candidat?.email ||
                              "Email non disponible"}
                          </p>
                        </div>

                      </div>

                      {/* STATUT */}

                      <div
                        className={`
                          border
                          rounded-full
                          px-4
                          py-2
                          flex
                          items-center
                          gap-2
                          text-sm
                          font-semibold
                          w-fit
                          ${status.container}
                        `}
                      >
                        <span>
                          {status.icon}
                        </span>

                        <span>
                          {status.text}
                        </span>
                      </div>
                    </div>

                    {/* ================================= */}
                    {/* MESSAGE */}
                    {/* ================================= */}

                    {candidat.message && (
                      <div
                        className="
                          mt-7
                          bg-gray-50
                          border
                          border-gray-100
                          rounded-2xl
                          p-5
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                            mb-3
                          "
                        >
                          <span
                            className="
                              w-9
                              h-9
                              bg-white
                              rounded-xl
                              flex
                              items-center
                              justify-center
                              shadow-sm
                            "
                          >
                            💬
                          </span>

                          <h3
                            className="
                              font-semibold
                              text-gray-800
                            "
                          >
                            Message du candidat
                          </h3>
                        </div>

                        <p
                          className="
                            text-gray-600
                            leading-relaxed
                            text-sm
                          "
                        >
                          {candidat.message}
                        </p>
                      </div>
                    )}

                    {/* ================================= */}
                    {/* ACTIONS */}
                    {/* ================================= */}

                    <div
                      className="
                        mt-7
                        flex
                        flex-col
                        md:flex-row
                        gap-3
                      "
                    >

                      {/* ACCEPTER */}

                      <button
                        onClick={() =>
                          changerStatut(
                            candidat._id,
                            "Acceptée"
                          )
                        }
                        disabled={
                          candidat.statut ===
                          "Acceptée"
                        }
                        className="
                          flex-1
                          bg-green-600
                          hover:bg-green-700
                          disabled:bg-green-300
                          disabled:cursor-not-allowed
                          text-white
                          py-3
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >
                        ✅ Accepter
                      </button>

                      {/* REFUSER */}

                      <button
                        onClick={() =>
                          changerStatut(
                            candidat._id,
                            "Refusée"
                          )
                        }
                        disabled={
                          candidat.statut ===
                          "Refusée"
                        }
                        className="
                          flex-1
                          bg-red-600
                          hover:bg-red-700
                          disabled:bg-red-300
                          disabled:cursor-not-allowed
                          text-white
                          py-3
                          rounded-xl
                          font-semibold
                          transition
                        "
                      >
                        ❌ Refuser
                      </button>

                    </div>

                    {/* ================================= */}
                    {/* PROFIL */}
                    {/* ================================= */}

                    <Link
                      to={`/profil/${candidat.candidat?._id}`}
                      className="
                        block
                        mt-3
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
                      👤 Voir le profil du candidat
                    </Link>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>
    </div>
  );
};

export default Candidats;