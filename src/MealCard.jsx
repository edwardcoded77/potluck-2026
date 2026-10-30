

function MealCard({ meal, onDelete }) {

    const remove = () => {
    onDelete(meal.id)
    }

    return (
        <div className="card">
            <h2>{meal.name}</h2>
            <p>Brought by {meal.guest}</p>
            <p>Servings: {meal.servings}</p>
            <button onClick={remove}>Remove</button>
        </div>
        
    
        )
    }
    
    export default MealCard


