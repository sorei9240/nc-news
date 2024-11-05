import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Article = () => {
    const { article_id } = useParams();
    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get(`https://sorei9240-nc-news.onrender.com/api/articles/${article_id}`)
            .then((response) => {
                setArticle(response.data.article)
                console.log(response.data.article)
            })
            .catch(error => console.log(error))
    }, [article_id])

    return(
        <div className="text-white h-screen m-8 max-w-3xl mx-auto">
            <h2 className='text-xl'>{article.title}</h2>
            <p></p>
            <p className='text-sm mb-4'>
                {article.author} • {new Date(article.created_at).toLocaleDateString('en-gb')}
            </p>
            <p>{article.body}</p>
            <div className='mt-2'>
                <span> 💬 {article.comment_count}</span>
                <span className='mx-2'>•</span>
                <span>👍 {article.votes}</span>
            </div>
        </div>
    )
}

export default Article;