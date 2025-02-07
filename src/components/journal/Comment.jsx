import Avatar from "../user/Avatar.jsx";

export default function Comment({comment}) {
    return (
        <div className = "mt-2 p-2 border-t-amber-900 border-t">
            <div className = "flex justify-between">
                <div className = "flex">
                    <Avatar username = {comment.simpleUser.username} avatar = {comment.simpleUser.avatar}/>
                    <div className = "ml-2">
                        <p className = "font-black">{comment.simpleUser.username}</p>
                        <p className = "mt-2 font-mono">{comment.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}