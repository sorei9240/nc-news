import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Vote from './Vote'

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get('https://sorei9240-nc-news.onrender.com/api/articles', {params: {limit: 100}})
            .then(({data}) => {
                setArticles(data.articles);
                setIsLoading(false);
            })
            .catch((error) => console.log(error))
    }, [])

    if (isLoading) {
        return <p className='text-white text-3xl text-center mt-20'>Loading...</p>
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-5 mt-5">Articles</h2>
            <div className="space-y-4">
                {articles.map((article) => (
                    <div key={article.article_id} className="py-8 px-5 bg-slate-800">
                        <div className="flex gap-4">
                            <img 
                                src={article.article_img_url} 
                                alt="article image" 
                                className="w-20 h-20 object-cover rounded"
                            />
                            <div>
                                <Link to={`/articles/${article.article_id}`}>
                                <h3 className="font-semibold text-white">{article.title}</h3>
                                <p className="text-sm text-gray-100">
                                    Posted by {article.author} • {new Date(article.created_at).toLocaleDateString('en-gb')}
                                </p>
                                </Link>
                                <div className="mt-2 text-sm text-gray-100 flex">
                                    <span>💬 {article.comment_count} </span>
                                    <span className='mx-2'>•</span>
                                    <span>📂 {article.topic}</span>
                                    <span className='mx-2'>•</span>
                                    <Vote type="articles" id={article.article_id} currentVotes={article.votes}/>
                                </div>     
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticleList;