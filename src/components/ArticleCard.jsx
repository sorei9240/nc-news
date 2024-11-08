import { Link } from 'react-router-dom';
import Vote from './Vote'

const ArticleCard = ({ article }) => {
    return (
        <div className="p-8 w-full">
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
    )
}

export default ArticleCard;