import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";


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
  // create a function for the try again and put it in a useEffect that sets the restaurant name and location for the google pin
  return (
    <>
        {loading ? (
            <div className="flex items-center justify-center h-screen bg-yellow">
                <PacmanLoader />
            </div>
        ) : (
            <>
            <div>
                <div>
                    The Common Crave{finalGroup.final_cravings.length === 1 ? ` is... ${finalGroup.final_cravings[0]}`: "s are " + finalGroup.final_cravings.map(craving => (` ${craving}`))}
                </div>
                <div>
                    We recommend to visit: {finalGroup.finalRestaurants[finalGroup.restaurant_idx]["name"]}
                </div>
                <button onClick={tryAgainOnClick}>Try Again</button>
            </div>
            </>
        )}
    </>
    );
};

export default GroupResult;
