import { useState } from 'react';
import axios from 'axios';

const NewComment = ({ article_id, setComments }) => {
    const [newComment, setNewComment] = useState('')
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        const commentData = {username: 'tickle122', body: newComment}

        axios.post(`https://sorei9240-nc-news.onrender.com/api/articles/${article_id}/comments`, commentData)
            .then((response) => {
                setComments(comments => [response.data.comment, ...comments])
                console.log(commentData)
                setSuccess(true)
                setIsSubmit(false);
                setNewComment('')
            })
            .catch((error) => {
                setError('Failed to post comment.')
                setIsSubmit(false);
            })
    }

        return (
            <form onSubmit={handleSubmit} className="mb-8 bg-slate-800 p-5 mt-10">
            <h3 className="text-lg mb-4">Add a Comment</h3>
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                disabled={isSubmit}
                placeholder="Share your thoughts"
                className="w-full p-2 mb-2 bg-slate-700 text-white rounded"
                rows="3"
            />
            
            {error && (<p className="text-red-400 text-sm mb-2">{error}</p>)}
            
            {success && (<p className="text-green-400 text-sm mb-2">Comment posted!</p>)}
            
            <button
                type="submit"
                disabled={isSubmit}
                className={
                    `px-4 py-2 rounded ${isSubmit ? 'bg-slate-600 cursor-not-allowed' : 'bg-cyan-400 text-slate-900 hover:bg-cyan-500'
                }`}
            >
                {isSubmit ? 'Posting...' : 'Reply'}
            </button>
            </form>
        )
}

export default NewComment;