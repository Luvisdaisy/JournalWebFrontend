import {useNavigate} from "react-router-dom";

export default function Avatar({username, avatar}) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/u/${username}`);
    }

    return (
        <div className = "avatar btn btn-circle">
            <div className = "w-12 rounded-full">
                <img src = {avatar ? avatar : "src/assets/user.svg"} alt = {username} onClick = {handleClick}/>
            </div>
        </div>
    )
}