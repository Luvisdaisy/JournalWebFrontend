import {useNavigate} from "react-router-dom";

export default function Avatar(props) {

    const navigate = useNavigate()

    const goToProfile = (e) => {
        e.preventDefault()
        navigate("/profile/${props.username}")
    }

    return (
        <button onClick = {goToProfile}>
            <img src = {props.url} className = {"w-2 rounded"} alt = {props.username}/>
        </button>
    )
        ;
}