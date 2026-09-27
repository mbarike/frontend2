import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateJob = () => {
  const navigate = useNavigate();

  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [competences, setCompetences] = useState("");
  const [localisation, setLocalisation] = useState("");

  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titre.trim()) {
      toast.error("Veuillez saisir le titre du poste.");
      return;
    }

    if (!description.trim()) {
      toast.error("Veuillez saisir une description.");
      return;
    }

    if (!localisation.trim()) {
      toast.error("Veuillez saisir la localisation.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://backend-emmt.onrender.com/api/jobs",
        {
          titre,
          description,
          competences: competences
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item !== ""),
          localisation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Offre publiée avec succès !");

      setTitre("");
      setDescription("");
      setCompetences("");
      setLocalisation("");

      setTimeout(() => {
        navigate("/mes-offres");
      }, 800);
    } catch (error) {
      console.log(error.response?.data || error.message);

      toast.error(
        error.response?.data?.message ||
          "Impossible de publier l'offre."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Titre */}
        <div className="mb-7">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Créer une offre
          </h1>

          <p className="text-gray-500 mt-1">
            Renseignez les informations du poste à publier.
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white border border-gray-200 rounded-xl">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">

            {/* Titre du poste */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre du poste
              </label>

              <input
                type="text"
                value={titre}
                onChange={(e) => setTitre(e.target.value)}
                placeholder="Ex : Développeur React"
                className="
                  w-full
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-gray-800
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description de l'offre
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Décrivez le poste, les missions et les responsabilités."
                rows="7"
                className="
                  w-full
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-gray-800
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                  resize-none
                "
              />
            </div>

            {/* Compétences */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compétences recherchées
              </label>

              <input
                type="text"
                value={competences}
                onChange={(e) => setCompetences(e.target.value)}
                placeholder="Ex : React, Node.js, MongoDB"
                className="
                  w-full
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-gray-800
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              />

              <p className="text-xs text-gray-400 mt-2">
                Séparez les compétences par des virgules.
              </p>
            </div>

            {/* Localisation */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Localisation
              </label>

              <input
                type="text"
                value={localisation}
                onChange={(e) => setLocalisation(e.target.value)}
                placeholder="Ex : Dakar"
                className="
                  w-full
                  border border-gray-300
                  rounded-lg
                  px-4 py-3
                  text-gray-800
                  outline-none
                  focus:border-blue-500
                  focus:ring-1
                  focus:ring-blue-500
                "
              />
            </div>

            {/* Bouton */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-blue-300
                  text-white
                  px-6 py-3
                  rounded-lg
                  font-medium
                  transition
                "
              >
                {loading ? "Publication..." : "Publier l'offre"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default CreateJob;

