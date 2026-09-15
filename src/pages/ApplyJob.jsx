import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ApplyJob = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const [message, setMessage] = useState("");

  const submitApplication = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {

      toast.error("Vous devez être connecté ❌");

      return;

    }

    try {

      await axios.post(
        "https://backend-emmt.onrender.com/api/applications",
        {
          offre: id,
          message
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Candidature envoyée ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {

      console.log(error);

      toast.error("Erreur lors de la candidature ❌");

    }

  };

  return (

    <div className="
      min-h-screen
      bg-gray-100
      px-4
      py-10
    ">

      <form
        onSubmit={submitApplication}
        className="
          bg-white
          shadow-xl
          rounded-2xl
          p-6
          md:p-8
          w-full
          max-w-2xl
          mx-auto
        "
      >

        {/* TITRE */}
        <div className="text-center mb-8">

          <h2 className="
            text-3xl
            md:text-4xl
            font-bold
            text-blue-600
          ">
            Postuler à cette offre 📩
          </h2>

          <p className="
            text-gray-500
            mt-2
          ">
            Présentez votre motivation au recruteur
          </p>

        </div>


        {/* MESSAGE */}
        <div className="mb-7">

          <label className="
            block
            text-gray-700
            font-semibold
            mb-2
          ">
            Message de motivation
          </label>

          <textarea
            placeholder="Expliquez pourquoi vous êtes la personne idéale pour ce poste..."
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              p-4
              h-44
              resize-none
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              transition
            "
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <p className="
            text-xs
            text-gray-400
            mt-2
          ">
            Présentez brièvement votre expérience, vos compétences et votre motivation.
          </p>

        </div>


        {/* BOUTON */}
        <button
          type="submit"
          className="
            w-full
            bg-green-600
            hover:bg-green-700
            text-white
            py-3.5
            rounded-xl
            font-semibold
            text-lg
            shadow-md
            hover:shadow-lg
            transition
          "
        >
          Envoyer ma candidature 📩
        </button>


        {/* RETOUR */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="
            w-full
            mt-3
            border
            border-gray-300
            text-gray-600
            hover:bg-gray-100
            py-3
            rounded-xl
            font-medium
            transition
          "
        >
          ← Retour à l'offre
        </button>

      </form>

    </div>

  );

};

export default ApplyJob;