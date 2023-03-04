import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import GoogleMapComponent from "../Components/GoogleMapComponent";
import cravingsData from "../cravingsData.json"



const GroupResult = () => {
    const [nothing, setNothing ] = useState(0)
    const { id } = useParams();
    const [ finalGroup, setFinalGroup ] = useState(null)
    const [loading, setLoading] = useState(true);
    const fetchedRef = useRef(false)


    useEffect(() => {
        // make sure useEffect only runs once on page load
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        getFinalRestaurants()
        setLoading(false)
    },[])

    const getFinalRestaurants = async () => {
        const data = await fetch(`${process.env.REACT_APP_API_HOST}/api/group/${id}`)
        if (!data.ok){
            throw new Error("could not fetch restaurant from group")
        }
        let group = await data.json();
        setFinalGroup(group.group)
    }

    const tryAgainOnClick = async () => {
        let currentidx = finalGroup.restaurant_idx
        console.log("currentidx", currentidx)
        console.log("restaurant array length", finalGroup.finalRestaurants.length )

        if (currentidx > finalGroup.finalRestaurants.length-2){
            currentidx = -1
        }
        const data = await fetch(`${process.env.REACT_APP_API_HOST}/api/updateidx/${id}`,
            {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({idx: currentidx + 1}),
            })
        if (!data) {
            throw new Error("Could not update idx")
        } else {
            getFinalRestaurants()  
            setNothing(nothing+1)
        }
    }

    useEffect(()=>{
        
    },[nothing])

    console.log("final",finalGroup)
   if (!finalGroup) {
    return(
        <div className="flex items-center justify-center h-screen bg-yellow">
            <PacmanLoader />
        </div>
    )
   }

   return (
        <>
            <div className="flex flex-col items-center h-screen bg-yellow">
                <div className="mt-20 h-20 flex flex-row items-center text-3xl font-semibold">
                    The Common Crave{finalGroup.final_cravings.length === 1 ? ` is...`: "s are "}
                </div>
                <div className="h-32 flex flex-row items-center text-4xl font-bold">
                    {finalGroup.final_cravings.length === 1 ? `${finalGroup.final_cravings[0]}` : finalGroup.final_cravings.map( (craving,index) => {return(<span key={index}>{cravingsData[craving]}{index < finalGroup.final_cravings.length - 1 ? ",\u00A0" : " " }</span>)})}
                </div>
                <GoogleMapComponent 
                    lat={finalGroup.finalRestaurants[finalGroup.restaurant_idx]["coordinates"]["latitude"]}
                    lon={finalGroup.finalRestaurants[finalGroup.restaurant_idx]["coordinates"]["longitude"]}
                />
                <div className="mt-10 h-10 flex flex-row items-center text-3xl font-semibold">
                    We recommend to visit:
                </div>
                <div className="mt-10 mb-10 h-10 flex flex-row items-center text-3xl font-bold">
                    <a href={`${finalGroup.finalRestaurants[finalGroup.restaurant_idx]["url"]}`}>{finalGroup.finalRestaurants[finalGroup.restaurant_idx]["name"]}</a>
                </div>
                <button onClick={tryAgainOnClick} className="w-50 bg-white tracking-wide text-green font-bold rounded border-b-2 border-green hover:border-green hover:bg-light-pink hover:text-green shadow-md py-2 px-6 inline-flex items-center">Try Again</button>
            </div>
        </>
    );
};

export default GroupResult;
