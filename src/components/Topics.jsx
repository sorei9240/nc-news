import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getTopics } from '../api';
import codingIcon from '../assets/coding.svg'
import cookingIcon from '../assets/cooking.svg'
import footballIcon from '../assets/football.svg'
import Loading from './Loading'

const topicIcons = {
    coding: codingIcon,
    cooking: cookingIcon,
    football: footballIcon,
};

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getTopics()
            .then((data) => {
                setTopics(data.topics);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to load topics');
                setIsLoading(false);
            });
    }, []);

    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return <p className='text-red-400 text-3xl text-center mt-20'>{error}</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-5 mt-5">Topics</h2>
            <div className="flex flex-col gap-4">
                {topics.map((topic) => (
                    <Link
                        key={topic.slug}
                        to={`/topics/${topic.slug}`}
                        className="bg-slate-800 p-8 rounded-lg hover:bg-slate-700 transition-colors w-full"
                    >
                        <div className="flex items-center gap-6">
                            <img 
                                src={topicIcons[topic.slug]} 
                                alt={`${topic.slug} icon`}
                                className="w-20 h-20 object-contain bg-white rounded-md"
                            />
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2 capitalize">
                                    {topic.slug}
                                </h3>
                                <p className="text-gray-300">
                                    {topic.description}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Topics;