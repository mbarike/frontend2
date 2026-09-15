import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const API = "https://backend-emmt.onrender.com";


export default function Register(){


  const navigate = useNavigate();


  const [form,setForm] = useState({

    prenom:"",
    nom:"",
    email:"",
    password:"",
    role:"candidat"

  });



  const handleSubmit = async()=>{


    try{


      console.log("DONNEES ENVOYEES :", form);


      const res = await axios.post(
        `${API}/api/auth/register`,
        form
      );


      console.log("REPONSE BACKEND :", res.data);


      toast.success("Inscription réussie ✅");


      navigate("/login");


    }

    catch(error){


      console.log(
        "ERREUR BACKEND :",
        error.response?.data || error.message
      );


      toast.error(
        error.response?.data?.message ||
        "Erreur inscription ❌"
      );


    }


  };





  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
      justify-center
      items-center
      p-6
    ">


      <div className="
        bg-white
        max-w-md
        w-full
        shadow-xl
        rounded-2xl
        p-8
      ">



        <h2 className="
          text-3xl
          font-bold
          text-blue-600
          text-center
          mb-6
        ">

          Créer un compte 🚀

        </h2>





        <input

          placeholder="Prénom"

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-4
          "

          value={form.prenom}

          onChange={
            e=>setForm({
              ...form,
              prenom:e.target.value
            })
          }

        />





        <input

          placeholder="Nom"

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-4
          "

          value={form.nom}

          onChange={
            e=>setForm({
              ...form,
              nom:e.target.value
            })
          }

        />





        <input

          placeholder="Email"

          type="email"

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-4
          "

          value={form.email}

          onChange={
            e=>setForm({
              ...form,
              email:e.target.value
            })
          }

        />





        <input

          placeholder="Mot de passe"

          type="password"

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-4
          "

          value={form.password}

          onChange={
            e=>setForm({
              ...form,
              password:e.target.value
            })
          }

        />





        {/* CHOIX DU ROLE */}

        <label className="
          block
          mb-2
          font-semibold
        ">

          Type de compte

        </label>



        <select

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-6
          "

          value={form.role}

          onChange={
            e=>setForm({
              ...form,
              role:e.target.value
            })
          }

        >


          <option value="candidat">

            👨‍💻 Candidat

          </option>


          <option value="recruteur">

            💼 Recruteur

          </option>


        </select>





        <button

          onClick={handleSubmit}

          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-lg
            font-semibold
          "

        >

          S'inscrire

        </button>




      </div>


    </div>

  );


}