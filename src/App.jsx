import { Routes, Route} from 'react-router-dom';
import Header from "./components/Header"
import ArticleList from './components/ArticleList';
import Article from './components/Article';
import Topics from './components/Topics';

const App = () => {
  return (
    <div className="bg-slate-900 min-h-screen">
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:article_id" element={<Article />}/>
          <Route path="/topics" element={<Topics />} />
          <Route path="/topics/:topic" element={<ArticleList />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;