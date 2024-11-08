import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import Loading from './Loading'

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { topic } = useParams(); 

    useEffect(() => {
        setIsLoading(true);
        getArticles(topic)
            .then((data) => {
                setArticles(data.articles);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to load articles');
                setIsLoading(false);
            });
    }, [topic]);

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-5 mt-5 capitalize">
                {topic 
                    ? `Articles about ${topic}`
                    : 'All Articles'
                }
            </h2>
            <div className="space-y-4">
                {articles.length === 0 ? (
                    <p className="text-white text-center py-8">No articles found</p>
                ) : (
                    articles.map((article) => (
                        <ArticleCard article={article}/>
                    ))
                )}
            </div>
        </div>
    )
}

export default ArticleList;