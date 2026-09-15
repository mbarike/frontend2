import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DemandesEmploi = () => {
  const URL = "https://backend-emmt.onrender.com";
  const token = localStorage.getItem("token");

  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 📋 CHARGER LES DEMANDES
  // ==========================================
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/job-requests`,
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
            "Impossible de charger les demandes d'emploi"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [token]);

  // ==========================================
  // ⏳ CHARGEMENT
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">

          <div className="
            w-12
            h-12
            border-4
            border-blue-100
            border-t-blue-600
            rounded-full
            animate-spin
            mx-auto
          " />

          <p className="mt-4 text-slate-500 font-medium">
            Chargement des demandes...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50">

      {/* =====================================
          HEADER
      ===================================== */}
      <div className="
        bg-gradient-to-br
        from-blue-600
        via-blue-700
        to-indigo-700
        text-white
      ">

        <div className="
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          py-10
          md:py-14
        ">

          <div className="flex items-center gap-4">

            <div className="
              w-14
              h-14
              bg-white/10
              border
              border-white/20
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
            ">
              👥
            </div>

            <div>

              <h1 className="
                text-3xl
                md:text-4xl
                font-extrabold
              ">
                Demandes d'emploi
              </h1>

              <p className="
                text-blue-100
                mt-2
              ">
                Découvrez les candidats à la recherche
                d'une opportunité professionnelle.
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================
          CONTENU
      ===================================== */}
      <div className="
        max-w-6xl
        mx-auto
        px-4
        sm:px-6
        py-8
        md:py-10
      ">

        {/* COMPTEUR */}
        <div className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-5
          mb-7
          shadow-sm
          flex
          items-center
          gap-4
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
            📄
          </div>

          <div>

            <p className="text-sm text-slate-500">
              Demandes disponibles
            </p>

            <p className="
              text-xl
              font-bold
              text-slate-800
            ">
              {demandes.length}{" "}
              {demandes.length > 1
                ? "demandes"
                : "demande"}
            </p>

          </div>

        </div>

        {/* =====================================
            AUCUNE DEMANDE
        ===================================== */}
        {demandes.length === 0 ? (

          <div className="
            bg-white
            border
            border-slate-200
            rounded-3xl
            shadow-sm
            p-12
            text-center
          ">

            <div className="
              w-20
              h-20
              bg-blue-50
              rounded-2xl
              flex
              items-center
              justify-center
              text-4xl
              mx-auto
              mb-6
            ">
              📄
            </div>

            <h2 className="
              text-2xl
              font-bold
              text-slate-800
            ">
              Aucune demande disponible
            </h2>

            <p className="
              text-slate-500
              mt-3
            ">
              Aucun candidat n'a actuellement publié
              de demande d'emploi.
            </p>

          </div>

        ) : (

          /* =====================================
             LISTE
          ===================================== */
          <div className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
          ">

            {demandes.map((demande) => {

              const candidat = demande.candidat;

              return (
                <div
                  key={demande._id}
                  className="
                    bg-white
                    border
                    border-slate-200
                    rounded-2xl
                    shadow-sm
                    hover:shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-200
                    overflow-hidden
                  "
                >

                  {/* BARRE BLEUE */}
                  <div className="h-2 bg-blue-600" />

                  <div className="p-6">

                    {/* =================================
                        CANDIDAT
                    ================================= */}
                    <div className="
                      flex
                      items-center
                      gap-4
                      mb-6
                    ">

                      {/* PHOTO */}
                      <div className="
                        w-16
                        h-16
                        rounded-2xl
                        overflow-hidden
                        bg-blue-50
                        flex
                        items-center
                        justify-center
                        text-2xl
                        flex-shrink-0
                      ">

                      {candidat?.photo ? (
  <img
    src={candidat.photo}
    alt="Photo"
    className="
      w-full
      h-full
      object-cover
    "
  />
) : (
  "👤"
)}

                      </div>

                      <div className="min-w-0">

                        <h2 className="
                          text-xl
                          font-bold
                          text-slate-800
                          truncate
                        ">
                          {candidat?.prenom || ""}{" "}
                          {candidat?.nom || ""}
                        </h2>

                        <p className="
                          text-sm
                          text-slate-500
                          mt-1
                        ">
                          📧{" "}
                          {candidat?.email ||
                            "Email non disponible"}
                        </p>

                      </div>

                    </div>

                    {/* =================================
                        POSTE RECHERCHÉ
                    ================================= */}
                    <div className="
                      bg-blue-50
                      border
                      border-blue-100
                      rounded-xl
                      p-4
                      mb-5
                    ">

                      <p className="
                        text-xs
                        font-semibold
                        text-blue-600
                        uppercase
                        tracking-wide
                        mb-1
                      ">
                        Poste recherché
                      </p>

                      <p className="
                        text-lg
                        font-bold
                        text-slate-800
                      ">
                        {demande.posteRecherche}
                      </p>

                    </div>

                    {/* =================================
                        INFORMATIONS
                    ================================= */}
                    <div className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      gap-3
                      mb-5
                    ">

                      <div className="
                        bg-slate-50
                        border
                        border-slate-100
                        rounded-xl
                        p-4
                      ">

                        <p className="
                          text-xs
                          text-slate-400
                          mb-1
                        ">
                          Localisation
                        </p>

                        <p className="
                          text-sm
                          font-semibold
                          text-slate-700
                        ">
                          📍{" "}
                          {demande.localisation ||
                            "Non précisée"}
                        </p>

                      </div>

                      <div className="
                        bg-slate-50
                        border
                        border-slate-100
                        rounded-xl
                        p-4
                      ">

                        <p className="
                          text-xs
                          text-slate-400
                          mb-1
                        ">
                          Contrat
                        </p>

                        <p className="
                          text-sm
                          font-semibold
                          text-slate-700
                        ">
                          💼{" "}
                          {demande.typeContrat ||
                            "Non précisé"}
                        </p>

                      </div>

                    </div>

                    {/* =================================
                        COMPÉTENCES
                    ================================= */}
                    {demande.competences &&
                      demande.competences.length > 0 && (

                        <div className="mb-5">

                          <p className="
                            text-sm
                            font-bold
                            text-slate-700
                            mb-3
                          ">
                            Compétences
                          </p>

                          <div className="
                            flex
                            flex-wrap
                            gap-2
                          ">

                            {demande.competences.map(
                              (competence, index) => (

                                <span
                                  key={index}
                                  className="
                                    bg-blue-50
                                    text-blue-700
                                    border
                                    border-blue-100
                                    px-3
                                    py-1.5
                                    rounded-lg
                                    text-sm
                                  "
                                >
                                  {competence}
                                </span>

                              )
                            )}

                          </div>

                        </div>
                      )}

                    {/* =================================
                        DESCRIPTION
                    ================================= */}
                    {demande.description && (

                      <div className="
                        bg-slate-50
                        border-l-4
                        border-blue-500
                        rounded-r-xl
                        p-4
                        mb-6
                      ">

                        <p className="
                          text-xs
                          font-bold
                          text-slate-500
                          uppercase
                          tracking-wide
                          mb-2
                        ">
                          Présentation
                        </p>

                        <p className="
                          text-sm
                          text-slate-600
                          leading-relaxed
                        ">
                          {demande.description.length > 180
                            ? demande.description.substring(
                                0,
                                180
                              ) + "..."
                            : demande.description}
                        </p>

                      </div>
                    )}

                    {/* =================================
                        DATE
                    ================================= */}
                    <p className="
                      text-xs
                      text-slate-400
                      mb-5
                    ">
                      📅 Publiée le{" "}
                      {new Date(
                        demande.createdAt
                      ).toLocaleDateString("fr-FR")}
                    </p>

                    {/* =================================
                        VOIR PROFIL
                    ================================= */}
                    <Link
                      to={`/profil/${candidat?._id}`}
                      className="
                        block
                        w-full
                        text-center
                        bg-blue-600
                        text-white
                        px-5
                        py-3
                        rounded-xl
                        font-bold
                        hover:bg-blue-700
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

export default DemandesEmploi;