import React, { useState, useEffect } from 'react'
import { createPortal }  from 'react-dom'
import CravingsCheckBox from "./CravingsCheckBox";
// import get_alias_from_restaurant from '../External-Apis/yelp-api';


const Modal = ({open, onClose}) => {
    // const [restaurant, setRestaurant] = useState("")
    // const [alias, setAlias] = useState("")

    // async function getAliasFromRestaurant(restaurant) {
    //     const output = get_alias_from_restaurant(restaurant)
    //     setAlias(output)
    //     console.log("aliassssss", alias)
    // }



    // const modalRef = useRef();

    // const closeModal = (e) => {
    //     if (e.target === modalRef.current) {
    //         console.log("outside limits sir ")
    //     }
    //     else {
    //         console.log("INSIDE LIMITS")
    //     }
    // }

    if(!open) return null
    return createPortal(
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                        {/*header*/}
                        <div className='flex items-start justify-between p-5'>
                                
                            <h3 className='text-3xl font-semibold'> What are you craving? </h3>
                            <button
                                className="p-1 ml-auto text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={onClose}
                            >
                                <span className="text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                
                        {/*body*/}
                        <div className="relative px-6 flex-auto">
                            <CravingsCheckBox />
                        </div>

                        {/*fetch cravings*/}
                        <div className="relative p-6 pt-4 flex-auto">
                            <p className="text-black text-md leading-relaxed">
                                I'm craving a specific restaurant's type of food 
                            </p>
                            <input 
                                className="appearance-none block w-full bg-white text-black border border-green rounded p-2 mb-3 leading-tight focus:outline-none focus:bg-white" 
                                type="text" 
                                placeholder='Restaurant name' 
                                // onChange={(e) => {setRestaurant(e.target.value)}}
                            />
                            <button
                                className="bg-pink text-white active:bg-dark-pink font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                // onClick={() => getAliasFromRestaurant(restaurant)} 
                            >
                                Search
                            </button>
                            {/* <p>Restaurant: {restaurant}</p> */}
                        </div>
                    
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 pt-0">
                            <button
                                className="text-red bg-pink  active:bg-dark-pink font-bold uppercase px-6 py-3 rounded shadow text-sm outline-none hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={onClose}
                            >
                                Close
                            </button>
                            <button
                                className="bg-pink text-white active:bg-dark-pink font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>,
        document.getElementById('modal')
    )
}

export default Modal;