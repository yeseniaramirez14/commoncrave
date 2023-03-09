import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GroupForm from "./GroupForm";

const JoinGroupFromUrlForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    isFinalGroup(id);
  }, []);

  const isFinalGroup = async (groupId) => {
    const groupRes = await fetch(
      `${process.env.REACT_APP_API_HOST}/api/group/${groupId}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (groupRes.status === 200) {
      const group = await groupRes.json();
      const isGroupFinal = group["group"]["isFinal"];
      if (isGroupFinal) {
        navigate(`/group/${groupId}/results`);
      }
    } else {
      navigate("/group/error");
      throw new Error("Could not join group");
    }
  };

  return <GroupForm id={id} />;
};

export default JoinGroupFromUrlForm;
