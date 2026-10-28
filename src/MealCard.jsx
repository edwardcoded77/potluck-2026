

function MealCard({ meal }) {
    return (
    
    <div className="card">
        <h2>{meal.name}</h2>
        <p>Brought by {meal.guest}</p>
        <p>Ingredients: {meal.ingredients}</p>
    </div>

    )
}

export default MealCard
