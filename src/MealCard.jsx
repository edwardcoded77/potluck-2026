

function MealCard({ meal, onDelete, onServeMore }) {

    const remove = () => {
    onDelete(meal.id)
    }

    const serveMore = () => {
        onServeMore (meal) 
    }

    return (
        <div className="card">
            <h2>{meal.name}</h2>
            <p>Brought by {meal.guest}</p>
            <p>Servings: {meal.servings}</p>
            <button onClick={remove}>Remove</button> &nbsp;
            <button onClick={serveMore}>+1</button>
        </div>
        
    
        )
    }
    
    export default MealCard


