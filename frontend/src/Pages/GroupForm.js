import "../CSS/styles.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modal from "../Components/Modal";
import { setIsNewGroupFalse } from "../Redux/homeSlice";
import { setLat, setLon } from "../Redux/userSlice";
import { setModalCravings } from "../Redux/cravingsModalSlice";
import cravingsData from "../cravingsData.json";

const GroupForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isLocated, setIsLocated] = useState(false);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");
  const [name, setName] = useState("");
  const [isJoinFromURL, setIsJoinFromURL] = useState(false);
  const lat = useSelector((state) => state.user.lat);
  const lon = useSelector((state) => state.user.lon);
  const isNewGroup = useSelector((state) => state.home.isNewGroup);
  const cravings = useSelector((state) => state.user.cravings);

  useEffect(() => {
    if (Object.keys(props).length === 0) {
    } else {
      dispatch(setIsNewGroupFalse());
      setGroupId(props.id);
      setIsJoinFromURL(true);
    }
  }, []);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by your browser");
    } else {
      setStatus("Locating...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setStatus(null);
          dispatch(setLat(position.coords.latitude));
          dispatch(setLon(position.coords.longitude));
          setIsLocated(true);
        },
        () => {
          setStatus("Please allow the use of location services.");
        }
      );
    }
  };

  useEffect(() => {
    if (lat) {
      getCityFromLatLon();
    }

    async function getCityFromLatLon() {
      let res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&result_type=postal_code&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      );
      if (!res.ok) {
        throw new Error("Location fetch was not okay");
      }
      let data = await res.json();
      setAddress(data.results[0].formatted_address);
    }
  }, [lat, lon]);

  const checkedCravings = cravings.length
    ? cravings.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  const getLatLongFromAddress = async (address) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/address_to_latlon`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: address }),
      }
    );
    const coords = await res.json();
    dispatch(setLat(coords["coords"][0]));
    dispatch(setLon(coords["coords"][1]));
    setIsLocated(true);
  };

  // handle Submit should first post to create a new user and then Create/Join group depending on conditional
  const handleSubmit = async (event) => {
    // post request to make new user
    event.preventDefault();
    if (isNewGroup) {
      if (!groupName || !name || cravings.length === 0) {
        alert("Please fill in all required fields");
        return;
      }
    } else {
      if (!groupId || !name || cravings.length === 0) {
        alert("Please fill in all required fields");
        return;
      }
    }
    if (!isLocated) {
      getLatLongFromAddress(address);
    }
    const userData = {
      name: name,
      lat: lat,
      lon: lon,
      cravings: cravings,
    };

    let userRes = await fetch(`${process.env.REACT_APP_API_HOST}/api/user`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!userRes.ok) {
      throw new Error("User could not be created");
    }

    const user = await userRes.json();

    // check if is new group
    if (isNewGroup) {
      const groupData = {
        owner_id: user["_id"],
        name: groupName,
      };
      // post request with Group Name, Name, Location, and Cravings
      let groupRes = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/group`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(groupData),
        }
      );

      if (groupRes.status === 200) {
        const group = await groupRes.json();
        const groupId = group["_id"];
        navigate(`/group/${groupId}`);
      } else {
        throw new Error("Could not create group");
      }
    } else {
      // patch request with GroupID, Name, Location, Cravings
      const userId = user["_id"];
      let groupRes = await fetch(
        `${process.env.REACT_APP_API_HOST}/api/group/${groupId}`,
        {
          method: "put",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ members: userId }),
        }
      );

      if (groupRes.status === 200) {
        const group = await groupRes.json();
        const groupId = group["group"]["_id"];
        const isGroupFinal = group["group"]["isFinal"];
        if (isGroupFinal) {
          navigate(`/group/${groupId}/results`);
        } else {
          navigate(`/group/${groupId}`);
        }
      } else {
        navigate(`/group/error`);
        throw new Error("Could not join group");
      }
    }
  };

  return (
    <div className="min-h-screen justify-center font-worksans bg-yellow flex-col items-center">
      <h1 className="text-center pt-10 font-bold text-3xl">
        {isNewGroup ? "Start Group" : "Join Group"}
      </h1>
      <form className="pt-5">
        <div className="flex justify-center flex-wrap -mx-3 mb-6">
          <div className="w-half px-3">
            {isNewGroup ? (
              <label
                className="block tracking-wide font-bold mb-2"
                htmlFor="groupName"
              >
                Group Name
                <input
                  name="groupName"
                  id="groupName"
                  value={groupName}
                  onChange={(e) => {
                    setGroupName(e.target.value);
                  }}
                  className="appearance-none block w-full bg-white text-green border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Group Name"
                  required
                />
              </label>
            ) : (
              <label
                className="block tracking-wide font-bold mb-2"
                htmlFor="groupId"
              >
                Group ID
                <input
                  name="groupId"
                  id="groupId"
                  value={groupId}
                  readOnly={isJoinFromURL}
                  onChange={(e) => {
                    setGroupId(e.target.value);
                  }}
                  className="appearance-none block w-full bg-white text-green border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Group ID"
                  required
                />
              </label>
            )}
          </div>
        </div>
        <div className="flex justify-center flex-wrap -mx-3 mb-6">
          <div className="w-half px-3">
            <label
              className="block tracking-wide font-bold mb-2"
              htmlFor="name"
            >
              Name
              <input
                name="name"
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="appearance-none block w-full bg-white text-green border border-green rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Name"
                required
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center flex-wrap -mx-3">
          <div className="w-half px-3">
            <label className="block tracking-wide font-bold" htmlFor="address">
              Address
              {isLocated ? (
                <input
                  name="address"
                  id="address"
                  disabled
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  className="appearance-none block w-full bg-white text-green border border-green rounded py-3 mb-12 px-4 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Address"
                  required
                />
              ) : (
                <>
                  <input
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    className="appearance-none block w-full bg-white text-green border border-green rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    type="text"
                    placeholder="Address"
                    required
                  />{" "}
                  <button
                    type="button"
                    className="mb-6 hover:text-pink text-green"
                    id="location"
                    onClick={getLocation}
                  >
                    Locate Me
                  </button>{" "}
                </>
              )}
            </label>
          </div>
        </div>
        <div className="flex justify-center flex-col items-center mb-6">
          <div className="px-3 flex flex-col items-center">
            <div className="font-bold">Cravings:</div>
            <label
              htmlFor="cravings"
              className="max-w-sm flex flex-col text-green text-sm items-center"
            >
              {cravings.map((craving, index) => {
                return (
                  <span key={index}>
                    {cravingsData[craving]}
                    {index < cravings.length - 1 ? ",\u00A0" : ""}
                  </span>
                );
              })}{" "}
            </label>
            {address.length >= 5 || isLocated === true ? (
              <button
                type="button"
                onClick={() => {
                  if (!isLocated) {
                    getLatLongFromAddress(address);
                  }
                  dispatch(setModalCravings(cravings));
                  setOpenModal(true);
                }}
                className="shadow bg-pink hover:bg-dark-pink focus:shadow-outline focus:outline-none text-white text-sm py-1 px-2 rounded"
              >
                Select Cravings
              </button>
            ) : (
              <div className="cravingsButton flex flex-col justify-center">
                <button
                  disabled
                  type="button"
                  className="shadow bg-grey focus:shadow-outline focus:outline-none text-white text-sm py-1 px-2 rounded"
                  data-bs-toggle="tooltip"
                  title="Disabled tooltip"
                >
                  Select Cravings
                </button>
                <div className="hidden textBubble bg-dark-pink text-white py-2 px-2 rounded-full text-xs">
                  Please enter your address.
                </div>
              </div>
            )}
            <Modal open={openModal} onClose={() => setOpenModal(false)} />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="shadow bg-pink hover:bg-dark-pink focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmit}
          >
            {isNewGroup ? "Create" : "Join"}
          </button>
          {/* )} */}
        </div>
      </form>
    </div>
  );
};

export default GroupForm;
