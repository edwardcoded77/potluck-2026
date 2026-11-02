

function DrinkCard({ drink, onDelete, onServeStyleChange }) {

    const remove = () => {
    onDelete(drink.id)
    }

    return (
        <div className="card">
            <h2>{drink.drink_name}</h2>
            <p>Brought by {drink.guest_name}</p>
            <p>Serving style: {drink.serving_style}</p>
        
        <select onChange={(event) => onServeStyleChange(drink, event.target.value)}>
                <option value="">Serving preference</option>
                <option value="One Shot">One Shot</option>
                <option value="Straight">Straight</option>
                <option value="Mixed with Ice">Mixed with Ice</option>
                <option value="No Ice">No Ice</option>
        </select>
            <button onClick={remove}>Remove</button>
        </div>
    )

}

export default DrinkCard