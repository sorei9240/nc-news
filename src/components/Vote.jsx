import { useState, useEffect } from 'react';
import { updateVotes } from '../api';

const Vote = ({type, id, currentVotes}) => {
    const [voteCount, setVoteCount] = useState(currentVotes);
    const [error, setError] = useState(null);
    
    const [userVote, setUserVote] = useState(() => {
        const savedVote = localStorage.getItem(`${type}_${id}_vote`);
        return savedVote ? parseInt(savedVote) : 0;
    });

    useEffect(() => {
        const savedVote = localStorage.getItem(`${type}_${id}_vote`);
        if (savedVote) {
            setVoteCount(currentVotes);
        }
    }, [currentVotes, type, id]);

    const handleVote = (voteVal) => {
        if (voteVal === userVote) {
            setVoteCount((current) => current - userVote);
            localStorage.removeItem(`${type}_${id}_vote`);

            updateVotes(type, id, -userVote)
                .then(() => {
                    setUserVote(0);
                })
                .catch((error) => {
                    setVoteCount((current) => current + userVote);
                    localStorage.setItem(`${type}_${id}_vote`, userVote);
                    console.log(error);
                    setError('Vote request failed');
                });
            return;
        }

        const oldVote = userVote;
        const voteChange = voteVal - oldVote;
        
        setVoteCount((current) => current + voteChange);
        setUserVote(voteVal);
        localStorage.setItem(`${type}_${id}_vote`, voteVal);

        updateVotes(type, id, voteChange)
            .catch((error) => {
                setVoteCount((current) => current - voteChange);
                setUserVote(oldVote);
                localStorage.setItem(`${type}_${id}_vote`, oldVote);
                console.log(error);
                setError('Vote request failed');
            });
    };
    
    return (
        <div>
            <button 
                onClick={() => handleVote(1)}
                className={`${userVote === 1 ? 'opacity-50' : 'opacity-100'} transform hover:-translate-y-1 transition duration-200`}
            >
                👍
            </button>
            <span className='text-white mx-2'>{voteCount}</span>
            <button 
                onClick={() => handleVote(-1)}
                className={`${userVote === -1 ? 'opacity-50' : 'opacity-100'} transform hover:translate-y-1 transition duration-200`}
            >
                👎
            </button>
            {error && <div className='text-red-400'>{error}</div>}
        </div>
    );
}

export default Vote;