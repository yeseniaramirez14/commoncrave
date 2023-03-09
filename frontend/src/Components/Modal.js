import { React, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import CravingsCheckBox from "./CravingsCheckBox";
import RestaurantAliasFetchSuccessMsg from "./RestaurantAliasFetchSuccessMsg";
import { setCravings } from "../Redux/userSlice";
import {
  addModalCraving,
  clearModalCravings,
  removeCravingFromCheckboxStates,
  editCheckboxStates,
} from "../Redux/cravingsModalSlice";

const Modal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [restaurant, setRestaurant] = useState("");
  const [restaurantAliases, setRestaurantAliases] = useState("");
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const lat = useSelector((state) => state.user.lat);
  const lon = useSelector((state) => state.user.lon);
  const cravings = useSelector((state) => state.user.cravings);
  const modalCravings = useSelector(
    (state) => state.cravingsModal.modalCravings
  );

  async function getAliasFromRestaurant(restaurant) {
    setRestaurantAliases([]);
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/restaurant_to_alias`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lat: lat,
          lon: lon,
          restaurant_name: restaurant,
        }),
      }
    );

    if (!res.ok) {
      throw new Error("Restaurant not found");
    }
    const aliases = await res.json();

    for (let alias of aliases["alias"]) {
      if (!modalCravings.includes(alias)) {
        dispatch(addModalCraving(alias));
        dispatch(editCheckboxStates(alias));
      }
    }
    setRestaurantAliases(aliases["alias"].join(", "));
    setRestaurant("");
    setShowSuccessMsg(true);
    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 3000);
  }

  const saveChangesOnClick = () => {
    dispatch(setCravings(modalCravings));
    dispatch(clearModalCravings());
    onClose();
  };

  const closeOnClick = () => {
    dispatch(removeCravingFromCheckboxStates(cravings));
    dispatch(clearModalCravings());
    onClose();
  };

  if (!open) return null;
  return createPortal(
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5">
              <h3 className="text-3xl font-semibold">
                {" "}
                What are you craving?{" "}
              </h3>
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
                className="appearance-none block w-full bg-white text-green border border-green rounded p-2 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                value={restaurant}
                placeholder="Restaurant name"
                onChange={(e) => {
                  setRestaurant(e.target.value);
                }}
              />
              {showSuccessMsg && (
                <RestaurantAliasFetchSuccessMsg
                  restaurantAliases={restaurantAliases}
                />
              )}
              <button
                className="bg-pink text-white active:bg-dark-pink font-bold uppercase text-sm p-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => getAliasFromRestaurant(restaurant)}
              >
                Search
              </button>
            </div>

            {/*footer*/}
            <div className="flex items-center justify-end p-6 pt-0">
              <button
                className="text-red bg-pink  active:bg-dark-pink font-bold uppercase px-6 py-3 rounded shadow text-sm outline-none hover:shadow-lg focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={closeOnClick}
              >
                Close
              </button>
              <button
                className="bg-pink text-white active:bg-dark-pink font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={saveChangesOnClick}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-green"></div>
    </>,
    document.getElementById("modal")
  );
};

export default Modal;
