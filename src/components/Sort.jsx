const Sort = ({ sortBy, order, onSortChange, onOrderChange }) => {
    return (
        <div className="flex items-center gap-4 mb-6">
            <select 
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
            >
                <option value="created_at">Date</option>
                <option value="comment_count">Comments</option>
                <option value="votes">Votes</option>
            </select>
            <select 
                value={order}
                onChange={(e) => onOrderChange(e.target.value)}
                className="bg-slate-700 text-white px-3 py-2 rounded border border-slate-600"
            >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
            </select>
        </div>
    );
}

export default Sort;