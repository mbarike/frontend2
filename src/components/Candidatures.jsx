import { useEffect, useState } from "react";
import axios from "axios";

const Candidatures = ({ offreId }) => {

  const [candidatures, setCandidatures] = useState([]);

  const token = localStorage.getItem("token");


  const fetchCandidatures = async () => {

    try {

      const res = await axios.get(
        `http://localhost:3000/api/applications/offre/${offreId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setCandidatures(res.data);


    } catch(error){

      console.log(error.response?.data || error.message);

    }

  };



  const changeStatut = async (id, statut) => {

    try {

      await axios.put(
        `http://localhost:3000/api/applications/${id}/statut`,
        {
          statut
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );


      fetchCandidatures();


    } catch(error){

      console.log(error.response?.data || error.message);

    }

  };



  useEffect(()=>{

    fetchCandidatures();

  },[offreId]);



  return (

    <div>

      <h2 className="
        text-2xl
        font-bold
        text-blue-600
        mb-5
      ">
        👥 Candidatures reçues
      </h2>



      {
        candidatures.length === 0 && (

          <div className="
            bg-gray-100
            rounded-xl
            p-5
            text-center
            text-gray-500
          ">
            Aucune candidature pour cette offre
          </div>

        )
      }



      <div className="space-y-4">


      {
        candidatures.map((candidature)=>(


          <div
            key={candidature._id}
            className="
              border
              rounded-xl
              p-5
              bg-gray-50
              hover:shadow-md
              transition
            "
          >


            <div className="mb-3">

              <h3 className="
                text-xl
                font-semibold
                text-gray-800
              ">
                {candidature.candidat?.prenom}
                {" "}
                {candidature.candidat?.nom}
              </h3>


              <p className="text-gray-600">
                📧 {candidature.candidat?.email}
              </p>

            </div>



            <div className="
              bg-white
              rounded-lg
              p-3
              mb-4
            ">

              <p className="text-gray-700">
                💬 {candidature.message}
              </p>

            </div>




            <div className="flex items-center justify-between">


              <span
                className={`
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  font-semibold

                  ${
                    candidature.statut === "Acceptée"
                    ? "bg-green-100 text-green-700"
                    :
                    candidature.statut === "Refusée"
                    ? "bg-red-100 text-red-700"
                    :
                    "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {candidature.statut}
              </span>





              <div className="flex gap-2">


                <button
                  onClick={()=>changeStatut(
                    candidature._id,
                    "Acceptée"
                  )}
                  className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  ✅ Accepter
                </button>



                <button
                  onClick={()=>changeStatut(
                    candidature._id,
                    "Refusée"
                  )}
                  className="
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                  "
                >
                  ❌ Refuser
                </button>


              </div>


            </div>


          </div>


        ))
      }


      </div>


    </div>

  );

};


export default Candidatures;