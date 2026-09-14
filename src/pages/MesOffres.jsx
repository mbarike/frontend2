import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const MesOffres = () => {

  const [offres, setOffres] = useState([]);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();


  // =================================================
  // CHARGER MES OFFRES
  // =================================================

  const fetchOffres = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/jobs/mes-offres",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setOffres(res.data);

    } catch (error) {

      console.log(
        error.response?.data || error.message
      );

      toast.error("Impossible de charger vos offres.");

    }

  };


  useEffect(() => {

    fetchOffres();

  }, []);


  // =================================================
  // SUPPRIMER UNE OFFRE
  // =================================================

  const supprimerOffre = (id) => {

    // Toast de confirmation
    const toastId = toast.custom(
      (t) => (

        <div
          className={`
            ${
              t.visible
                ? "animate-enter"
                : "animate-leave"
            }

            bg-white
            border
            border-gray-200
            shadow-xl
            rounded-2xl
            p-5
            w-[360px]
            max-w-[calc(100vw-32px)]
          `}
        >

          {/* ICONE + TEXTE */}

          <div className="
            flex
            items-start
            gap-3
          ">

            <div className="
              w-11
              h-11
              bg-red-50
              rounded-xl
              flex
              items-center
              justify-center
              text-xl
              flex-shrink-0
            ">
              🗑️
            </div>


            <div>

              <h3 className="
                font-bold
                text-gray-800
              ">
                Supprimer cette offre ?
              </h3>


              <p className="
                text-sm
                text-gray-500
                mt-1
                leading-relaxed
              ">
                Cette action est définitive.
              </p>

            </div>

          </div>


          {/* BOUTONS */}

          <div className="
            flex
            gap-2
            mt-4
          ">

            {/* ANNULER */}

            <button
              onClick={() => toast.dismiss(toastId)}
              className="
                flex-1
                border
                border-gray-200
                bg-gray-50
                hover:bg-gray-100
                text-gray-700
                py-2.5
                rounded-lg
                font-semibold
                text-sm
                transition
              "
            >
              Annuler
            </button>


            {/* SUPPRIMER */}

            <button
              onClick={async () => {

                // Fermer le toast de confirmation
                toast.dismiss(toastId);

                try {

                  await axios.delete(
                    `http://localhost:3000/api/jobs/${id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`
                      }
                    }
                  );


                  // Retirer immédiatement l'offre
                  // de la liste affichée
                  setOffres((offresActuelles) =>
                    offresActuelles.filter(
                      (offre) => offre._id !== id
                    )
                  );


                  // Toast de succès

                  toast.success(
                    "Offre supprimée avec succès !",
                    {
                      duration: 3000,
                      position: "top-right"
                    }
                  );


                } catch (error) {

                  console.log(
                    error.response?.data ||
                    error.message
                  );


                  // Toast d'erreur

                  toast.error(
                    "Impossible de supprimer l'offre.",
                    {
                      duration: 3000,
                      position: "top-right"
                    }
                  );

                }

              }}
              className="
                flex-1
                bg-red-600
                hover:bg-red-700
                text-white
                py-2.5
                rounded-lg
                font-semibold
                text-sm
                transition
              "
            >
              Supprimer
            </button>

          </div>

        </div>

      ),
      {
        duration: Infinity,
        position: "top-right"
      }
    );

  };


  return (

    <div className="
      min-h-screen
      bg-gray-100
      px-4
      py-8
      md:py-10
    ">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="
        max-w-7xl
        mx-auto
        mb-8
      ">

        <div className="
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-6
          md:p-8
        ">

          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-center
            lg:justify-between
            gap-6
          ">


            {/* TITRE */}

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-14
                h-14
                bg-blue-50
                rounded-2xl
                flex
                items-center
                justify-center
                text-2xl
                flex-shrink-0
              ">
                💼
              </div>


              <div>

                <p className="
                  text-sm
                  font-medium
                  text-blue-600
                  mb-1
                ">
                  Espace recruteur
                </p>

                <h1 className="
                  text-3xl
                  md:text-4xl
                  font-bold
                  text-gray-800
                ">
                  Mes offres
                </h1>

                <p className="
                  text-gray-500
                  mt-1
                ">
                  Gérez vos offres d'emploi et vos candidatures.
                </p>

              </div>

            </div>


            {/* CÔTÉ DROIT */}

            <div className="
              flex
              items-center
              gap-3
              flex-wrap
            ">


              {/* COMPTEUR */}

              <div className="
                bg-blue-50
                border
                border-blue-100
                rounded-xl
                px-5
                py-3
                text-center
                min-w-[100px]
              ">

                <div className="
                  text-2xl
                  font-bold
                  text-blue-600
                ">
                  {offres.length}
                </div>

                <div className="
                  text-xs
                  font-medium
                  text-blue-500
                ">
                  Offre{offres.length > 1 ? "s" : ""}
                </div>

              </div>


              {/* CREER */}

              <button
                onClick={() => navigate("/create")}
                className="
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  font-semibold
                  transition
                  shadow-sm
                  flex
                  items-center
                  gap-2
                "
              >
                <span>＋</span>
                Publier une offre
              </button>

            </div>

          </div>

        </div>

      </div>



      {/* ================================================= */}
      {/* AUCUNE OFFRE */}
      {/* ================================================= */}

      {offres.length === 0 && (

        <div className="
          max-w-7xl
          mx-auto
          bg-white
          rounded-2xl
          border
          border-gray-100
          shadow-sm
          p-10
          md:p-16
          text-center
        ">

          <div className="
            w-20
            h-20
            mx-auto
            bg-blue-50
            rounded-2xl
            flex
            items-center
            justify-center
            text-4xl
            mb-5
          ">
            💼
          </div>


          <h2 className="
            text-2xl
            font-bold
            text-gray-800
          ">
            Aucune offre pour le moment
          </h2>


          <p className="
            text-gray-500
            mt-2
            max-w-md
            mx-auto
          ">
            Vous n'avez encore publié aucune offre d'emploi.
            Commencez dès maintenant à rechercher vos futurs candidats.
          </p>


          <button
            onClick={() => navigate("/create")}
            className="
              mt-7
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-7
              py-3
              rounded-xl
              font-semibold
              transition
              shadow-sm
            "
          >
            ＋ Créer ma première offre
          </button>

        </div>

      )}



      {/* ================================================= */}
      {/* LISTE DES OFFRES */}
      {/* ================================================= */}

      <div className="
        max-w-7xl
        mx-auto
        grid
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">


        {offres.map((offre) => (

          <div
            key={offre._id}
            className="
              bg-white
              rounded-2xl
              border
              border-gray-100
              shadow-sm
              hover:shadow-xl
              hover:-translate-y-1
              transition-all
              duration-200
              overflow-hidden
              flex
              flex-col
            "
          >


            {/* ================================================= */}
            {/* BANDEAU */}
            {/* ================================================= */}

            <div className="
              h-2
              bg-blue-600
            " />


            <div className="
              p-6
              flex
              flex-col
              flex-1
            ">


              {/* ================================================= */}
              {/* TITRE */}
              {/* ================================================= */}

              <div className="
                flex
                items-start
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
                  flex-shrink-0
                ">
                  💼
                </div>


                <div className="flex-1 min-w-0">

                  <h2 className="
                    text-xl
                    font-bold
                    text-gray-800
                    leading-snug
                    line-clamp-2
                  ">
                    {offre.titre}
                  </h2>


                  <div className="
                    flex
                    items-center
                    gap-1.5
                    mt-2
                    text-xs
                    text-gray-400
                  ">

                    <span>
                      🟢
                    </span>

                    <span>
                      Offre publiée
                    </span>

                  </div>

                </div>

              </div>



              {/* ================================================= */}
              {/* DESCRIPTION */}
              {/* ================================================= */}

              <div className="
                mt-5
                bg-gray-50
                rounded-xl
                p-4
              ">

                <p className="
                  text-sm
                  text-gray-600
                  leading-relaxed
                  line-clamp-3
                ">
                  {offre.description}
                </p>

              </div>



              {/* ================================================= */}
              {/* INFORMATIONS */}
              {/* ================================================= */}

              <div className="
                mt-4
                space-y-2
              ">


                {/* LOCALISATION */}

                <div className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  text-gray-600
                ">

                  <span className="
                    w-8
                    h-8
                    bg-gray-100
                    rounded-lg
                    flex
                    items-center
                    justify-center
                  ">
                    📍
                  </span>

                  <span>
                    {offre.localisation || "Localisation non précisée"}
                  </span>

                </div>


                {/* DATE */}

                {offre.createdAt && (

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-gray-500
                  ">

                    <span className="
                      w-8
                      h-8
                      bg-gray-100
                      rounded-lg
                      flex
                      items-center
                      justify-center
                    ">
                      🕒
                    </span>

                    <span>

                      Publiée le{" "}

                      {new Date(
                        offre.createdAt
                      ).toLocaleDateString("fr-FR")}

                      {" à "}

                      {new Date(
                        offre.createdAt
                      ).toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}

                    </span>

                  </div>

                )}

              </div>



              {/* ================================================= */}
              {/* COMPETENCES */}
              {/* ================================================= */}

              {offre.competences &&
                offre.competences.length > 0 && (

                <div className="mt-5">

                  <p className="
                    text-xs
                    font-semibold
                    text-gray-500
                    uppercase
                    tracking-wide
                    mb-2
                  ">
                    Compétences recherchées
                  </p>


                  <div className="
                    flex
                    flex-wrap
                    gap-2
                  ">

                    {offre.competences
                      .slice(0, 5)
                      .map((competence, index) => (

                        <span
                          key={index}
                          className="
                            bg-blue-50
                            text-blue-600
                            border
                            border-blue-100
                            text-xs
                            font-medium
                            px-3
                            py-1.5
                            rounded-full
                          "
                        >
                          {competence.trim()}
                        </span>

                      ))}

                  </div>

                </div>

              )}



              {/* ================================================= */}
              {/* ACTIONS */}
              {/* ================================================= */}

              <div className="
                border-t
                border-gray-100
                mt-6
                pt-5
              ">


                <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-3
                  gap-2
                ">


                  {/* CANDIDATURES */}

                  <button
                    onClick={() =>
                      navigate(`/candidats/${offre._id}`)
                    }
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-3
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      transition
                    "
                  >
                    👥 Candidatures
                  </button>


                  {/* MODIFIER */}

                  <button
                    onClick={() =>
                      navigate(`/edit/${offre._id}`)
                    }
                    className="
                      bg-amber-500
                      hover:bg-amber-600
                      text-white
                      px-3
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      transition
                    "
                  >
                    ✏️ Modifier
                  </button>


                  {/* SUPPRIMER */}

                  <button
                    onClick={() =>
                      supprimerOffre(offre._id)
                    }
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-3
                      py-2.5
                      rounded-lg
                      font-semibold
                      text-sm
                      transition
                    "
                  >
                    🗑️ Supprimer
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default MesOffres;