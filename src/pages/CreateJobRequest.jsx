import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateJobRequest = () => {

  const navigate = useNavigate();

  const URL = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const [posteRecherche, setPosteRecherche] = useState("");
  const [competences, setCompetences] = useState("");
  const [localisation, setLocalisation] = useState("");
  const [typeContrat, setTypeContrat] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!posteRecherche.trim()) {
      toast.error("Veuillez indiquer le poste recherché");
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        `${URL}/api/job-requests`,
        {
          posteRecherche,
          competences: competences
            .split(",")
            .map((competence) => competence.trim())
            .filter((competence) => competence !== ""),
          localisation,
          typeContrat,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Votre demande d'emploi a été publiée !");

      navigate("/mes-demandes-emploi");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Erreur lors de la création de la demande"
      );

    } finally {

      setLoading(false);

    }
  };


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-3xl mx-auto">

        {/* TITRE */}

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Créer une demande d'emploi
          </h1>

          <p className="text-gray-500 mt-2">
            Présentez votre recherche d'emploi aux recruteurs
          </p>

        </div>


        {/* FORMULAIRE */}

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">

          <form onSubmit={handleSubmit} className="space-y-6">


            {/* POSTE */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Poste recherché *
              </label>

              <input
                type="text"
                value={posteRecherche}
                onChange={(e) => setPosteRecherche(e.target.value)}
                placeholder="Ex : Développeur Web"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* COMPÉTENCES */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Compétences
              </label>

              <input
                type="text"
                value={competences}
                onChange={(e) => setCompetences(e.target.value)}
                placeholder="Ex : React, JavaScript, Node.js"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <p className="text-xs text-gray-400 mt-1">
                Séparez les compétences par des virgules.
              </p>

            </div>


            {/* LOCALISATION */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Localisation souhaitée
              </label>

              <input
                type="text"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                placeholder="Ex : Dakar"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* TYPE CONTRAT */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Type de contrat recherché
              </label>

              <select
                value={typeContrat}
                onChange={(e) => setTypeContrat(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >

                <option value="">
                  Sélectionner
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


            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Présentation de votre demande
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Présentez votre expérience, votre recherche et ce que vous souhaitez trouver..."
                rows="6"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>


            {/* BOUTONS */}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Annuler
              </button>


              <button
                type="submit"
                disabled={loading}
                className="w-full sm:flex-1 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50"
              >

                {loading
                  ? "Publication..."
                  : "Publier ma demande"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateJobRequest;