import { useState, useEffect } from 'react';
import { getComments } from '../api';
import NewComment from './NewComment';
import CommentCard from './CommentCard';
import Loading from './Loading';

const CommentsList = ({article_id, onDelete, onAdd}) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const user = 'tickle122';

    useEffect(() => {
        setIsLoading(true);
        getComments(article_id)
            .then((data) => {
                setComments(data.comments);
                setIsLoading(false);
            })
            .catch(error => console.log(error));
    }, [article_id]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div>
            <NewComment article_id={article_id} setComments={setComments} onAdd={onAdd}/>
            
            {comments.length === 0 ? (
                <div className='p-20 text-lg text-center bg-slate-800'>
                    Be the first to comment!
                </div>
            ) : (
            <div>
            {comments.map((comment) => (
                <CommentCard
                    key={comment.comment_id}
                    comment={comment}
                    setComments={setComments}
                    onDelete={onDelete}
                    user={user}
                />
            ))}
            </div>
        )}
        </div>
    )
}

export default CommentsList;