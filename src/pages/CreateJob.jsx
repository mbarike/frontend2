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


  // ===============================
  // PUBLIER L'OFFRE
  // ===============================

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
          localisation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Offre publiée avec succès ! 🎉");

      setTitre("");
      setDescription("");
      setCompetences("");
      setLocalisation("");

      setTimeout(() => {
        navigate("/mes-offres");
      }, 800);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      toast.error(
        error.response?.data?.message ||
        "Impossible de publier l'offre."
      );

    } finally {

      setLoading(false);

    }

  };


  // ===============================
  // APERÇU COMPÉTENCES
  // ===============================

  const competencesList = competences
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "");


  return (

    <div className="
      min-h-screen
      bg-gray-100
      px-4
      py-8
      md:py-12
    ">


      <div className="
        max-w-6xl
        mx-auto
      ">


        {/* ================================= */}
        {/* EN-TÊTE */}
        {/* ================================= */}

        <div className="
          mb-8
          text-center
        ">

          <div className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            bg-blue-100
            rounded-2xl
            text-3xl
            mb-4
          ">
            💼
          </div>


          <h1 className="
            text-3xl
            md:text-4xl
            font-bold
            text-gray-900
          ">
            Créer une offre
          </h1>


          <p className="
            text-gray-500
            mt-2
            text-base
            md:text-lg
          ">
            Publiez une nouvelle opportunité d'emploi
          </p>

        </div>



        {/* ================================= */}
        {/* CONTENU */}
        {/* ================================= */}

        <div className="
          grid
          lg:grid-cols-3
          gap-6
          items-start
        ">


          {/* ================================= */}
          {/* FORMULAIRE */}
          {/* ================================= */}

          <div className="
            lg:col-span-2
            bg-white
            rounded-3xl
            shadow-sm
            border
            border-gray-200
            overflow-hidden
          ">


            {/* HEADER FORMULAIRE */}

            <div className="
              bg-blue-600
              px-6
              md:px-8
              py-6
              text-white
            ">

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  w-12
                  h-12
                  bg-white/20
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-2xl
                ">
                  📝
                </div>


                <div>

                  <h2 className="
                    text-xl
                    font-bold
                  ">
                    Informations de l'offre
                  </h2>

                  <p className="
                    text-blue-100
                    text-sm
                    mt-1
                  ">
                    Remplissez les informations du poste
                  </p>

                </div>

              </div>

            </div>



            {/* FORMULAIRE */}

            <form
              onSubmit={handleSubmit}
              className="
                p-6
                md:p-8
                space-y-7
              "
            >


              {/* ================================= */}
              {/* TITRE */}
              {/* ================================= */}

              <div>

                <label className="
                  block
                  text-sm
                  font-bold
                  text-gray-800
                  mb-2
                ">
                  💼 Titre du poste
                </label>


                <input
                  type="text"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                  placeholder="Ex : Développeur React"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    bg-gray-50
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />


                <p className="
                  text-xs
                  text-gray-400
                  mt-2
                ">
                  Donnez un titre clair et précis au poste.
                </p>

              </div>



              {/* ================================= */}
              {/* DESCRIPTION */}
              {/* ================================= */}

              <div>

                <label className="
                  block
                  text-sm
                  font-bold
                  text-gray-800
                  mb-2
                ">
                  📄 Description de l'offre
                </label>


                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez le poste, les missions, les responsabilités et le profil recherché..."
                  rows="7"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    bg-gray-50
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                    resize-none
                  "
                />


                <div className="
                  flex
                  justify-between
                  mt-2
                ">

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Présentez clairement les missions du poste.
                  </p>

                  <span className="
                    text-xs
                    text-gray-400
                  ">
                    {description.length} caractères
                  </span>

                </div>

              </div>



              {/* ================================= */}
              {/* COMPÉTENCES */}
              {/* ================================= */}

              <div>

                <label className="
                  block
                  text-sm
                  font-bold
                  text-gray-800
                  mb-2
                ">
                  🛠️ Compétences recherchées
                </label>


                <input
                  type="text"
                  value={competences}
                  onChange={(e) => setCompetences(e.target.value)}
                  placeholder="Ex : React, Node.js, MongoDB"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    bg-gray-50
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />


                <p className="
                  text-xs
                  text-gray-400
                  mt-2
                ">
                  Séparez les compétences par des virgules.
                </p>



                {/* APERÇU DES TAGS */}

                {competencesList.length > 0 && (

                  <div className="
                    mt-4
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {competencesList.map((competence, index) => (

                      <span
                        key={index}
                        className="
                          inline-flex
                          items-center
                          bg-blue-50
                          text-blue-600
                          border
                          border-blue-100
                          px-3
                          py-1.5
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        ✓ {competence}
                      </span>

                    ))}

                  </div>

                )}

              </div>



              {/* ================================= */}
              {/* LOCALISATION */}
              {/* ================================= */}

              <div>

                <label className="
                  block
                  text-sm
                  font-bold
                  text-gray-800
                  mb-2
                ">
                  📍 Localisation
                </label>


                <input
                  type="text"
                  value={localisation}
                  onChange={(e) => setLocalisation(e.target.value)}
                  placeholder="Ex : Dakar"
                  className="
                    w-full
                    border
                    border-gray-200
                    rounded-xl
                    px-4
                    py-3.5
                    text-gray-800
                    outline-none
                    bg-gray-50
                    focus:bg-white
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    transition
                  "
                />


                <p className="
                  text-xs
                  text-gray-400
                  mt-2
                ">
                  Indiquez la ville ou la zone où se trouve le poste.
                </p>

              </div>



              {/* ================================= */}
              {/* SÉPARATION */}
              {/* ================================= */}

              <div className="
                border-t
                border-gray-100
                pt-6
              ">


                {/* BOUTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full
                    bg-blue-600
                    hover:bg-blue-700
                    disabled:bg-blue-300
                    text-white
                    py-4
                    rounded-xl
                    font-bold
                    text-lg
                    transition
                    shadow-lg
                    shadow-blue-100
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >

                  {loading ? (

                    <>
                      <span className="
                        w-5
                        h-5
                        border-2
                        border-white
                        border-t-transparent
                        rounded-full
                        animate-spin
                      " />

                      Publication en cours...

                    </>

                  ) : (

                    <>
                      🚀 Publier l'offre
                    </>

                  )}

                </button>


                <p className="
                  text-center
                  text-xs
                  text-gray-400
                  mt-3
                ">
                  Votre offre sera visible par les candidats après sa publication.
                </p>

              </div>


            </form>

          </div>



          {/* ================================= */}
          {/* BLOC CONSEILS */}
          {/* ================================= */}

          <div className="
            space-y-6
          ">


            {/* CONSEILS */}

            <div className="
              bg-white
              rounded-3xl
              shadow-sm
              border
              border-gray-200
              p-6
            ">

              <div className="
                flex
                items-center
                gap-3
                mb-5
              ">

                <div className="
                  w-11
                  h-11
                  bg-yellow-50
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                ">
                  💡
                </div>


                <div>

                  <h3 className="
                    font-bold
                    text-gray-900
                  ">
                    Conseils
                  </h3>

                  <p className="
                    text-xs
                    text-gray-400
                  ">
                    Pour une meilleure annonce
                  </p>

                </div>

              </div>



              <div className="
                space-y-4
              ">


                <div className="
                  flex
                  gap-3
                ">

                  <span className="
                    text-green-500
                    font-bold
                  ">
                    ✓
                  </span>

                  <p className="
                    text-sm
                    text-gray-600
                  ">
                    Utilisez un titre de poste précis et facile à comprendre.
                  </p>

                </div>


                <div className="
                  flex
                  gap-3
                ">

                  <span className="
                    text-green-500
                    font-bold
                  ">
                    ✓
                  </span>

                  <p className="
                    text-sm
                    text-gray-600
                  ">
                    Décrivez clairement les missions et responsabilités.
                  </p>

                </div>


                <div className="
                  flex
                  gap-3
                ">

                  <span className="
                    text-green-500
                    font-bold
                  ">
                    ✓
                  </span>

                  <p className="
                    text-sm
                    text-gray-600
                  ">
                    Ajoutez les principales compétences recherchées.
                  </p>

                </div>


                <div className="
                  flex
                  gap-3
                ">

                  <span className="
                    text-green-500
                    font-bold
                  ">
                    ✓
                  </span>

                  <p className="
                    text-sm
                    text-gray-600
                  ">
                    Indiquez une localisation précise.
                  </p>

                </div>


              </div>

            </div>



            {/* INFO */}

            <div className="
              bg-blue-600
              rounded-3xl
              p-6
              text-white
              shadow-lg
              shadow-blue-100
            ">

              <div className="
                text-3xl
                mb-4
              ">
                🎯
              </div>


              <h3 className="
                text-lg
                font-bold
                mb-2
              ">
                Trouvez les bons candidats
              </h3>


              <p className="
                text-sm
                text-blue-100
                leading-relaxed
              ">
                Une offre claire et détaillée permet aux candidats
                de mieux comprendre le poste et de trouver
                l'opportunité qui leur correspond.
              </p>

            </div>



          </div>

        </div>

      </div>

    </div>

  );

};

export default CreateJob;