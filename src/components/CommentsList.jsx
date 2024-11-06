import { useState, useEffect } from 'react';
import axios from 'axios';
import Vote from './Vote'

const CommentsList = ({article_id}) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://sorei9240-nc-news.onrender.com/api/articles/${article_id}/comments`)
            .then((response) => {
                setComments(response.data.comments);
                setIsLoading(false);
            })
            .catch(error => console.log(error))
    }, [article_id])

    if (isLoading) {
        return <p className='text-white text-xl'>Loading comments...</p>
    }

    if (comments.length === 0) {
        return (
            <div className='mt-10 p-20 text-lg text-center bg-slate-800'>
                Be the first to comment!
            </div>
        )
    }

    return (
        <div>
            <div>
            {comments.map((comment) => (
                <div key={comment.comment_id}>
                    <div className="flex gap-4 my-4 bg-slate-800 p-5">
                        <div>
                            <p className="text-sm text-gray-100 mb-2">
                                {comment.author} • {new Date(comment.created_at).toLocaleDateString('en-gb')}
                            </p>
                            <p className='text-white'>
                                {comment.body}
                            </p>
                            <div className="mt-2 text-sm text-gray-100">
                                <Vote type="comments" id={comment.comment_id} currentVotes={comment.votes}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default CommentsList;