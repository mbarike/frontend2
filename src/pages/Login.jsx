import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const API = "https://backend-emmt.onrender.com";


export default function Login() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");


  const handleLogin = async () => {

    try {

      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });


      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("role", res.data.user.role);


     toast.success("Connexion réussie ✅");

      navigate("/");


    } catch (err) {

      toast.error("Email ou mot de passe incorrect ❌");

    }

  };



  return (

    <div className="
      min-h-screen
      bg-gray-100
      flex
      items-center
      justify-center
      p-6
    ">


      <div className="
        bg-white
        w-full
        max-w-md
        rounded-2xl
        shadow-xl
        p-8
      ">


        <h2 className="
          text-3xl
          font-bold
          text-center
          text-blue-600
          mb-6
        ">
          Connexion 🚀
        </h2>



        <input

          type="email"

          placeholder="Email"

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-4
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "

          onChange={(e)=>setEmail(e.target.value)}

        />



        <input

          type="password"

          placeholder="Mot de passe"

          className="
            w-full
            border
            rounded-lg
            px-4
            py-3
            mb-6
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
          "

          onChange={(e)=>setPassword(e.target.value)}

        />



        <button

          onClick={handleLogin}

          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-lg
            font-semibold
            transition
          "

        >

          Se connecter

        </button>


      </div>


    </div>

  );

}