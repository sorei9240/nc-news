import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const ArticleList = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get('https://sorei9240-nc-news.onrender.com/api/articles', {params: {limit: 100}})
            .then(({data}) => {
                setArticles(data.articles)
                console.log(data.articles)
            })
            .catch((error) => console.log(error))
    }, [])
    return (
        <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-white mb-5 mt-5">Articles</h2>
            <div className="space-y-4">
                {articles.map((article) => (
                    <div key={article.article_id} className="p-7 rounded border bg-slate-800">
                    <div className="flex gap-4">
                        <img 
                            src={article.article_img_url} 
                            alt="" 
                            className="w-20 h-20 object-cover rounded"
                        />
                        <div>
                            <Link to={`/articles/${article.article_id}`}>
                            <h3 className="font-semibold text-white">{article.title}</h3>
                            <p className="text-sm text-gray-100">
                                Posted by {article.author} • {new Date(article.created_at).toLocaleDateString('en-gb')}
                            </p>
                            <div className="mt-2 text-sm text-gray-100">
                                <span>💬 {article.comment_count} </span>
                                <span className='mx-1'>•</span>
                                <span>👍 {article.votes}</span>
                                <span className='mx-1'>•</span>
                                <span>📂 {article.topic}</span>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default ArticleList;