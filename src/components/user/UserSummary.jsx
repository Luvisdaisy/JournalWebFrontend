import JournalList from "../journal/JournalList.jsx";
import UserCard from "./UserCard.jsx";
import {useParams} from "react-router-dom";

export default function UserSummary() {

    const {username} = useParams();
//Follow unfollow wont change
    return (
        <div>
            <UserCard username = {username}/>
            <JournalList url = {`http://localhost:8080/api/journal/${username}`}/>
        </div>
    )
}
