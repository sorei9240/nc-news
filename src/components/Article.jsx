import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CommentsList from './CommentsList'
import Vote from './Vote';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true)
        axios.get(`https://sorei9240-nc-news.onrender.com/api/articles/${article_id}`)
            .then((response) => {
                setArticle(response.data.article);
                setIsLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setIsLoading(false)
                    setError('404 - Article Not Found')
                }
            })
    }, [article_id])

    const updateCount = (increment = false) => {
        setArticle(currentArticle => ({
            ...currentArticle,
            comment_count: increment 
                ? currentArticle.comment_count + 1
                : currentArticle.comment_count - 1
        }));
    };

    if (isLoading) {
        return <p className='text-white text-3xl text-center mt-20'>Loading...</p>
    }

    if (error) {
        return (
            <p className='text-red-400 text-3xl text-center mt-20'>{error}</p>
        )
    }

    return(
        <div className="text-white m-8 max-w-3xl mx-auto">
            <h2 className='text-xl'>{article.title}</h2>
            <p></p>
            <p className='text-sm mb-4'>
                {article.author} • {new Date(article.created_at).toLocaleDateString('en-gb')}
            </p>
            <p>{article.body}</p>
            <div className='mt-2 flex'>
                <span> 💬 {article.comment_count}</span>
                <span className='mx-2'>•</span>
                <Vote type="articles" id={article.article_id} currentVotes={article.votes}/>
            </div>
            <CommentsList article_id={article_id} onDelete={() => updateCount(false)} onAdd={() => updateCount(true)}/>
        </div>
    )
}

export default Article;