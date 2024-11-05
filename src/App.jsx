import { Routes, Route} from 'react-router-dom';
import Header from "./components/Header"
import ArticleList from './components/ArticleList';
import Article from './components/Article';

const App = () => {
  return (
    <div className="bg-slate-900">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<Article />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;