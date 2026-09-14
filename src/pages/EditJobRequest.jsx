import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const EditJobRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const [posteRecherche, setPosteRecherche] = useState("");
  const [competences, setCompetences] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [description, setDescription] = useState("");
  const [statut, setStatut] = useState("Active");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // 📋 CHARGER LA DEMANDE
  // ==========================================
  useEffect(() => {
    const fetchDemande = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/job-requests/mes-demandes`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const demande = res.data.find(
          (item) => item._id === id
        );

        if (!demande) {
          toast.error("Demande d'emploi introuvable");
          navigate("/mes-demandes-emploi");
          return;
        }

        setPosteRecherche(demande.posteRecherche || "");

        setCompetences(
          demande.competences?.join(", ") || ""
        );

        setLocalisation(
          demande.localisation || ""
        );

        setTypeContrat(
          demande.typeContrat || ""
        );

        setDescription(
          demande.description || ""
        );

        setStatut(
          demande.statut || "Active"
        );
      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data?.message ||
            "Impossible de charger la demande"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDemande();
  }, [id, navigate, token]);

  // ==========================================
  // 💾 MODIFIER LA DEMANDE
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posteRecherche.trim()) {
      toast.error(
        "Veuillez indiquer le poste recherché"
      );
      return;
    }

    try {
      setSaving(true);

      await axios.put(
        `${URL}/api/job-requests/${id}`,
        {
          posteRecherche: posteRecherche.trim(),

          competences: competences
            .split(",")
            .map((competence) => competence.trim())
            .filter((competence) => competence !== ""),

          localisation: localisation.trim(),
          typeContrat,
          description: description.trim(),
          statut,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Demande modifiée avec succès !"
      );

      navigate("/mes-demandes-emploi");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la modification"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // ⏳ CHARGEMENT
  // ==========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
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
            "
          />

          <p className="mt-4 text-slate-500 font-medium">
            Chargement de votre demande...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 🖥️ PAGE
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
          max-w-4xl
          mx-auto
          px-4
          sm:px-6
          py-10
          md:py-12
        ">

          <button
            type="button"
            onClick={() =>
              navigate("/mes-demandes-emploi")
            }
            className="
              inline-flex
              items-center
              gap-2
              text-blue-100
              hover:text-white
              transition
              mb-5
            "
          >
            ← Retour à mes demandes
          </button>

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
              ✏️
            </div>

            <div>

              <h1 className="
                text-3xl
                md:text-4xl
                font-extrabold
                tracking-tight
              ">
                Modifier ma demande
              </h1>

              <p className="
                text-blue-100
                mt-2
              ">
                Mettez à jour les informations de votre
                recherche d'emploi.
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* =====================================
          FORMULAIRE
      ===================================== */}
      <div className="
        max-w-4xl
        mx-auto
        px-4
        sm:px-6
        py-8
        md:py-10
      ">

        <div className="
          bg-white
          border
          border-slate-200
          rounded-3xl
          shadow-sm
          overflow-hidden
        ">

          <form onSubmit={handleSubmit}>

            {/* =================================
                SECTION INFORMATIONS PRINCIPALES
            ================================= */}
            <div className="
              p-6
              md:p-8
              border-b
              border-slate-100
            ">

              <div className="mb-7">

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-800
                ">
                  Informations principales
                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Indiquez le poste et les compétences
                  que vous recherchez.
                </p>

              </div>

              {/* POSTE */}
              <div className="mb-6">

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Poste recherché
                  <span className="text-red-500 ml-1">
                    *
                  </span>
                </label>

                <input
                  type="text"
                  value={posteRecherche}
                  onChange={(e) =>
                    setPosteRecherche(e.target.value)
                  }
                  placeholder="Ex : Développeur Web"
                  className="
                    w-full
                    border
                    border-slate-200
                    bg-slate-50
                    rounded-xl
                    px-4
                    py-3.5
                    text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />

              </div>

              {/* COMPÉTENCES */}
              <div>

                <label className="
                  block
                  text-sm
                  font-semibold
                  text-slate-700
                  mb-2
                ">
                  Compétences
                </label>

                <input
                  type="text"
                  value={competences}
                  onChange={(e) =>
                    setCompetences(e.target.value)
                  }
                  placeholder="Ex : React, JavaScript, Node.js"
                  className="
                    w-full
                    border
                    border-slate-200
                    bg-slate-50
                    rounded-xl
                    px-4
                    py-3.5
                    text-slate-800
                    placeholder:text-slate-400
                    focus:outline-none
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />

                <p className="
                  text-xs
                  text-slate-400
                  mt-2
                ">
                  💡 Séparez chaque compétence par une
                  virgule.
                </p>

              </div>

            </div>

            {/* =================================
                SECTION CONDITIONS
            ================================= */}
            <div className="
              p-6
              md:p-8
              border-b
              border-slate-100
            ">

              <div className="mb-7">

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-800
                ">
                  Conditions recherchées
                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Précisez où et dans quelles conditions
                  vous souhaitez travailler.
                </p>

              </div>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              ">

                {/* LOCALISATION */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Localisation souhaitée
                  </label>

                  <input
                    type="text"
                    value={localisation}
                    onChange={(e) =>
                      setLocalisation(e.target.value)
                    }
                    placeholder="Ex : Dakar"
                    className="
                      w-full
                      border
                      border-slate-200
                      bg-slate-50
                      rounded-xl
                      px-4
                      py-3.5
                      focus:outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      transition
                    "
                  />

                </div>

                {/* CONTRAT */}
                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                    mb-2
                  ">
                    Type de contrat
                  </label>

                  <select
                    value={typeContrat}
                    onChange={(e) =>
                      setTypeContrat(e.target.value)
                    }
                    className="
                      w-full
                      border
                      border-slate-200
                      bg-slate-50
                      rounded-xl
                      px-4
                      py-3.5
                      focus:outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      transition
                    "
                  >

                    <option value="">
                      Sélectionner un contrat
                    </option>

                    <option value="CDI">
                      CDI
                    </option>

                    <option value="CDD">
                      CDD
                    </option>

                    <option value="Stage">
                      Stage
                    </option>

                    <option value="Freelance">
                      Freelance
                    </option>

                    <option value="Temps partiel">
                      Temps partiel
                    </option>

                  </select>

                </div>

              </div>

            </div>

            {/* =================================
                SECTION DESCRIPTION
            ================================= */}
            <div className="
              p-6
              md:p-8
              border-b
              border-slate-100
            ">

              <div className="mb-7">

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-800
                ">
                  Présentation
                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Présentez votre profil et expliquez
                  votre recherche.
                </p>

              </div>

              <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
              ">
                Votre présentation
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows="7"
                placeholder="Présentez votre expérience, votre parcours et le type d'emploi que vous recherchez..."
                className="
                  w-full
                  border
                  border-slate-200
                  bg-slate-50
                  rounded-xl
                  px-4
                  py-3.5
                  resize-none
                  text-slate-800
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:bg-white
                  focus:border-blue-500
                  focus:ring-4
                  focus:ring-blue-100
                  transition
                "
              />

              <p className="
                text-xs
                text-slate-400
                mt-2
              ">
                Décrivez votre expérience et ce que vous
                recherchez afin d'attirer les recruteurs.
              </p>

            </div>

            {/* =================================
                SECTION STATUT
            ================================= */}
            <div className="
              p-6
              md:p-8
              border-b
              border-slate-100
            ">

              <div className="mb-5">

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-800
                ">
                  Visibilité de la demande
                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">
                  Choisissez si votre demande doit être
                  visible par les recruteurs.
                </p>

              </div>

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              ">

                {/* ACTIVE */}
                <button
                  type="button"
                  onClick={() => setStatut("Active")}
                  className={`
                    text-left
                    p-4
                    rounded-xl
                    border-2
                    transition
                    ${
                      statut === "Active"
                        ? "border-emerald-400 bg-emerald-50"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }
                  `}
                >

                  <div className="flex items-center gap-3">

                    <div className="
                      w-10
                      h-10
                      rounded-lg
                      bg-emerald-100
                      flex
                      items-center
                      justify-center
                    ">
                      🟢
                    </div>

                    <div>

                      <p className="
                        font-bold
                        text-slate-800
                      ">
                        Demande active
                      </p>

                      <p className="
                        text-xs
                        text-slate-500
                        mt-1
                      ">
                        Visible par les recruteurs
                      </p>

                    </div>

                  </div>

                </button>

                {/* FERMÉE */}
                <button
                  type="button"
                  onClick={() => setStatut("Fermée")}
                  className={`
                    text-left
                    p-4
                    rounded-xl
                    border-2
                    transition
                    ${
                      statut === "Fermée"
                        ? "border-slate-400 bg-slate-100"
                        : "border-slate-200 bg-slate-50 hover:border-slate-300"
                    }
                  `}
                >

                  <div className="flex items-center gap-3">

                    <div className="
                      w-10
                      h-10
                      rounded-lg
                      bg-slate-200
                      flex
                      items-center
                      justify-center
                    ">
                      ⚪
                    </div>

                    <div>

                      <p className="
                        font-bold
                        text-slate-800
                      ">
                        Demande fermée
                      </p>

                      <p className="
                        text-xs
                        text-slate-500
                        mt-1
                      ">
                        Non visible par les recruteurs
                      </p>

                    </div>

                  </div>

                </button>

              </div>

            </div>

            {/* =================================
                BOUTONS
            ================================= */}
            <div className="
              p-6
              md:p-8
              bg-slate-50
              flex
              flex-col-reverse
              sm:flex-row
              gap-3
              sm:justify-end
            ">

              <button
                type="button"
                onClick={() =>
                  navigate("/mes-demandes-emploi")
                }
                className="
                  w-full
                  sm:w-auto
                  px-6
                  py-3.5
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  text-slate-700
                  font-semibold
                  hover:bg-slate-100
                  transition
                "
              >
                Annuler
              </button>

              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  sm:w-auto
                  px-7
                  py-3.5
                  rounded-xl
                  bg-blue-600
                  text-white
                  font-bold
                  hover:bg-blue-700
                  shadow-sm
                  hover:shadow-md
                  transition
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                {saving
                  ? "⏳ Enregistrement..."
                  : "💾 Enregistrer les modifications"}
              </button>

            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

export default EditJobRequest;