import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getArticles } from '../api';
import ArticleCard from './ArticleCard';
import Loading from './Loading';
import Sort from './Sort';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { topic } = useParams();
    const [err, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get('sort_by') || 'created_at';
    const order = searchParams.get('order') || 'desc';

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        getArticles(topic, sortBy, order)
            .then((data) => {
                setArticles(data.articles);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                if (error.response?.status === 404) {
                    setError(`No articles found in the topic ${topic}`);
                } else {
                    setError('Failed to load articles');
                }
                setIsLoading(false);
            });
    }, [topic, sortBy, order]);

    const handleSort = (newSortBy) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', newSortBy);
        setSearchParams(newParams);
    }

    const handleOrder = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('order', order === 'asc' ? 'desc' : 'asc');
        setSearchParams(newParams);
    }

    if (isLoading) {
        return <Loading/>;
    }

    if (err) {
        return <p className="text-red-400 text-3xl text-center mt-20">{err}</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-5 mt-5 capitalize">
                {topic ? `Articles about ${topic}` : 'All Articles'}
            </h2>
            <Sort 
                sortBy={sortBy}
                order={order}
                onSortChange={handleSort}
                onOrderChange={handleOrder}
            />
            <div className="space-y-4">
                {articles.length === 0 ? (
                    <p className="text-red-400 text-xl text-center py-8">
                        No articles found
                    </p>
                ) : (
                    articles.map((article) => (
                        <div key={article.article_id} className="bg-slate-800">
                            <ArticleCard article={article} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ArticleList;