import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const MesDemandesEmploi = () => {
  const URL = "https://backend-emmt.onrender.com";
  const token = localStorage.getItem("token");

  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les demandes
  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const res = await axios.get(
          `${URL}/api/job-requests/mes-demandes`,
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
            "Impossible de charger vos demandes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, [token]);

  // Supprimer une demande
  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer cette demande d'emploi ?"
    );

    if (!confirmation) {
      return;
    }

    try {
      await axios.delete(
        `${URL}/api/job-requests/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDemandes((prev) =>
        prev.filter((demande) => demande._id !== id)
      );

      toast.success(
        "Demande supprimée avec succès"
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Erreur lors de la suppression"
      );
    }
  };

  // Chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-slate-500">
            Chargement de vos demandes...
          </p>
        </div>
      </div>
    );
  }

  // Aucune demande
  if (demandes.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="max-w-6xl mx-auto px-6 py-12">

            <h1 className="text-3xl md:text-4xl font-bold">
              Mes demandes d'emploi
            </h1>

            <p className="mt-3 text-blue-100">
              Gérez vos demandes et présentez votre profil
              aux recruteurs.
            </p>

          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12">

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center">

            <div className="text-6xl mb-5">
              📄
            </div>

            <h2 className="text-2xl font-bold text-slate-800">
              Aucune demande d'emploi
            </h2>

            <p className="text-slate-500 mt-3">
              Vous n'avez pas encore publié de demande
              d'emploi.
            </p>

            <Link
              to="/creer-demande-emploi"
              className="inline-block mt-7 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              ➕ Créer une demande
            </Link>

          </div>

        </div>
      </div>
    );
  }

  // Affichage des demandes
  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">

        <div className="max-w-6xl mx-auto px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-sm mb-4">
                🔎 Ma recherche d'emploi
              </div>

              <h1 className="text-3xl md:text-4xl font-bold">
                Mes demandes d'emploi
              </h1>

              <p className="mt-3 text-blue-100">
                Gérez les demandes d'emploi que vous avez
                publiées.
              </p>

            </div>

            <Link
              to="/creer-demande-emploi"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition text-center"
            >
              ➕ Nouvelle demande
            </Link>

          </div>

        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Compteur */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 mb-7 shadow-sm">

          <div className="flex items-center gap-4">

            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl">
              📄
            </div>

            <div>

              <p className="text-sm text-slate-500">
                Mes publications
              </p>

              <p className="text-xl font-bold text-slate-800">
                {demandes.length}{" "}
                {demandes.length > 1
                  ? "demandes"
                  : "demande"}
              </p>

            </div>

          </div>

        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {demandes.map((demande) => (

            <div
              key={demande._id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition overflow-hidden"
            >

              {/* Barre bleue */}
              <div className="h-2 bg-blue-600"></div>

              <div className="p-6">

                {/* Titre et statut */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-xs font-semibold text-blue-600 uppercase mb-2">
                      Poste recherché
                    </p>

                    <h2 className="text-2xl font-bold text-slate-800">
                      {demande.posteRecherche}
                    </h2>

                  </div>

                  <span
                    className={
                      demande.statut === "Active"
                        ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold"
                        : "bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold"
                    }
                  >
                    ● {demande.statut}
                  </span>

                </div>

                {/* Date */}
                <p className="text-sm text-slate-400 mt-3">
                  📅 Publiée le{" "}
                  {new Date(
                    demande.createdAt
                  ).toLocaleDateString("fr-FR")}
                </p>

                {/* Informations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                  <div className="bg-slate-50 rounded-xl p-4">

                    <p className="text-xs text-slate-400 mb-1">
                      Localisation
                    </p>

                    <p className="font-semibold text-slate-700">
                      📍{" "}
                      {demande.localisation ||
                        "Non précisée"}
                    </p>

                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">

                    <p className="text-xs text-slate-400 mb-1">
                      Type de contrat
                    </p>

                    <p className="font-semibold text-slate-700">
                      💼{" "}
                      {demande.typeContrat ||
                        "Non précisé"}
                    </p>

                  </div>

                </div>

                {/* Compétences */}
                {demande.competences &&
                  demande.competences.length > 0 && (

                    <div className="mt-6">

                      <p className="font-bold text-slate-700 mb-3">
                        Compétences
                      </p>

                      <div className="flex flex-wrap gap-2">

                        {demande.competences.map(
                          (competence, index) => (

                            <span
                              key={index}
                              className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-2 rounded-lg text-sm"
                            >
                              {competence}
                            </span>

                          )
                        )}

                      </div>

                    </div>
                  )}

                {/* Description */}
                {demande.description && (

                  <div className="mt-6 bg-slate-50 rounded-xl p-4">

                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">
                      Présentation
                    </p>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {demande.description.length > 220
                        ? demande.description.substring(
                            0,
                            220
                          ) + "..."
                        : demande.description}
                    </p>

                  </div>
                )}

                {/* Boutons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-slate-100">

                  <Link
                    to={`/modifier-demande-emploi/${demande._id}`}
                    className="flex-1 text-center bg-blue-50 text-blue-700 border border-blue-200 px-4 py-3 rounded-xl font-semibold hover:bg-blue-100 transition"
                  >
                    ✏️ Modifier
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(demande._id)
                    }
                    className="flex-1 bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition"
                  >
                    🗑️ Supprimer
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
};

export default MesDemandesEmploi;