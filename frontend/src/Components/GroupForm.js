import { useState, useEffect } from "react";
import Modal from "./Modal";
import { useLocation } from 'react-router-dom';


const GroupForm = () => {
    const {state} = useLocation();
    // const [isNewGrouppp, setIsNewGrouppp] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [isLocated, setIsLocated] = useState(false)
    const [address, setAddress] = useState("")
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    const [groupName, setGroupName] = useState("");
    const [groupId, setGroupId] = useState("");
    const [name, setName] = useState("");
    const [cravings, setCravings] = useState([]);


    const getLocation = async () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setIsLocated(true)
            }
            , () => {
                setStatus("Please allow the use of location services.");
            }) 
            console.log("status", status)
        }
    }

    useEffect(() => {
        if (lat) {
            getCityFromLatLon()
        }

        async function getCityFromLatLon() {
            let res = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=postal_code&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`)
            if (!res.ok) {
                throw new Error('Location fetch was not okay')
            }
            let data = await res.json()
            setAddress(data.results[0].formatted_address)
        }
    }, [lat,lng]);

    const checkedCravings = cravings.length 
        ? cravings.reduce((total, item) => {
            return total + ", " + item;
        })
        : "";




    return (
        <div className="h-screen justify-center font-worksans bg-yellow flex-col items-center">
            <h1 className="text-center pt-10 font-bold text-3xl">
                {state.isNewGroup ? 'Start Group' : 'Join Group'}
            </h1>
            <form className="pt-5">
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        {state.isNewGroup ? <label className="block tracking-wide text-black font-bold mb-2" htmlFor="groupName">
                            Group Name
                            <input name="groupName" id="groupName" value={groupName} onChange={(e) => {setGroupName(e.target.value)}} className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Group Name" />
                        </label> : <label className="block tracking-wide text-black font-bold mb-2" htmlFor="groupId">
                            Group ID
                            <input name="groupId" id="groupId" value={groupId} onChange={(e) => {setGroupId(e.target.value)}} className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Group ID" />
                        </label>}
                    </div>
                </div>
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        <label className="block tracking-wide text-black font-bold mb-2" htmlFor="name">
                            Name
                            <input name="name" id="name" value={name} onChange={(e) => {setName(e.target.value)}}  className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Name" />
                        </label>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap -mx-3">
                    <div className="w-half px-3">
                        <label className="block tracking-wide text-black font-bold" htmlFor="address">
                            Address
                        {isLocated ? 
                            <input name="address" id="address" disabled value={address} onChange={(e) => {setAddress(e.target.value)}} className="appearance-none block w-full bg-white text-black border border-green rounded py-3 mb-12 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Address"/>
                            : <><input name="address" id="address" value={address} onChange={(e) => {setAddress(e.target.value)}} className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Address"/> <button type="button" className="mb-6 hover:text-pink" id="location" onClick={getLocation}>Locate Me</button> </>}
                        </label>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        <label htmlFor="cravings" className="max-w-sm">
                            Cravings: {checkedCravings} <br></br> </label>
                        <button type="button" onClick={() => setOpenModal(true)} className="shadow bg-pink hover:bg-dark-pink focus:shadow-outline focus:outline-none text-white text-sm py-1 px-2 rounded">Select Cravings</button>
                        <Modal open={openModal} onClose={() => setOpenModal(false)} setCravings={setCravings} />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="shadow bg-pink hover:bg-dark-pink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">
                        {state.isNewGroup ? 'Create' : 'Join'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GroupForm;