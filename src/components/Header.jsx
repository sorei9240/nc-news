import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-cyan-500">
            <div className="max-w-3xl mx-auto px-4 pt-8 pb-4">
                <h1 className="text-4xl font-bold text-center text-slate-900">NC News</h1>
                <nav className="mt-6 flex gap-20">
                    <Link to="/articles" className='text-slate-900 hover:text-white font-semibold'>
                        All Articles
                    </Link>
                    <Link to="/topics" className='text-slate-900 hover:text-white font-semibold'>
                        Topics
                    </Link>
                </nav>
            </div>
        </header>
    );
};
export default Header;