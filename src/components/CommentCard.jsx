import Vote from "./Vote";
import Delete from "./Delete";

const CommentCard = ({ comment, setComments, onDelete, user }) => {
    return (
        <div className="flex gap-4 my-4 bg-slate-800 p-5 rounded-lg">
            <div>
                <p className="text-sm text-gray-100 mb-2">
                    {comment.author} • {new Date(comment.created_at).toLocaleDateString('en-gb')}
                    {comment.author === user && (<Delete id={comment.comment_id} author={comment.author} setComments={setComments} onDelete={onDelete}/>)}
                </p>
                <p className='text-white'>
                    {comment.body}
                </p>
                <div className="mt-2 text-sm text-gray-100 flex">
                    <Vote type="comments" id={comment.comment_id} currentVotes={comment.votes}/>
                </div>
            </div>
    </div>
    )
}

export default CommentCard;