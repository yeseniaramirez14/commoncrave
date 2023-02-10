import { useParams } from "react-router-dom";

const GroupList = () => {
  const { id } = useParams();
  return <div>You have successfully created/joined a group {id}</div>;
};

export default GroupList;
