# Potluck App

## Project Description

Potluck is a React application that helps organize meals and drinks for a potluck gathering. Users can add, view, search, update, and delete meal and drink records.

## Technologies Used

- React
- JavaScript
- Vite
- Supabase (PostgreSQL)
- Bun
- Pico CSS

## Database Structure

The application uses two Supabase tables:

**Meals**

`id`, `created_at`, `name`, `guest`, `ingredients`, `servings`, `kind_of_dish`

**Drinks**

`id`, `created_at`, `drink_name`, `guest_name`, `serving_style`

## Features

- Add and delete meals and drinks.
- View total guests and servings.
- Search meals by name.
- Filter meals by guest.
- Increase meal servings.
- Update drink serving styles.
- Display newest meals and limit results.

## Setup Instructions

   ## Setup Instructions

1. Install dependencies:

   ```bash
   bun install
   ```

2. Create a `.env` file in the project root and add your Supabase credentials:

   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start the development server:

   ```bash
   bun run dev
   ```

4. Open the local URL displayed in your terminal.

## Links

- **Live:** https://potluck-2026.vercel.app/
- **GitHub:** https://github.com/edwardcoded77/potluck-2026
