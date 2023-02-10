import { useSelector, useDispatch } from "react-redux";
import cravingsData from "../cravingsData.json";
import {
  addModalCraving,
  removeModalCraving,
  editCheckboxStates,
} from "../Redux/cravingsModalSlice";

const CravingsCheckBox = () => {
  const dispatch = useDispatch();
  const checkboxStates = useSelector(
    (state) => state.cravingsModal.checkboxStates
  );

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      dispatch(addModalCraving(value));
    } else {
      dispatch(removeModalCraving(value));
    }
    dispatch(editCheckboxStates(e.target.id));
  };

  return (
    <>
      <div className="grid grid-cols-3 overflow-y-scroll h-40 border rounded border-black p-2">
        {Object.entries(cravingsData).map(([alias, craving]) => (
          <div key={alias} className="form-check form-check-inline">
            <input
              className="form-check-input appearance-none h-4 w-4 border border-black rounded-sm bg-white checked:bg-pink checked:border-green focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              type="checkbox"
              id={alias}
              value={alias}
              checked={checkboxStates[alias] ? checkboxStates[alias] : false}
              onChange={handleCheckboxChange}
            />
            <label
              className="form-check-label inline-block text-black text-sm"
              htmlFor={alias}
            >
              {craving}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default CravingsCheckBox;
