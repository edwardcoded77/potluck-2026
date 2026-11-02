
import { useState, useEffect } from 'react'
import { supabase } from './utils/supabase'
import '@picocss/pico/css/pico.css'
import MealCard from './MealCard.jsx'
import DrinkCard from './DrinkCard.jsx'

import './App.css'

  function App() {
    const [meals, setMeals] = useState([])
    const [formError, setFormError] = useState("")
    const [picked, setPicked] = useState([])
    const [newest, setNewest] = useState([])
    const [firstThree, setFirstThree] = useState([])
    const [found, setFound] = useState([])
    const [drinks, setDrinks] = useState([])


    // fetch meal records
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
    
    

      // insert meal
      const result = await supabase.from("meals").insert(meal).select()
      
      if (result.error) {
        setFormError(result.error.message)
        return
      }

        setFormError('')  
        console.log(result.data)
        form.reset()
      }




     // show total guest
    const totalGuests = meals.length



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



  // show newest function
    const showNewest = async () => {
    const result = await supabase.from("meals").select().order("created_at", {ascending: true})

    if (result.error) {
      console.log(result.error.message)
      return
    }
      setNewest(result.data)
  }


  // limit meal 
    const showFirstThree = async () => {
    const result = await supabase.from("meals").select().limit(3)
    if (result.error) {
      console.log(result.error.message)
      return
    }
    setFirstThree(result.data)
  }



  // Ask for Ayo's dishes
    const showAyo = async () => {
    const result = await supabase.from("meals").select().eq("guest", "Ayo")
    if (result.error) {
        console.log(result.error.message)
        return
      }
        setPicked(result.data)
      }
        

    // Filter meals already loaded into React
    const ayo = meals.filter((meal) =>  meal.guest === "Ayo")


  // Pick a guest from a form 
    const pickGuest = async (event) => {
      event.preventDefault()
      const form = event.target
      const result = await supabase.from("meals").select().eq("guest", form.guest.value)

      if (result.error) {
        console.log(result.error.message)
        result
      }
        setPicked(result.data)
    }


  // A Search Box with ilike
    const search = async (event) => {
    event.preventDefault()
    const form = event.target
    const result = await supabase.from("meals").select().ilike("name", "%" + form.query.value + "%")
    if (result.error) {
      console.log(result.error.message)
      return
    }
    setFound(result.data)
  }

   // remove meal function
    const deleteMeal = async (id) => {
    const result = await supabase.from("meals").delete().eq("id", id)
      if (result.error){
        console.log(result.error.message)
        return 
      }
        reload()
    }

  
  // update servings 
  const addServing = async (meal) => {
    const result = await supabase.from("meals").update({ servings: Number(meal.servings) + 1 }).eq("id", meal.id)
        if (result.error){
          console.log(result.error.message)
          return
        }
          await loadMeals()
      }


    // fetches all records from the drinks table
    const loadDrinks = async () => {
    const { data, error } = await supabase.from("drinks").select()
    if (error) {
      console.log(error.message)
      return
    }
      console.log(data)
      setDrinks(data)
    }
    


    // Add drink 
      const addDrink = async (event) => {
      event.preventDefault()
      const form = event.target
      const drink = {
        drink_name: form.drink_name.value,
        guest_name: form.guest_name.value,
        serving_style: form.serving_style.value
    }
    
     // insert drink to supabase
      const result = await supabase.from("drinks").insert(drink).select()
      if (result.error) {
        setFormError(result.error.message)
        return
      }

        setFormError('')  
        console.log(result.data)
        form.reset()
       
  }



// remove drink function
    const deleteDrink = async (id) => {
    const result = await supabase.from("drinks").delete().eq("id", id)
      if (result.error){
        console.log(result.error.message)
        return 
      }
        reload()
    }



  // update servings 
      const updateServingStyle = async (drink, newStyle) => {
      const result = await supabase.from("drinks").update({ serving_style: newStyle }).eq("id", drink.id)

      if (result.error) {
        console.log(result.error.message)
        return
      }

      await loadDrinks()
    }





  return (  
    <div>
      <h1>Potluck</h1>
      <p>Total servings: {total}</p>
      <p>Total guests: {totalGuests}</p>
    <button onClick={loadMeals}>Load Meal </button> &nbsp;
        <div className="meals">
            {meals.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} onServeMore={addServing} />)}
        </div>
        <button onClick={loadDrinks}>Load Drink</button>

        <div className="meals">
            {drinks.map((drink) => <DrinkCard key={drink.id} drink={drink} onDelete={deleteDrink} onServeStyleChange={updateServingStyle}/>)}
        </div>
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
        <button className='addBtn'>Add Meal</button> 
          </form> 

          <form onSubmit={addDrink}>
              <input name="drink_name" placeholder="Drink" required />
              <input name="guest_name" placeholder="Your name" required />
                <select name="serving_style">
                  <option>One Shot</option>
                  <option>Straight</option>
                  <option>Mixed with Ice</option>
                  <option>No Ice</option>
                </select>
        <button className='addD'>Add Drink</button> &nbsp;
          </form> 
            &nbsp;
          <form onSubmit={search}>
            <input name="query" placeholder="Search dishes" />
            <button className='addBtn'>Search</button>
          </form>
          {found.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} />)}
              

          <button onClick={addTwo}>Add 2 Meal</button>

          <h2>Ayo's dishes</h2>
              {ayo.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} />)}

              <button onClick={showAyo}>Ask for table</button>
              {picked.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} />)}
              &nbsp; &nbsp;

            <h2>Three dishes</h2>
                <button onClick={showFirstThree}>Show three</button>
                {firstThree.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal}  />)}
                &nbsp;
              <button onClick={showNewest}>Newest</button>
              {newest.map((meal) => <MealCard key={meal.id} meal={meal} onDelete={deleteMeal} />)  }   

                <form onSubmit={pickGuest}> 
                  <select name="guest">
                    <option>Tom</option>
                    <option>Ben</option>
                    <option>Dammy</option>
                    <option>Liz</option>
                    <option>Kenny</option>
                  </select>
                  <button>Show</button>
                </form>

          <p>{formError}</p>
        </article>
    </div>
        )
      }

export default App
