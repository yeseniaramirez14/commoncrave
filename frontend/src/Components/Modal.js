import React, { useRef } from 'react'
import { createPortal }  from 'react-dom'

const Modal = ({open, onClose}) => {
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
                        <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
                                
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
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-black text-lg leading-relaxed">
                            This is where our cravings list will be 
                        </p>
                        </div>

                        {/*fetch cravings*/}
                        <div className="relative p-6 flex-auto">
                        <p className="my-4 text-black text-lg leading-relaxed">
                            I'm craving a specific restaurant's type of food 
                        </p>
                        <input className="appearance-none block w-full bg-white text-black border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="text" placeholder='Restaurant name'></input>
                        <button
                                className="bg-pink text-white active:bg-dark-pink font-bold uppercase text-sm px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                            >
                                Search
                            </button>
                        </div>
                    
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
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

export default Modal