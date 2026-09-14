import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditJob = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    titre: "",
    description: "",
    competences: "",
    localisation: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  // ===============================
  // CHARGER L'OFFRE
  // ===============================

  useEffect(() => {

    const fetchJob = async () => {

      try {

        const res = await axios.get(
          `http://localhost:3000/api/jobs/${id}`
        );

        setJob({
          titre: res.data.titre || "",
          description: res.data.description || "",
          competences: Array.isArray(res.data.competences)
            ? res.data.competences.join(", ")
            : res.data.competences || "",
          localisation: res.data.localisation || ""
        });

      } catch (error) {

        console.log(
          error.response?.data || error.message
        );

        toast.error("Impossible de charger l'offre ❌");

      } finally {

        setLoading(false);

      }

    };

    fetchJob();

  }, [id]);


  // ===============================
  // MODIFIER L'OFFRE
  // ===============================

  const updateJob = async (e) => {

    e.preventDefault();

    if (!job.titre.trim()) {
      toast.error("Veuillez saisir le titre du poste.");
      return;
    }

    if (!job.description.trim()) {
      toast.error("Veuillez saisir une description.");
      return;
    }

    if (!job.localisation.trim()) {
      toast.error("Veuillez saisir une localisation.");
      return;
    }

    try {

      setSaving(true);

      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:3000/api/jobs/${id}`,
        {
          ...job,
          competences: job.competences
            .split(",")
            .map((competence) => competence.trim())
            .filter((competence) => competence !== "")
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Offre modifiée avec succès ✅");

      setTimeout(() => {
        navigate("/mes-offres");
      }, 800);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Impossible de modifier l'offre ❌"
      );

    } finally {

      setSaving(false);

    }

  };


  // ===============================
  // CHARGEMENT
  // ===============================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-gray-100
        flex
        items-center
        justify-center
        px-4
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow-sm
          border
          border-gray-100
          px-8
          py-6
          text-center
        ">

          <div className="
            text-4xl
            mb-3
          ">
            💼
          </div>

          <p className="
            text-gray-500
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
      bg-gray-100
      px-4
      py-10
      md:py-14
    ">


      {/* =============================== */}
      {/* CONTENEUR */}
      {/* =============================== */}

      <div className="
        max-w-3xl
        mx-auto
      ">


        {/* =============================== */}
        {/* EN-TÊTE */}
        {/* =============================== */}

        <div className="
          bg-blue-600
          rounded-t-3xl
          px-6
          py-8
          md:px-10
          md:py-10
          text-white
          relative
          overflow-hidden
        ">

          {/* Décoration */}

          <div className="
            absolute
            -right-10
            -top-10
            w-32
            h-32
            bg-blue-500
            rounded-full
            opacity-40
          " />

          <div className="
            absolute
            -right-16
            -bottom-16
            w-40
            h-40
            bg-blue-700
            rounded-full
            opacity-40
          " />


          <div className="
            relative
            flex
            items-center
            gap-4
          ">

            <div className="
              w-14
              h-14
              bg-white
              rounded-2xl
              flex
              items-center
              justify-center
              text-2xl
              shadow-sm
            ">
              ✏️
            </div>


            <div>

              <p className="
                text-blue-100
                text-sm
                font-medium
                mb-1
              ">
                Gestion de votre offre
              </p>

              <h1 className="
                text-2xl
                md:text-3xl
                font-bold
              ">
                Modifier une offre
              </h1>

              <p className="
                text-blue-100
                mt-1
                text-sm
                md:text-base
              ">
                Mettez à jour les informations de votre offre d'emploi.
              </p>

            </div>

          </div>

        </div>


        {/* =============================== */}
        {/* FORMULAIRE */}
        {/* =============================== */}

        <form
          onSubmit={updateJob}
          className="
            bg-white
            rounded-b-3xl
            shadow-lg
            border
            border-gray-100
            px-6
            py-8
            md:px-10
            md:py-10
          "
        >


          {/* =============================== */}
          {/* TITRE */}
          {/* =============================== */}

          <div className="mb-6">

            <label className="
              block
              text-sm
              font-semibold
              text-gray-800
              mb-2
            ">
              Titre du poste
            </label>


            <div className="relative">

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-lg
              ">
                💼
              </span>


              <input
                type="text"
                value={job.titre}
                onChange={(e) =>
                  setJob({
                    ...job,
                    titre: e.target.value
                  })
                }
                placeholder="Ex : Développeur React"
                className="
                  w-full
                  border
                  border-gray-200
                  bg-gray-50
                  rounded-xl
                  pl-12
                  pr-4
                  py-3.5
                  text-gray-800
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />

            </div>

          </div>


          {/* =============================== */}
          {/* DESCRIPTION */}
          {/* =============================== */}

          <div className="mb-6">

            <label className="
              block
              text-sm
              font-semibold
              text-gray-800
              mb-2
            ">
              Description de l'offre
            </label>


            <textarea
              value={job.description}
              onChange={(e) =>
                setJob({
                  ...job,
                  description: e.target.value
                })
              }
              placeholder="Décrivez le poste, les missions et les responsabilités..."
              rows="7"
              className="
                w-full
                border
                border-gray-200
                bg-gray-50
                rounded-xl
                px-4
                py-3.5
                text-gray-800
                outline-none
                resize-none
                focus:bg-white
                focus:border-blue-500
                focus:ring-4
                focus:ring-blue-100
                transition
              "
            />

          </div>


          {/* =============================== */}
          {/* COMPÉTENCES */}
          {/* =============================== */}

          <div className="mb-6">

            <label className="
              block
              text-sm
              font-semibold
              text-gray-800
              mb-2
            ">
              Compétences recherchées
            </label>


            <div className="relative">

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-lg
              ">
                🛠️
              </span>


              <input
                type="text"
                value={job.competences}
                onChange={(e) =>
                  setJob({
                    ...job,
                    competences: e.target.value
                  })
                }
                placeholder="Ex : React, Node.js, MongoDB"
                className="
                  w-full
                  border
                  border-gray-200
                  bg-gray-50
                  rounded-xl
                  pl-12
                  pr-4
                  py-3.5
                  text-gray-800
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />

            </div>


            <p className="
              text-xs
              text-gray-400
              mt-2
            ">
              💡 Séparez les différentes compétences par des virgules.
            </p>

          </div>


          {/* =============================== */}
          {/* LOCALISATION */}
          {/* =============================== */}

          <div className="mb-8">

            <label className="
              block
              text-sm
              font-semibold
              text-gray-800
              mb-2
            ">
              Localisation
            </label>


            <div className="relative">

              <span className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-lg
              ">
                📍
              </span>


              <input
                type="text"
                value={job.localisation}
                onChange={(e) =>
                  setJob({
                    ...job,
                    localisation: e.target.value
                  })
                }
                placeholder="Ex : Dakar"
                className="
                  w-full
                  border
                  border-gray-200
                  bg-gray-50
                  rounded-xl
                  pl-12
                  pr-4
                  py-3.5
                  text-gray-800
                  outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />

            </div>

          </div>


          {/* =============================== */}
          {/* ACTIONS */}
          {/* =============================== */}

          <div className="
            flex
            flex-col-reverse
            sm:flex-row
            gap-3
          ">


            {/* ANNULER */}

            <button
              type="button"
              onClick={() => navigate("/mes-offres")}
              className="
                flex-1
                border
                border-gray-200
                bg-gray-50
                hover:bg-gray-100
                text-gray-700
                py-3.5
                rounded-xl
                font-semibold
                transition
              "
            >
              ← Annuler
            </button>


            {/* ENREGISTRER */}

            <button
              type="submit"
              disabled={saving}
              className="
                flex-1
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-400
                text-white
                py-3.5
                rounded-xl
                font-semibold
                shadow-md
                hover:shadow-lg
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >

              {saving ? (
                <>
                  <span className="animate-spin">
                    ⏳
                  </span>

                  Enregistrement...
                </>
              ) : (
                <>
                  💾 Enregistrer les modifications
                </>
              )}

            </button>

          </div>


          {/* INFO */}

          <div className="
            mt-6
            bg-blue-50
            border
            border-blue-100
            rounded-xl
            p-4
            text-sm
            text-blue-700
          ">

            <div className="
              flex
              items-start
              gap-3
            ">

              <span className="text-lg">
                💡
              </span>

              <p>
                Vérifiez les informations avant d'enregistrer les
                modifications de votre offre.
              </p>

            </div>

          </div>

        </form>

      </div>

    </div>

  );

};

export default EditJob;