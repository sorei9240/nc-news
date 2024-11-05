import { useState} from 'react';
import axios from 'axios';

const Vote = ({type, id, currentVotes}) => {
    const [voteCount, setVoteCount] = useState(currentVotes);
    const [error, setError] = useState(null);
    const [userVote, setUserVote] = useState(0);

    const handleVote = (voteVal) => {
        if (voteVal === userVote) {
            setVoteCount((current) => current - userVote)

            axios.patch(`https://sorei9240-nc-news.onrender.com/api/${type}/${id}`, {inc_votes: -userVote})
            .then(() => {
                setUserVote(0)
            })
            .catch((error) => {
                setVoteCount((current) => current - voteVal + userVote);
                console.log(error)
                setError('Vote request failed');
            });
        }

        setVoteCount((current) => current + voteVal - userVote);
        setUserVote(voteVal);

        axios.patch(`https://sorei9240-nc-news.onrender.com/api/${type}/${id}`, {inc_votes: voteVal})
            .catch((error) => {
                setVoteCount((current) => current - voteVal + userVote);
                console.log(error)
                setError('Vote request failed');
            });
    };
    
    return (
        <div>
            <button onClick={() => handleVote(1)}
                className={userVote === 1 ? 'opacity-50' : 'opacity-100'}
                >
                👍
            </button>
            <span className='text-white mx-2'>{voteCount}</span>
            <button onClick={() => handleVote(-1)}
                className={userVote === -1 ? 'opacity-50' : 'opacity-100'}
                >
                👎
            </button>
            {error && <div className='text-red-400'>{error}</div>}
        </div>
    )
}

export default Vote;