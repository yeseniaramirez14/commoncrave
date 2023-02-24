import { useParams } from "react-router-dom";
import GroupForm from "./GroupForm"


const JoinGroupFromUrlForm = () => {
    const { id } = useParams()

    return(
        <GroupForm id={id}/>
    )
}

export default JoinGroupFromUrlForm