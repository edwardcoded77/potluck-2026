
import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import '@picocss/pico/css/pico.css'
import MealCard from './MealCard.jsx'
import './App.css'

function App() {
  const [meals, setMeals] = useState([])
  const [formError, setFormError] = useState("")

    const loadMeals = async () => {
    const { data, error, reload } = await supabase.from("meals").select()
    
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
        servings: Number(form.servings.value),
        kind_of_dish: form.kind.value,
      }
    

      const result = await supabase.from("meals").insert(meal).select()
      
      if (result.error) {
        setFormError(result.error.message)
        return
      }

    setFormError('')  
    console.log(result.data)
    form.reset()
  }



    // add two meals function
    const addTwo = async () => {
    const result = await supabase.from("meals").insert([

    {name: "Rolls", guest: "Ola", servings: 1},
    {name: "Ice Cream", guest: "Sola", servings: 1},
  
  ])

  if (result.error) {
    console.log(result.error.message)
    return
  }
  await reload()

  }

 // Add up the servings of all meals
  const total = meals.reduce((sum, meal) => {
  return sum + meal.servings
    }, 0)


    // remove meal function
    const deleteMeal = async (id) => {
      const result = await supabase.from("meals").delete().eq("id", id)
      if (result.error){
        console.log(result.error.message)
        return 
      }
        reload()
    }
  

  return (
    <div>
      <h1>Potluck</h1>
      <p>Feeds {total}</p>
      <button onClick={loadMeals}>Load</button>
        {meals.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} />)}
        <article>
          <form onSubmit={addMeal}>
            <input name="meal" placeholder="Dish" required />
            <input name="guest" placeholder="Your name" required />
            <input name="servings" type="number" placeholder="Serves" required/>
              <select name="kind">
                <option>Main</option>
                <option>Side</option>
                <option>Dessert</option>
              </select>
            <button className='addBtn'>Add A Meal</button> 
          </form> 
          <button onClick={addTwo}>Add 2 Meal</button>
          <p>{formError}</p>
        </article>
    </div>
            
      
  )
}

export default App