import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {

  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [role, setRole] = useState("candidat");

  const [telephone, setTelephone] = useState("");
  const [localisation, setLocalisation] = useState("");

  // Candidat
  const [competences, setCompetences] = useState("");
  const [description, setDescription] = useState("");

  // Recruteur
  const [entreprise, setEntreprise] = useState("");
  const [secteur, setSecteur] = useState("");

  // CV
  const [cv, setCv] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("token");

  const URL = "https://backend-emmt.onrender.com";


  // ===============================
  // CHARGER LE PROFIL
  // ===============================

  const getProfile = async () => {

    try {

      const res = await axios.get(
        `${URL}/api/users/profil`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const u = res.data;

      setPrenom(u.prenom || "");
      setNom(u.nom || "");
      setEmail(u.email || "");
      setPhoto(u.photo || "");
      setRole(u.role || "candidat");

      setTelephone(u.telephone || "");
      setLocalisation(u.localisation || "");

      setCompetences(
        Array.isArray(u.competences)
          ? u.competences.join(", ")
          : ""
      );

      setDescription(u.description || "");

      setEntreprise(u.entreprise || "");
      setSecteur(u.secteur || "");

      setCv(u.cv || "");

    } catch (error) {

      console.error(error);

      toast.error("Erreur chargement profil ❌");

    } finally {

      setLoading(false);

    }

  };


  // ===============================
  // MODIFIER LE PROFIL
  // ===============================

  const updateProfile = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await axios.put(
        `${URL}/api/users/profil`,
        {
          prenom,
          nom,
          email,
          photo,
          telephone,
          localisation,

          competences: competences
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c !== ""),

          description,
          entreprise,
          secteur,
          cv,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Profil modifié avec succès ✅");

      await getProfile();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Erreur modification ❌"
      );

    } finally {

      setSaving(false);

    }

  };


  // ===============================
  // CHARGEMENT
  // ===============================

  useEffect(() => {

    getProfile();

  }, []);


  // ===============================
  // CHARGEMENT VISUEL
  // ===============================

  if (loading) {

    return (

      <div className="
        min-h-screen
        bg-gray-100
        flex
        items-center
        justify-center
        px-4
      ">

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          px-10
          py-8
          text-center
        ">

          <div className="
            text-5xl
            mb-4
          ">
            👤
          </div>

          <p className="
            text-gray-500
            font-medium
          ">
            Chargement de votre profil...
          </p>

        </div>

      </div>

    );

  }


  return (

    <div className="
      min-h-screen
      bg-gray-100
      px-4
      py-10
      md:py-14
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">


        {/* ================================================= */}
        {/* EN-TÊTE DU PROFIL */}
        {/* ================================================= */}

        <div className="
          relative
          overflow-hidden
          bg-gradient-to-r
          from-blue-600
          to-blue-800
          rounded-t-3xl
          px-6
          py-10
          md:px-10
          md:py-12
          text-white
        ">

          {/* Décorations */}

          <div className="
            absolute
            -right-16
            -top-16
            w-48
            h-48
            bg-white
            opacity-10
            rounded-full
          " />

          <div className="
            absolute
            -left-20
            -bottom-24
            w-56
            h-56
            bg-blue-400
            opacity-20
            rounded-full
          " />


          <div className="
            relative
            flex
            flex-col
            md:flex-row
            items-center
            gap-6
          ">


            {/* PHOTO */}

            <div className="
              flex-shrink-0
            ">

              {photo ? (

                <img
                  src={photo}
                  alt="Photo de profil"
                  className="
                    w-32
                    h-32
                    md:w-36
                    md:h-36
                    rounded-full
                    object-cover
                    border-4
                    border-white
                    shadow-2xl
                  "
                />

              ) : (

                <div className="
                  w-32
                  h-32
                  md:w-36
                  md:h-36
                  rounded-full
                  bg-white
                  text-blue-600
                  flex
                  items-center
                  justify-center
                  text-5xl
                  font-bold
                  border-4
                  border-white
                  shadow-2xl
                ">

                  {prenom?.charAt(0)?.toUpperCase() || "U"}

                </div>

              )}

            </div>


            {/* INFORMATIONS */}

            <div className="
              text-center
              md:text-left
            ">

              <p className="
                text-blue-200
                text-sm
                font-semibold
                uppercase
                tracking-wider
                mb-2
              ">
                Mon espace professionnel
              </p>


              <h1 className="
                text-3xl
                md:text-4xl
                font-bold
              ">

                {prenom} {nom}

              </h1>


              <p className="
                text-blue-100
                mt-2
                text-base
              ">

                📧 {email}

              </p>


              <span className="
                inline-flex
                items-center
                mt-4
                px-4
                py-2
                bg-white
                text-blue-700
                rounded-full
                font-bold
                text-sm
                shadow-sm
              ">

                {role === "candidat"
                  ? "👨‍💻 Candidat"
                  : "💼 Recruteur"
                }

              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CONTENU */}
        {/* ================================================= */}

        <div className="
          bg-white
          rounded-b-3xl
          shadow-xl
          border
          border-gray-100
          p-6
          md:p-10
        ">


          <form
            onSubmit={updateProfile}
            className="
              space-y-10
            "
          >


            {/* ================================================= */}
            {/* INFORMATIONS PERSONNELLES */}
            {/* ================================================= */}

            <section>

              <div className="
                flex
                items-center
                gap-3
                mb-6
              ">

                <div className="
                  w-11
                  h-11
                  bg-blue-50
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                ">
                  👤
                </div>


                <div>

                  <h2 className="
                    text-xl
                    md:text-2xl
                    font-bold
                    text-gray-800
                  ">
                    Informations personnelles
                  </h2>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    Gérez vos informations personnelles.
                  </p>

                </div>

              </div>


              <div className="
                grid
                md:grid-cols-2
                gap-5
              ">


                {/* PRÉNOM */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  ">
                    Prénom
                  </label>

                  <input
                    type="text"
                    value={prenom}
                    onChange={(e) =>
                      setPrenom(e.target.value)
                    }
                    placeholder="Votre prénom"
                    className="
                      w-full
                      bg-gray-50
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3.5
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      transition
                    "
                  />

                </div>


                {/* NOM */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  ">
                    Nom
                  </label>

                  <input
                    type="text"
                    value={nom}
                    onChange={(e) =>
                      setNom(e.target.value)
                    }
                    placeholder="Votre nom"
                    className="
                      w-full
                      bg-gray-50
                      border
                      border-gray-200
                      rounded-xl
                      px-4
                      py-3.5
                      outline-none
                      focus:bg-white
                      focus:border-blue-500
                      focus:ring-4
                      focus:ring-blue-100
                      transition
                    "
                  />

                </div>


                {/* EMAIL */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  ">
                    Adresse email
                  </label>

                  <div className="relative">

                    <span className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                    ">
                      📧
                    </span>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Votre email"
                      className="
                        w-full
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-xl
                        pl-12
                        pr-4
                        py-3.5
                        outline-none
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        transition
                      "
                    />

                  </div>

                </div>


                {/* TÉLÉPHONE */}

                <div>

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  ">
                    Téléphone
                  </label>

                  <div className="relative">

                    <span className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                    ">
                      📱
                    </span>

                    <input
                      type="text"
                      value={telephone}
                      onChange={(e) =>
                        setTelephone(e.target.value)
                      }
                      placeholder="Votre numéro de téléphone"
                      className="
                        w-full
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-xl
                        pl-12
                        pr-4
                        py-3.5
                        outline-none
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        transition
                      "
                    />

                  </div>

                </div>


                {/* LOCALISATION */}

                <div className="md:col-span-2">

                  <label className="
                    block
                    text-sm
                    font-semibold
                    text-gray-700
                    mb-2
                  ">
                    Localisation
                  </label>

                  <div className="relative">

                    <span className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                    ">
                      📍
                    </span>

                    <input
                      type="text"
                      value={localisation}
                      onChange={(e) =>
                        setLocalisation(e.target.value)
                      }
                      placeholder="Ex : Dakar, Sénégal"
                      className="
                        w-full
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-xl
                        pl-12
                        pr-4
                        py-3.5
                        outline-none
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        transition
                      "
                    />

                  </div>

                </div>

              </div>

            </section>


            {/* ================================================= */}
            {/* PHOTO */}
            {/* ================================================= */}

            <section className="
              border-t
              border-gray-100
              pt-8
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
                  bg-purple-50
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  text-xl
                ">
                  📷
                </div>

                <div>

                  <h2 className="
                    text-xl
                    font-bold
                    text-gray-800
                  ">
                    Photo de profil
                  </h2>

                  <p className="
                    text-sm
                    text-gray-500
                  ">
                    Ajoutez une photo professionnelle.
                  </p>

                </div>

              </div>


              <div className="
                bg-gray-50
                border
                border-dashed
                border-gray-300
                rounded-2xl
                p-6
              ">

                <div className="
                  flex
                  flex-col
                  md:flex-row
                  items-center
                  gap-5
                ">


                  {photo ? (

                    <img
                      src={photo}
                      alt="Aperçu"
                      className="
                        w-24
                        h-24
                        rounded-full
                        object-cover
                        border-4
                        border-white
                        shadow-md
                      "
                    />

                  ) : (

                    <div className="
                      w-24
                      h-24
                      rounded-full
                      bg-blue-100
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      text-3xl
                      font-bold
                    ">

                      {prenom?.charAt(0)?.toUpperCase() || "U"}

                    </div>

                  )}


                  <div className="flex-1 text-center md:text-left">

                    <p className="
                      font-semibold
                      text-gray-800
                    ">
                      Modifier votre photo
                    </p>

                    <p className="
                      text-sm
                      text-gray-500
                      mt-1
                      mb-4
                    ">
                      JPG, PNG ou autre image.
                    </p>


                    <input
                      type="file"
                      accept="image/*"
                      className="
                        w-full
                        max-w-md
                        text-sm
                        text-gray-600
                        file:mr-4
                        file:py-2.5
                        file:px-4
                        file:rounded-lg
                        file:border-0
                        file:bg-blue-600
                        file:text-white
                        file:font-semibold
                        hover:file:bg-blue-700
                        file:cursor-pointer
                      "
                      onChange={async (e) => {

                        const file = e.target.files[0];

                        if (!file) return;

                        const formData = new FormData();

                        formData.append("photo", file);

                        try {

                          const res = await axios.post(
                            `${URL}/api/users/upload-photo`,
                            formData,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          );

                          setPhoto(res.data.url);

                          toast.success(
                            "Photo uploadée avec succès ✅"
                          );

                        } catch (error) {

                          console.error(error);

                          toast.error(
                            "Erreur upload photo ❌"
                          );

                        }

                      }}
                    />

                  </div>

                </div>

              </div>

            </section>

{/* ================================================= */}
{/* TYPE DE COMPTE */}
{/* ================================================= */}

<section className="
  border-t
  border-gray-100
  pt-8
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
      bg-green-50
      rounded-xl
      flex
      items-center
      justify-center
      text-xl
    ">
      🎯
    </div>

    <div>

      <h2 className="
        text-xl
        font-bold
        text-gray-800
      ">
        Type de compte
      </h2>

      <p className="
        text-sm
        text-gray-500
      ">
        Le type de compte a été défini lors de votre inscription.
      </p>

    </div>

  </div>


  {/* AFFICHAGE DU RÔLE */}

  <div className="
    w-full
    bg-gray-50
    border
    border-gray-200
    rounded-xl
    px-5
    py-4
    flex
    items-center
    justify-between
  ">

    <div className="
      flex
      items-center
      gap-4
    ">

      <div className="
        w-11
        h-11
        bg-white
        rounded-xl
        flex
        items-center
        justify-center
        text-xl
        shadow-sm
      ">
        {role === "candidat" ? "👨‍💻" : "💼"}
      </div>

      <div>

        <p className="
          text-xs
          text-gray-400
          font-medium
          uppercase
          tracking-wide
        ">
          Votre rôle
        </p>

        <p className="
          text-lg
          font-bold
          text-gray-800
          mt-1
        ">
          {role === "candidat"
            ? "Candidat"
            : "Recruteur"
          }
        </p>

      </div>

    </div>


    <span className="
      px-4
      py-2
      bg-blue-100
      text-blue-700
      rounded-full
      text-sm
      font-semibold
    ">
      {role === "candidat"
        ? "👨‍💻 Candidat"
        : "💼 Recruteur"
      }
    </span>

  </div>


  <p className="
    text-xs
    text-gray-400
    mt-3
  ">
    🔒 Ce choix ne peut pas être modifié depuis le profil.
  </p>

</section>


            {/* ================================================= */}
            {/* CANDIDAT */}
            {/* ================================================= */}

            {role === "candidat" && (

              <section className="
                border-t
                border-gray-100
                pt-8
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                  mb-6
                ">

                  <div className="
                    w-11
                    h-11
                    bg-blue-50
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">
                    👨‍💻
                  </div>

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-gray-800
                    ">
                      Profil candidat
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      Présentez votre expérience et vos compétences.
                    </p>

                  </div>

                </div>


                <div className="space-y-5">


                  {/* COMPÉTENCES */}

                  <div>

                    <label className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
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
                      placeholder="React, Node.js, MongoDB..."
                      className="
                        w-full
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-xl
                        px-4
                        py-3.5
                        outline-none
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
                      💡 Séparez les compétences par des virgules.
                    </p>

                  </div>


                  {/* DESCRIPTION */}

                  <div>

                    <label className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    ">
                      Présentation professionnelle
                    </label>

                    <textarea
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }
                      placeholder="Présentez-vous, votre expérience, vos objectifs..."
                      rows="6"
                      className="
                        w-full
                        bg-gray-50
                        border
                        border-gray-200
                        rounded-xl
                        px-4
                        py-3.5
                        outline-none
                        resize-none
                        focus:bg-white
                        focus:border-blue-500
                        focus:ring-4
                        focus:ring-blue-100
                        transition
                      "
                    />

                  </div>

                </div>

              </section>

            )}


            {/* ================================================= */}
            {/* RECRUTEUR */}
            {/* ================================================= */}

            {role === "recruteur" && (

              <section className="
                border-t
                border-gray-100
                pt-8
              ">

                <div className="
                  flex
                  items-center
                  gap-3
                  mb-6
                ">

                  <div className="
                    w-11
                    h-11
                    bg-orange-50
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">
                    🏢
                  </div>

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-gray-800
                    ">
                      Profil entreprise
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      Présentez votre entreprise aux candidats.
                    </p>

                  </div>

                </div>


                <div className="
                  grid
                  md:grid-cols-2
                  gap-5
                ">


                  {/* ENTREPRISE */}

                  <div>

                    <label className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    ">
                      Nom de l'entreprise
                    </label>

                    <div className="relative">

                      <span className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                      ">
                        🏢
                      </span>

                      <input
                        type="text"
                        value={entreprise}
                        onChange={(e) =>
                          setEntreprise(e.target.value)
                        }
                        placeholder="Nom de votre entreprise"
                        className="
                          w-full
                          bg-gray-50
                          border
                          border-gray-200
                          rounded-xl
                          pl-12
                          pr-4
                          py-3.5
                          outline-none
                          focus:bg-white
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-100
                          transition
                        "
                      />

                    </div>

                  </div>


                  {/* SECTEUR */}

                  <div>

                    <label className="
                      block
                      text-sm
                      font-semibold
                      text-gray-700
                      mb-2
                    ">
                      Secteur d'activité
                    </label>

                    <div className="relative">

                      <span className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                      ">
                        📊
                      </span>

                      <input
                        type="text"
                        value={secteur}
                        onChange={(e) =>
                          setSecteur(e.target.value)
                        }
                        placeholder="Ex : Informatique"
                        className="
                          w-full
                          bg-gray-50
                          border
                          border-gray-200
                          rounded-xl
                          pl-12
                          pr-4
                          py-3.5
                          outline-none
                          focus:bg-white
                          focus:border-blue-500
                          focus:ring-4
                          focus:ring-blue-100
                          transition
                        "
                      />

                    </div>

                  </div>

                </div>

              </section>

            )}


            {/* ================================================= */}
            {/* CV */}
            {/* ================================================= */}

            {role === "candidat" && (

              <section className="
                border-t
                border-gray-100
                pt-8
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
                    bg-red-50
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-xl
                  ">
                    📄
                  </div>

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-gray-800
                    ">
                      Mon CV
                    </h2>

                    <p className="
                      text-sm
                      text-gray-500
                    ">
                      Ajoutez votre CV pour permettre aux recruteurs de le consulter.
                    </p>

                  </div>

                </div>


                <div className="
                  bg-gray-50
                  border
                  border-dashed
                  border-gray-300
                  rounded-2xl
                  p-6
                ">

                  <input
                    type="file"
                    accept=".pdf"
                    className="
                      w-full
                      text-sm
                      text-gray-600
                      file:mr-4
                      file:py-2.5
                      file:px-4
                      file:rounded-lg
                      file:border-0
                      file:bg-blue-600
                      file:text-white
                      file:font-semibold
                      hover:file:bg-blue-700
                      file:cursor-pointer
                    "
                    onChange={async (e) => {

                      const file = e.target.files[0];

                      if (!file) return;

                      const formData = new FormData();

                      formData.append("cv", file);

                      try {

                        const res = await axios.post(
                          `${URL}/api/users/upload-cv`,
                          formData,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        );

                        setCv(res.data.url);

                        toast.success(
                          "CV uploadé avec succès ✅"
                        );

                      } catch (error) {

                        console.error(error);

                        toast.error(
                          "Erreur upload CV ❌"
                        );

                      }

                    }}
                  />


                  {cv && (

                    <div className="
                      mt-5
                      flex
                      items-center
                      justify-between
                      gap-4
                      bg-white
                      border
                      border-gray-200
                      rounded-xl
                      p-4
                    ">

                      <div className="
                        flex
                        items-center
                        gap-3
                      ">

                        <div className="
                          w-10
                          h-10
                          bg-red-50
                          rounded-lg
                          flex
                          items-center
                          justify-center
                        ">
                          📄
                        </div>

                        <div>

                          <p className="
                            font-semibold
                            text-gray-800
                          ">
                            CV disponible
                          </p>

                          <p className="
                            text-xs
                            text-gray-400
                          ">
                            Document PDF
                          </p>

                        </div>

                      </div>


                      <a
                        href={cv}
                        target="_blank"
                        rel="noreferrer"
                        className="
                          bg-blue-50
                          text-blue-600
                          hover:bg-blue-100
                          px-4
                          py-2
                          rounded-lg
                          font-semibold
                          text-sm
                          transition
                          whitespace-nowrap
                        "
                      >
                        📄 Voir mon CV
                      </a>

                    </div>

                  )}

                </div>

              </section>

            )}


            {/* ================================================= */}
            {/* BOUTON ENREGISTRER */}
            {/* ================================================= */}

            <div className="
              border-t
              border-gray-100
              pt-8
            ">

              <button
                type="submit"
                disabled={saving}
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  disabled:bg-blue-400
                  text-white
                  py-4
                  rounded-xl
                  font-bold
                  text-lg
                  shadow-md
                  hover:shadow-lg
                  transition
                  flex
                  items-center
                  justify-center
                  gap-2
                "
              >

                {saving ? (

                  <>
                    <span className="animate-spin">
                      ⏳
                    </span>

                    Enregistrement...

                  </>

                ) : (

                  <>
                    💾 Enregistrer les modifications
                  </>

                )}

              </button>


              <p className="
                text-center
                text-xs
                text-gray-400
                mt-3
              ">
                Vos informations seront mises à jour immédiatement.
              </p>

            </div>


          </form>

        </div>

      </div>

    </div>

  );

};

export default Profile;