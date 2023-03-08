export const Sorting = ({ wishes = [], setWishes }) => {

    const sortByPriorityUp = (a, b) => {
        if (a.priority < b.priority)
          return 1
        if (a.priority > b.priority)
          return -1
        return 0
      }
    
      const sortByPriorityDown = (a, b) => {
        if (a.priority > b.priority)
          return 1
        if (a.priority < b.priority)
          return -1
        return 0
      }


    return (
    <article className="wishlist__sorting sorting">
        <label className="sorting__title">Сортировать</label>
        <img className="sorting__img" src="1f525.png" alt="sorting"></img>
        <button 
          className="sorting__btn"
          onClick={() => setWishes([...wishes].sort(sortByPriorityUp))}
        >
        <svg className="sorting__btn-img" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#323232" strokeWidth="2"/>
            <path d="M12 8L12 16" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 11L12.087 8.08704V8.08704C12.039 8.03897 11.961 8.03897 11.913 8.08704V8.08704L9 11" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        </button>
        <button 
          className="sorting__btn"
          onClick={() => setWishes([...wishes].sort(sortByPriorityDown))}
        >
            <svg className="sorting__btn-img" width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="#323232" strokeWidth="2"/>
                <path d="M12 16L12 8" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 13L11.913 15.913V15.913C11.961 15.961 12.039 15.961 12.087 15.913V15.913L15 13" stroke="#323232" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </button>
    </article>
    );
}