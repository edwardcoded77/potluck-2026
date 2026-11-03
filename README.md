# Potluck App

## The Problem:

Organizing a potluck can be difficult when guests need to coordinate what food and drinks to bring. Without a central place to record contributions, it can be hard to keep track of meals, servings, drinks, and who is bringing them.

## The Plan:

Build a simple application where guests' meals and drinks can be recorded, viewed, updated, searched, and deleted. Store the information in a Supabase database so the records remain available.

### Data:

Database: `Supabase`

The application uses two tables:

**1. Meals Table**

| ID | Name | Guest | Servings | Kind of Dish | Created At |
|---|---|---|---:|---|---|
| 1 | Pancakes | Tom | 2 | Main | Automatically generated |
| 2 | Jollof Rice | Ayo | 5 | Main | Automatically generated |
| 3 | Ice Cream | Sola | 1 | Dessert | Automatically generated |

**2. Drinks Table**

| ID | Drink Name | Guest Name | Serving Style | Created At |
|---|---|---|---|---|
| 1 | Coca-Cola | Tom | One Shot | Automatically generated |
| 2 | Orange Juice | Ayo | Straight | Automatically generated |
| 3 | Lemonade | Sola | Mixed with Ice | Automatically generated |



### Sections

- A visitor sees the total number of guests and total servings.
- A visitor sees meals submitted by guests.
- A visitor sees drinks submitted by guests.
- A visitor can view meals by guest.
- A visitor can search for dishes.
- A visitor can view a limited number of meals or the newest meals.

### User Actions

- A visitor adds a meal with the dish name, guest name, servings, and type of dish.
- A visitor adds a drink with its name, guest name, and serving style.
- A visitor increases the servings of a meal.
- A visitor updates the serving style of a drink.
- A visitor searches for meals by name.
- A visitor selects a guest to view their dishes.
- A visitor deletes a meal or drink.



## Links

- **Live:** https://potluck-2026.vercel.app/
- **Repository:** https://github.com/edwardcoded77/potluck-2026
