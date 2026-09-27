import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilCandidat = () => {
  const { id } = useParams();

  const [candidat, setCandidat] = useState(null);
  const [loading, setLoading] = useState(true);

  const URL =
    import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Permet de corriger les anciennes URLs enregistrées
  // et de fonctionner en local comme sur Render.
  const getFileUrl = (fileUrl) => {
    if (!fileUrl) return "";

    if (fileUrl.startsWith("http://localhost:3000")) {
      return fileUrl.replace("http://localhost:3000", URL);
    }

    if (fileUrl.startsWith("http://127.0.0.1:3000")) {
      return fileUrl.replace("http://127.0.0.1:3000", URL);
    }

    if (fileUrl.startsWith("https://backend-emmt.onrender.com")) {
      return fileUrl.replace(
        "https://backend-emmt.onrender.com",
        URL
      );
    }

    if (fileUrl.startsWith("/uploads/")) {
      return `${URL}${fileUrl}`;
    }

    return fileUrl;
  };

  useEffect(() => {
    const fetchCandidat = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          toast.error("Vous devez être connecté.");
          return;
        }

        const res = await axios.get(`${URL}/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const profil = res.data;

        setCandidat({
          ...profil,
          photo: getFileUrl(profil.photo),
          cv: getFileUrl(profil.cv),
        });
      } catch (error) {
        console.error(
          "Erreur récupération profil candidat :",
          error
        );

        toast.error(
          error.response?.data?.message ||
            "Impossible de récupérer le profil du candidat."
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCandidat();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-lg">
          Chargement du profil...
        </p>
      </div>
    );
  }

  if (!candidat) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-md rounded-xl p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Profil introuvable
          </h2>

          <Link
            to="/candidats"
            className="text-blue-600 hover:underline"
          >
            Retour aux candidats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Retour */}
        <Link
          to="/candidats"
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Retour aux candidats
        </Link>

        {/* Carte principale */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* En-tête */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

              {/* Photo */}
              <div className="flex-shrink-0">
                {candidat.photo ? (
                  <img
                    src={candidat.photo}
                    alt={`${candidat.prenom} ${candidat.nom}`}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display =
                        "flex";
                    }}
                  />
                ) : null}

                <div
                  className={`${
                    candidat.photo ? "hidden" : "flex"
                  } w-32 h-32 rounded-full bg-white items-center justify-center text-blue-600 text-4xl font-bold border-4 border-white shadow-md`}
                >
                  {candidat.prenom?.charAt(0)?.toUpperCase() ||
                    "C"}
                </div>
              </div>

              {/* Informations principales */}
              <div className="text-white text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">
                  {candidat.prenom} {candidat.nom}
                </h1>

                {candidat.email && (
                  <p className="text-blue-100 mb-1">
                    {candidat.email}
                  </p>
                )}

                {candidat.localisation && (
                  <p className="text-blue-100">
                    📍 {candidat.localisation}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">

            {/* Informations de contact */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Informations de contact
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {candidat.email && (
                  <a
                    href={`mailto:${candidat.email}`}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
                  >
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="text-sm text-gray-500">
                        Email
                      </p>
                      <p className="text-gray-800 font-medium break-all">
                        {candidat.email}
                      </p>
                    </div>
                  </a>
                )}

                {candidat.telephone && (
                  <a
                    href={`tel:${candidat.telephone}`}
                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition"
                  >
                    <span className="text-xl">📞</span>
                    <div>
                      <p className="text-sm text-gray-500">
                        Téléphone
                      </p>
                      <p className="text-gray-800 font-medium">
                        {candidat.telephone}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                À propos du candidat
              </h2>

              <div className="bg-gray-50 rounded-xl p-5 max-w-full">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words [overflow-wrap:anywhere]">
                  {candidat.description ||
                    "Aucune description renseignée."}
                </p>
              </div>
            </div>

            {/* Compétences */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Compétences
              </h2>

              {candidat.competences &&
              candidat.competences.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {candidat.competences.map(
                    (competence, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {competence}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="text-gray-500">
                  Aucune compétence renseignée.
                </p>
              )}
            </div>

            {/* CV */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                CV
              </h2>

              {candidat.cv ? (
                <a
                  href={candidat.cv}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  📄 Consulter le CV
                </a>
              ) : (
                <p className="text-gray-500">
                  Aucun CV disponible.
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="border-t pt-6 flex flex-wrap gap-3">
              {candidat.email && (
                <a
                  href={`mailto:${candidat.email}`}
                  className="px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  📧 Envoyer un email
                </a>
              )}

              {candidat.telephone && (
                <a
                  href={`tel:${candidat.telephone}`}
                  className="px-5 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
                >
                  📞 Appeler
                </a>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCandidat;