// import { Routes, Route, Link } from 'react-router-dom';
import Header from "./components/Header"
import ArticleList from './components/ArticleList';

const App = () => {
  return (
    <div className="bg-slate-900">
      <Header />
      <ArticleList />
    </div>
  )
}

export default App;