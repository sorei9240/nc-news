import { useState } from 'react';
import axios from 'axios';

const Delete = ({id, setComments, onDelete}) => {
    const [isDelete, setIsDelete] = useState(false)

    const handleDelete = () => {
        if (isDelete) {
            return;
        }
        setIsDelete(true);

        axios.delete(`https://sorei9240-nc-news.onrender.com/api/comments/${id}`)
            .then(() => {
                setComments((currentComments) => 
                    currentComments.filter((comment) => comment.comment_id !== id)
                );
                setIsDelete(false);
                onDelete()
            })
            .catch((error) => {
                console.log(error)
                alert('Unable to delete comment. Please try again.');
                setIsDelete(false);
            })
    }


    return (
        <button
            onClick={handleDelete}
            disabled={isDelete}
            className='ml-3'
        >
            {isDelete ? 'Deleting...' : '🗑️'}
        </button>
    )
}

export default Delete;