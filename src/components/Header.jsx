import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <header className="bg-cyan-500">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center">NC News</h1>
                <nav className="mt-4">
                    <Link to="/articles">
                        All Articles
                    </Link>
                </nav>
            </div>
        </header>
    );
};
export default Header;