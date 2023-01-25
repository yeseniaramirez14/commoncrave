import React from 'react'

const Modal = ({open, onClose}) => {
    if(!open) return null
    return (
        <div>
            <div>
                Under Construction
                <div>
                    <p onClick={onClose}>X</p>
                </div>
                <div>
                    <button>
                        done
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal