import { useState } from 'react';
import cravingsData from '../cravingsData.json';

const CravingsCheckBox = () => {
    const [selected, setSelected] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value } = e.target;
        if (e.target.checked) {
            setSelected([...selected, value]);
        } else {
            setSelected(selected.filter((item) => item !== value));
        }
    };

    return (
        <div className='grid grid-cols-3 overflow-y-scroll h-40 border rounded border-black p-2'>
                {Object.entries(cravingsData).map(([alias, craving]) => (
                    <div key={alias} className="form-check form-check-inline">
                        <input className="form-check-input appearance-none h-4 w-4 border border-black rounded-sm bg-white checked:bg-pink checked:border-green focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" id={alias} value={alias} onChange={handleCheckboxChange} />
                        <label className="form-check-label inline-block text-black text-sm" htmlFor={alias}>{craving}</label>
                    </div>
                ))}
        </div>
    )
};

export default CravingsCheckBox;