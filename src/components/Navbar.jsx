import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const token = localStorage.getItem("token");

  // ===============================
  // RÉCUPÉRER LE PROFIL
  // ===============================

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setUser(null);
        return;
      }

      try {
        const res = await axios.get(
          "https://backend-emmt.onrender.com/api/users/profil",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchProfile();
  }, [token]);

  // ===============================
  // DÉCONNEXION
  // ===============================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");

    setUser(null);
    setMenuOpen(false);
    setActiveMenu(null);

    toast.success("Déconnexion réussie");

    navigate("/login");
  };

  // ===============================
  // GESTION DES MENUS
  // ===============================

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const closeMenus = () => {
    setActiveMenu(null);
    setMenuOpen(false);
  };

  // ===============================
  // LIENS DES MENUS
  // ===============================

  const dropdownLinks = {
    emploi: [
      {
        to: "/",
        title: "Consulter les offres",
        description: "Découvrir les opportunités disponibles",
      },
      {
        to: "/creer-demande-emploi",
        title: "Créer une demande",
        description: "Publier votre recherche d'emploi",
      },
      {
        to: "/mes-demandes-emploi",
        title: "Mes demandes",
        description: "Gérer vos demandes d'emploi",
      },
    ],

    candidatures: [
      {
        to: "/mes-candidatures",
        title: "Mes candidatures",
        description: "Consulter et suivre vos candidatures",
      },
    ],

    recrutement: [
      {
        to: "/create",
        title: "Créer une offre",
        description: "Publier une nouvelle opportunité",
      },
      {
        to: "/mes-offres",
        title: "Mes offres",
        description: "Gérer vos offres publiées",
      },
      {
        to: "/demandes-emploi",
        title: "Demandes d'emploi",
        description: "Consulter les profils des candidats",
      },
    ],
  };

  // ===============================
  // STYLE
  // ===============================

  const navLink =
    "flex items-center px-4 py-2.5 rounded-xl text-sm lg:text-base font-semibold text-white hover:bg-blue-500 transition-all duration-200 whitespace-nowrap";

  const dropdownButton =
    "flex items-center px-4 py-2.5 rounded-xl text-sm lg:text-base font-semibold text-white hover:bg-blue-500 transition-all duration-200 whitespace-nowrap";

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 text-white shadow-lg">
      {/* ===============================
          CONTAINER PRINCIPAL
      =============================== */}

      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="h-[76px] flex items-center justify-between gap-4">

          {/* ===============================
              LOGO
          =============================== */}

          <Link
            to="/"
            onClick={closeMenus}
            className="flex items-center gap-3 shrink-0"
          >
            <div
              className="
                w-11
                h-11
                rounded-xl
                bg-white
                flex
                items-center
                justify-center
                shadow-md
              "
            >
              <span className="text-blue-600 font-bold text-lg">
                JC
              </span>
            </div>

            <div className="hidden sm:block">
              <div className="text-xl lg:text-2xl font-bold leading-none">
                JobConnect
              </div>

              <div className="text-xs text-blue-100 mt-1">
                Votre avenir professionnel
              </div>
            </div>
          </Link>

          {/* ===============================
              MENU DESKTOP
          =============================== */}

          <div className="hidden md:flex items-center gap-1 lg:gap-2 ml-auto">

            {/* ACCUEIL */}

            <Link
              to="/"
              onClick={() => setActiveMenu(null)}
              className={navLink}
            >
              <span>Accueil</span>
            </Link>

            {/* ===============================
                DASHBOARD ADMIN
            =============================== */}

            {user?.role === "admin" && (
              <Link
                to="/admin"
                onClick={closeMenus}
                className="
                  flex
                  items-center
                  px-4
                  py-2.5
                  rounded-xl
                  bg-white/10
                  border
                  border-white/20
                  text-sm
                  lg:text-base
                  font-bold
                  text-white
                  hover:bg-white
                  hover:text-blue-600
                  hover:shadow-md
                  transition-all
                  duration-200
                  whitespace-nowrap
                "
              >
                <span>Dashboard Admin</span>
              </Link>
            )}

            {/* ===============================
                EMPLOI
            =============================== */}

            <div className="relative">
              <button
                onClick={() => toggleMenu("emploi")}
                className={dropdownButton}
              >
                <span>Emploi</span>
              </button>

              {activeMenu === "emploi" && (
                <div
                  className="
                    absolute
                    top-full
                    left-0
                    mt-3
                    w-80
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                  "
                >
                  <div className="px-5 py-4 border-b bg-gray-50">
                    <p className="font-bold text-gray-800">
                      Emploi
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Explorez les opportunités professionnelles
                    </p>
                  </div>

                  {dropdownLinks.emploi.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="
                        block
                        px-5
                        py-4
                        hover:bg-blue-50
                        transition
                      "
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ===============================
                CANDIDATURES
            =============================== */}

            <div className="relative">
              <button
                onClick={() => toggleMenu("candidatures")}
                className={dropdownButton}
              >
                <span>Candidatures</span>
              </button>

              {activeMenu === "candidatures" && (
                <div
                  className="
                    absolute
                    top-full
                    left-0
                    mt-3
                    w-80
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                  "
                >
                  <div className="px-5 py-4 border-b bg-gray-50">
                    <p className="font-bold text-gray-800">
                      Candidatures
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Gérez vos candidatures
                    </p>
                  </div>

                  {dropdownLinks.candidatures.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="
                        block
                        px-5
                        py-4
                        hover:bg-blue-50
                        transition
                      "
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ===============================
                RECRUTEMENT
            =============================== */}

            <div className="relative">
              <button
                onClick={() => toggleMenu("recrutement")}
                className={dropdownButton}
              >
                <span>Recrutement</span>
              </button>

              {activeMenu === "recrutement" && (
                <div
                  className="
                    absolute
                    top-full
                    right-0
                    mt-3
                    w-80
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                  "
                >
                  <div className="px-5 py-4 border-b bg-gray-50">
                    <p className="font-bold text-gray-800">
                      Recrutement
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      Publiez et gérez vos opportunités
                    </p>
                  </div>

                  {dropdownLinks.recrutement.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="
                        block
                        px-5
                        py-4
                        hover:bg-blue-50
                        transition
                      "
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.title}
                        </p>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* ===============================
                MON ESPACE
            =============================== */}

            {token && (
              <div className="relative">
                <button
                  onClick={() => toggleMenu("espace")}
                  className={dropdownButton}
                >
                  <span>Mon espace</span>
                </button>

                {activeMenu === "espace" && (
                  <div
                    className="
                      absolute
                      top-full
                      right-0
                      mt-3
                      w-72
                      bg-white
                      rounded-2xl
                      shadow-2xl
                      border
                      border-gray-100
                      overflow-hidden
                    "
                  >
                    <div className="px-5 py-4 bg-gray-50 border-b">
                      <p className="text-xs text-gray-500">
                        Connecté en tant que
                      </p>

                      <p className="font-bold text-gray-800 mt-1">
                        {user
                          ? `${user.prenom || ""} ${
                              user.nom || ""
                            }`.trim()
                          : "Utilisateur"}
                      </p>

                      {user?.role && (
                        <p className="text-xs text-blue-600 mt-1 capitalize">
                          {user.role}
                        </p>
                      )}
                    </div>

                    <Link
                      to="/profil"
                      onClick={closeMenus}
                      className="
                        block
                        px-5
                        py-4
                        hover:bg-blue-50
                        transition
                      "
                    >
                      <p className="font-semibold text-gray-800">
                        Mon profil
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Consulter et modifier mon profil
                      </p>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* ===============================
                DÉCONNEXION
            =============================== */}

            {token && (
              <button
                onClick={handleLogout}
                className="
                  ml-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-white
                  text-blue-600
                  font-bold
                  text-sm
                  lg:text-base
                  hover:bg-blue-50
                  hover:shadow-md
                  transition-all
                  whitespace-nowrap
                "
              >
                Déconnexion
              </button>
            )}

            {/* ===============================
                NON CONNECTÉ
            =============================== */}

            {!token && (
              <>
                <Link
                  to="/login"
                  className="
                    ml-2
                    px-4
                    py-2.5
                    rounded-xl
                    bg-white
                    text-blue-600
                    font-bold
                    hover:bg-blue-50
                    transition
                  "
                >
                  Connexion
                </Link>

                <Link
                  to="/register"
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-white
                    text-white
                    font-bold
                    hover:bg-white
                    hover:text-blue-600
                    transition
                  "
                >
                  Inscription
                </Link>
              </>
            )}
          </div>

          {/* ===============================
              BOUTON MOBILE
          =============================== */}

          <button
            onClick={() => {
              setMenuOpen(!menuOpen);
              setActiveMenu(null);
            }}
            className="
              md:hidden
              px-4
              py-2
              rounded-xl
              bg-blue-500
              hover:bg-blue-400
              font-semibold
              transition
            "
            aria-label="Menu"
          >
            {menuOpen ? "Fermer" : "Menu"}
          </button>
        </div>

        {/* ===============================
            MENU MOBILE
        =============================== */}

        {menuOpen && (
          <div
            className="
              md:hidden
              border-t
              border-blue-500
              py-4
            "
          >
            <div className="flex flex-col gap-2">

              {/* ACCUEIL */}

              <Link
                to="/"
                onClick={closeMenus}
                className={navLink}
              >
                <span>Accueil</span>
              </Link>

              {/* DASHBOARD ADMIN */}

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={closeMenus}
                  className="
                    flex
                    items-center
                    px-4
                    py-3
                    rounded-xl
                    bg-white/10
                    border
                    border-white/20
                    font-bold
                    hover:bg-white
                    hover:text-blue-600
                    transition
                  "
                >
                  <span>Dashboard Admin</span>
                </Link>
              )}

              {/* EMPLOI */}

              <button
                onClick={() => toggleMenu("emploi")}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-blue-500
                  transition
                "
              >
                <span>Emploi</span>

                <span className="text-sm">
                  {activeMenu === "emploi"
                    ? "Fermer"
                    : "Ouvrir"}
                </span>
              </button>

              {activeMenu === "emploi" && (
                <div className="ml-4 border-l-2 border-blue-400 pl-3">
                  {dropdownLinks.emploi.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="
                        block
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-blue-500
                        transition
                      "
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* CANDIDATURES */}

              <button
                onClick={() => toggleMenu("candidatures")}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-blue-500
                  transition
                "
              >
                <span>Candidatures</span>

                <span className="text-sm">
                  {activeMenu === "candidatures"
                    ? "Fermer"
                    : "Ouvrir"}
                </span>
              </button>

              {activeMenu === "candidatures" && (
                <div className="ml-4 border-l-2 border-blue-400 pl-3">
                  {dropdownLinks.candidatures.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="
                        block
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-blue-500
                        transition
                      "
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* RECRUTEMENT */}

              <button
                onClick={() => toggleMenu("recrutement")}
                className="
                  w-full
                  flex
                  items-center
                  justify-between
                  px-4
                  py-3
                  rounded-xl
                  font-semibold
                  hover:bg-blue-500
                  transition
                "
              >
                <span>Recrutement</span>

                <span className="text-sm">
                  {activeMenu === "recrutement"
                    ? "Fermer"
                    : "Ouvrir"}
                </span>
              </button>

              {activeMenu === "recrutement" && (
                <div className="ml-4 border-l-2 border-blue-400 pl-3">
                  {dropdownLinks.recrutement.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={closeMenus}
                      className="
                        block
                        px-4
                        py-3
                        rounded-lg
                        hover:bg-blue-500
                        transition
                      "
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              )}

              {/* MON ESPACE */}

              {token && (
                <>
                  <button
                    onClick={() => toggleMenu("espace")}
                    className="
                      w-full
                      flex
                      items-center
                      justify-between
                      px-4
                      py-3
                      rounded-xl
                      font-semibold
                      hover:bg-blue-500
                      transition
                    "
                  >
                    <span>Mon espace</span>

                    <span className="text-sm">
                      {activeMenu === "espace"
                        ? "Fermer"
                        : "Ouvrir"}
                    </span>
                  </button>

                  {activeMenu === "espace" && (
                    <div className="ml-4 border-l-2 border-blue-400 pl-3">
                      <Link
                        to="/profil"
                        onClick={closeMenus}
                        className="
                          block
                          px-4
                          py-3
                          rounded-lg
                          hover:bg-blue-500
                          transition
                        "
                      >
                        <span>Mon profil</span>
                      </Link>
                    </div>
                  )}
                </>
              )}

              {/* DÉCONNEXION */}

              {token && (
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    text-left
                    px-4
                    py-3
                    mt-2
                    rounded-xl
                    bg-white
                    text-blue-600
                    font-bold
                    hover:bg-blue-50
                    transition
                  "
                >
                  Déconnexion
                </button>
              )}

              {/* CONNEXION / INSCRIPTION */}

              {!token && (
                <div className="flex flex-col gap-2 mt-2">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="
                      px-4
                      py-3
                      rounded-xl
                      bg-white
                      text-blue-600
                      font-bold
                      text-center
                    "
                  >
                    Connexion
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenus}
                    className="
                      px-4
                      py-3
                      rounded-xl
                      border
                      border-white
                      text-white
                      font-bold
                      text-center
                    "
                  >
                    Inscription
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;