import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../api';
import CommentsList from './CommentsList'
import Vote from './Vote';
import Loading from './Loading';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getArticleById(article_id)
            .then((data) => {
                setArticle(data.article);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response?.status === 404) {
                    setIsLoading(false);
                    setError('404 - Article Not Found');
                }
            });
    }, [article_id]);

    const updateCount = (increment = false) => {
        setArticle(currentArticle => ({
            ...currentArticle,
            comment_count: increment 
                ? currentArticle.comment_count + 1
                : currentArticle.comment_count - 1
        }));
    };

    if (isLoading) {
        return <Loading/>
    }

    if (error) {
        return (
            <p className='text-red-400 text-3xl text-center mt-20'>{error}</p>
        )
    }

    return(
        <div className="max-w-3xl mx-auto p-4">
            <div className="bg-slate-800 p-5 mb-4 rounded-lg">
                <h2 className='text-xl font-semibold text-white'>{article.title}</h2>
                <p className='text-sm mb-4 text-gray-300'>
                    {article.author} • {new Date(article.created_at).toLocaleDateString('en-gb')}
                </p>
                <p className="text-white">{article.body}</p>
                <div className='mt-2 flex text-gray-300'>
                    <span>💬 {article.comment_count}</span>
                    <span className='mx-2'>•</span>
                    <Vote type="articles" id={article.article_id} currentVotes={article.votes}/>
                </div>
            </div>
            <div className="space-y-4">
                <CommentsList 
                    article_id={article_id} 
                    onDelete={() => updateCount(false)} 
                    onAdd={() => updateCount(true)}
                />
            </div>
        </div>
    )
}

export default Article;