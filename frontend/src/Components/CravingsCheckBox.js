import { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import cravingsData from "../cravingsData.json";
import { addCraving, removeCraving } from "../Redux/userSlice";

const CravingsCheckBox = ({ restaurantAlias }) => {
  // const [selected, setSelected] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const cravings = useSelector((state) => state.user.cravings);
  const dispatch = useDispatch();

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    if (e.target.checked) {
      dispatch(addCraving(value));
    } else {
      dispatch(removeCraving(value));
    }
    setCheckboxStates({
      ...checkboxStates,
      [e.target.id]: !checkboxStates[e.target.id],
    });
  };

  // adds restaurant alias from getAliasFromRestaurant, if it is not already in the selected cravings list
  const toggleCheckbox = (restaurantAlias) => {
    for (let alia in restaurantAlias.alias) {
      if (!cravings.includes(restaurantAlias.alias[alia])) {
        dispatch(addCraving(restaurantAlias.alias[alia]));
        // cravings.push(restaurantAlias.alias[alia]);
        checkboxStates[restaurantAlias.alias[alia]] = true;
        forceUpdate();
      }
    }
  };

  // useEffect(() => {
  //   setCheckedCravings(selected);
  // }, [selected]);

  useEffect(() => {
    toggleCheckbox(restaurantAlias);
  }, [restaurantAlias]);

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
