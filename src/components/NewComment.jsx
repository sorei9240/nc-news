import { useState } from 'react';
import { addComment } from '../api';

const NewComment = ({ article_id, setComments, onAdd }) => {
    const [newComment, setNewComment] = useState('')
    const [isSubmit, setIsSubmit] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
        const commentData = {username: 'tickle122', body: newComment.trim()}

        addComment(article_id, commentData)
            .then((data) => {
                setComments(comments => [data.comment, ...comments]);
                setSuccess(true);
                setIsSubmit(false);
                setNewComment('');
                onAdd();
                setTimeout(() => setSuccess(false), 8000);
            })
            .catch((error) => {
                setError('Failed to post comment.');
                setIsSubmit(false);
                setTimeout(() => setError(null), 8000);
            });
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
                    `px-4 py-2 rounded ${isSubmit ? 'bg-slate-600 cursor-not-allowed' : 'transition ease-in-out delay-150 bg-cyan-600 hover:-translate-y-1 hover:scale-105 hover:bg-purple-500 duration-300'
                }`}
            >
                {isSubmit ? 'Posting...' : 'Reply'}
            </button>
            </form>
        )
}

export default NewComment;