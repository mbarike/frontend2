
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProfilCandidat = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [candidat, setCandidat] = useState(null);

  const URL = "http://localhost:3000";


  // ===============================
  // CHARGER LE PROFIL
  // ===============================
  useEffect(() => {

    axios
      axios
  .get(`${URL}/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
      .then((res) => {

        setCandidat(res.data);

      })
      .catch((error) => {

        console.error(error);

        toast.error("Impossible de charger le profil ❌");

      });

  }, [id]);


  // ===============================
  // CHARGEMENT
  // ===============================
  if (!candidat) {

    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white shadow rounded-xl p-8 text-center">

          <div className="text-4xl mb-3">
            ⏳
          </div>

          <p className="text-gray-600">
            Chargement du profil...
          </p>

        </div>

      </div>
    );

  }


  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-4xl mx-auto">


        {/* ===============================
            BOUTON RETOUR
        =============================== */}

        <button
          onClick={() => navigate(-1)}
          className="mb-5 bg-white px-4 py-2 rounded-lg shadow hover:bg-gray-50 transition"
        >
          ← Retour
        </button>


        {/* ===============================
            HEADER
        =============================== */}

        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-t-2xl h-40">
        </div>


        <div className="bg-white rounded-b-2xl shadow-lg px-6 pb-8">


          {/* ===============================
              PHOTO + NOM
          =============================== */}

          <div className="flex flex-col items-center -mt-16">

            {candidat.photo ? (

              <img
                src={candidat.photo}
                alt="Photo du candidat"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />

            ) : (

              <div className="w-32 h-32 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold border-4 border-white shadow-lg">

                {candidat.prenom?.charAt(0)?.toUpperCase() || "C"}

              </div>

            )}


            <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">

              {candidat.prenom} {candidat.nom}

            </h1>


            <span className="mt-2 bg-blue-100 text-blue-700 px-4 py-1 rounded-full font-semibold">

              👨‍💻 Candidat

            </span>

          </div>


          {/* ===============================
              INFORMATIONS PERSONNELLES
          =============================== */}

          <div className="mt-8">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              👤 Informations personnelles
            </h2>


            <div className="grid md:grid-cols-2 gap-4">


              {/* EMAIL */}

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold text-gray-800 mt-1 break-all">
                  📧 {candidat.email}
                </p>

              </div>


              {/* TELEPHONE */}

              <div className="bg-gray-50 rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Téléphone
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  📞 {candidat.telephone || "Non renseigné"}
                </p>

              </div>


              {/* LOCALISATION */}

              <div className="bg-gray-50 rounded-xl p-4 md:col-span-2">

                <p className="text-sm text-gray-500">
                  Localisation
                </p>

                <p className="font-semibold text-gray-800 mt-1">
                  📍 {candidat.localisation || "Non renseignée"}
                </p>

              </div>

            </div>

          </div>


          {/* ===============================
              DESCRIPTION
          =============================== */}

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🧠 À propos du candidat
            </h2>


            {candidat.description ? (

              <p className="text-gray-700 leading-7 whitespace-pre-line">
                {candidat.description}
              </p>

            ) : (

              <p className="text-gray-400 italic">
                Aucune description renseignée.
              </p>

            )}

          </div>


          {/* ===============================
              COMPÉTENCES
          =============================== */}

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🛠️ Compétences
            </h2>


            {candidat.competences?.length > 0 ? (

              <div className="flex flex-wrap gap-3">

                {candidat.competences.map((competence, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold"
                  >
                    {competence}
                  </span>

                ))}

              </div>

            ) : (

              <p className="text-gray-400 italic">
                Aucune compétence renseignée.
              </p>

            )}

          </div>


          {/* ===============================
              CV
          =============================== */}

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              📄 Curriculum Vitae
            </h2>


            {candidat.cv ? (

              <a
                href={candidat.cv}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
              >
                📄 Consulter le CV
              </a>

            ) : (

              <p className="text-gray-400 italic">
                Aucun CV disponible.
              </p>

            )}

          </div>


          {/* ===============================
              MISE EN RELATION
          =============================== */}

          <div className="mt-8 border-t pt-6">

            <h2 className="text-xl font-bold text-gray-800 mb-4">
              🤝 Mise en relation
            </h2>


            <div className="bg-blue-50 rounded-xl p-5">

              <p className="text-gray-700 mb-4">
                Vous souhaitez contacter ce candidat ?
              </p>


              <div className="flex flex-wrap gap-3">


                {/* ===============================
                    ENVOYER UN EMAIL
                =============================== */}

                {candidat.email && (
<a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(candidat.email)}`}
  target="_blank"
  rel="noreferrer"
  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-semibold transition"
>
  📧 Envoyer un email
</a>

                )}


                {/* ===============================
                    APPELER
                =============================== */}

              
{candidat.telephone && (

  <a
    href={`tel:${candidat.telephone}`}
    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg font-semibold transition"
  >
    📞 Appeler
  </a>

)}



              </div>

            </div>

          </div>


        </div>

      </div>

    </div>

  );

};


export default ProfilCandidat;

