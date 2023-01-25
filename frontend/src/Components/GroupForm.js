import Modal from "./Modal";
import { useState } from "react";

const GroupForm = () => {
    const [openModal, setOpenModal] = useState(false)


    return (
        <div className="h-screen justify-center font-worksans bg-yellow flex-col items-center">
            <h1 className="text-center pt-10 font-bold text-3xl">placeholder</h1>
            <form className="pt-5">
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        <label className="block tracking-wide text-black font-bold mb-2" htmlFor="groupName">
                            PLACEHOLDER
                            <input name="groupName" id="groupName" className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="PLACEHOLDER" />
                        </label>
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
                <div className="flex justify-center flex-wrap -mx-3 mb-6">
                    <div className="w-half px-3">
                        <label className="block tracking-wide text-black font-bold mb-2" htmlFor="address">
                            Address
                            <input name="address" id="address" className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder="Address" />
                        </label>
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
                    <button type="submit" className="shadow bg-pink hover:bg-dark-pink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default GroupForm;