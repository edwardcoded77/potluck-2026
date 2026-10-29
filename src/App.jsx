
import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import '@picocss/pico/css/pico.css'
import MealCard from './MealCard.jsx'
import './App.css'

function App() {
  const [meals, setMeals] = useState([])

    const loadMeals = async () => {
    const { data, error } = await supabase.from("meals").select()
    
    if (error) {
      console.log(error.message)
      return
    }
    
    console.log(data)
    setMeals(data)
  }


    const addMeal = async (event) => {
    event.preventDefault()
    const form = event.target
    const meal = {
      name: form.meal.value,
      guest: form.guest.value,
      servings: form.servings.value
    }
    
    const result = await supabase.from("meals").insert(meal)
    if (result.error) {
      console.log(result.error.message)
      return
    }
    form.reset()
  }

   

  return (
    <div>
      <h1>Potluck</h1>
      <button onClick={loadMeals}>Load</button>
        {meals.map((meal) => <MealCard key={meal.id} meal={meal} />)}
        <article>
          <form onSubmit={addMeal}>
            <input name="meal" placeholder="Dish" />
            <input name="guest" placeholder="Your name" />
            <input name="servings" type="number" placeholder="Serves" />
            <button>Add</button>
          </form>
        </article>
    </div>
  )
}

export default App