import { useState } from "react";
import Modal from "./Modal";
import { useLocation } from 'react-router-dom';


const GroupForm = () => {
    const {state} = useLocation();
    const [openModal, setOpenModal] = useState(false)
    const [isLocated, setIsLocated] = useState(false)
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);


    // install dotenv webpack 
    // npm install dotenv-webpack --save-dev


    const getLocation = async () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                setIsLocated(true);
            }
            , () => {
                setStatus("Unable to retrieve your location");
            }) 
            if (isLocated) {
                const res = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}`
                );
                if (!res.ok) {
                    throw new Error('Location fetch was not okay')
                }
                console.log("RESSSS HEREEEE", res.json())
                return res.json();
            }
        }
    }


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
                            <input name="groupName" id="groupName" className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Group Name" />
                        </label> : <label className="block tracking-wide text-black font-bold mb-2" htmlFor="groupId">
                            Group ID
                            <input name="groupId" id="groupId" className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Group ID" />
                        </label>}
                    </div>
                </div>
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        <label className="block tracking-wide text-black font-bold mb-2" htmlFor="name">
                            Name
                            <input name="name" id="name" className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Name" />
                        </label>
                    </div>
                </div>
                <div className="flex justify-center flex-wrap -mx-3">
                    <div className="w-half px-3">
                        <label className="block tracking-wide text-black font-bold" htmlFor="address">
                            Address
                            <input name="address" id="address" className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Address" />
                        </label>
                        <button type="button" className="mb-6 hover:text-pink" id="location" onClick={getLocation}>Locate Me</button>
                        {/* <p>{status}</p>
                        {lat && <p>Latitude: {lat}</p>}
                        {lng && <p>Longitude: {lng}</p>} */}
                    </div>
                </div>
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        <label htmlFor="cravings">
                            Cravings
                            <button type="button" onClick={() => setOpenModal(true)}>Select Cravings</button>
                            <Modal open={openModal} onClose={() => setOpenModal(false)}/>
                        </label>
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