export default function Comments({comments}) {
    return (
        <div className = "mt-4">
            <h2 className = "text-xl font-semibold">Comments</h2>
            {comments.map((comment) => (
                <div key = {comment.id.timestamp} className = "mt-2 p-2 bg-gray-100">
                    <div className = "flex justify-between">
                        <div className = "flex">
                            <img src = {comment.simpleUser.avatar}
                                 alt = {comment.simpleUser.username}
                                 className = "w-10 h-10 rounded-full"/>
                            <div className = "ml-2">
                                <p className = "font-semibold">{comment.simpleUser.username}</p>
                            </div>
                        </div>
                    </div>
                    <p className = "mt-2">{comment.content}</p>
                </div>
            ))}
        </div>
    );
}