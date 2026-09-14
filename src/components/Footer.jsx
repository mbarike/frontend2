import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">

      {/* =============================== */}
      {/* CONTENU PRINCIPAL */}
      {/* =============================== */}

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-12
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-4
          gap-10
        ">

          {/* =============================== */}
          {/* LOGO / PRESENTATION */}
          {/* =============================== */}

          <div>

            <div className="
              flex
              items-center
              gap-3
              mb-4
            ">

              <div className="
                w-11
                h-11
                bg-blue-600
                rounded-xl
                flex
                items-center
                justify-center
                text-xl
              ">
                💼
              </div>

              <div>

                <h2 className="
                  text-xl
                  font-bold
                ">
                  JobConnect
                </h2>

                <p className="
                  text-xs
                  text-gray-400
                ">
                  Votre avenir professionnel
                </p>

              </div>

            </div>


            <p className="
              text-gray-400
              text-sm
              leading-relaxed
              max-w-sm
            ">
              JobConnect vous accompagne dans votre recherche
              d'emploi et vous permet de connecter facilement
              candidats et recruteurs.
            </p>

          </div>


          {/* =============================== */}
          {/* NAVIGATION */}
          {/* =============================== */}

          <div>

            <h3 className="
              text-lg
              font-semibold
              mb-4
            ">
              Navigation
            </h3>


            <ul className="
              space-y-3
              text-sm
            ">

              <li>
                <Link
                  to="/"
                  className="
                    text-gray-400
                    hover:text-white
                    transition
                  "
                >
                  🏠 Accueil
                </Link>
              </li>


              <li>
                <Link
                  to="/profil"
                  className="
                    text-gray-400
                    hover:text-white
                    transition
                  "
                >
                  👤 Mon profil
                </Link>
              </li>


              <li>
                <Link
                  to="/mes-candidatures"
                  className="
                    text-gray-400
                    hover:text-white
                    transition
                  "
                >
                  📄 Mes candidatures
                </Link>
              </li>

            </ul>

          </div>




          {/* =============================== */}
          {/* CONTACT */}
          {/* =============================== */}

          <div>

            <h3 className="
              text-lg
              font-semibold
              mb-4
            ">
              Contact
            </h3>


            <ul className="
              space-y-3
              text-sm
            ">

              <li className="text-gray-400">
                📧 jobConnect@gmail.com
              </li>

              <li className="text-gray-400">
                📞 +221 77 098 00 80
              </li>

              <li className="text-gray-400">
                📍 Dakar, Sénégal
              </li>

            </ul>

          </div>

        </div>

      </div>


      {/* =============================== */}
      {/* BAS DU FOOTER */}
      {/* =============================== */}

      <div className="
        border-t
        border-gray-800
      ">

        <div className="
          max-w-7xl
          mx-auto
          px-6
          py-5
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-3
        ">

          <p className="
            text-sm
            text-gray-500
            text-center
          ">
            © {new Date().getFullYear()} JobConnect.
            Tous droits réservés.
          </p>


          <p className="
            text-sm
            text-gray-500
          ">
            Votre avenir professionnel commence ici 🚀
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;