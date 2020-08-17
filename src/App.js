import React, {useEffect,useState} from 'react';
import Recipe from './Recipe';
import './App.css';

function App() {
  const YOUR_APP_ID = "7b9951c5";
    const YOUR_APP_KEY = "78a0efae56fec07212adefc77d5f9226";
    const [recipes,setRecipes] = useState([]);
    const [search,setSearch] = useState('');
    const [query, setQuery] = useState('chicken');
    
    useEffect( () =>{
        getRecipes();
    }, [query]);
    
    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`);
        const data = await response.json();
        setRecipes(data.hits);
    };
    
    const updateSearch = e => {
         e.preventDefault();
        setSearch(e.target.value);
    }
    
    const getQuery = e =>{
        e.preventDefault();
        if (search === '') {
            alert('Please enter a recipe.');
        }
        else {
          setQuery(search);
          setSearch('');  
        }
        
    }
    return (
    
        <div className="App">
      <form onSubmit = {getQuery} className='search-form'>
          <input className='search-bar' type = 'text' placeholder='Enter Recipe' value={search} onChange= {updateSearch}/>
          <button className = 'search-button' type = 'submit'>Search</button>
      </form>
      <div className='recipes'>
      {recipes.map(recipe =>(
            <Recipe  key={recipe.recipe.label} title={recipe.recipe.label} calories= {recipe.recipe.calories} image={recipe.recipe.image} ingredients = {recipe.recipe.ingredients}/>
            ))};
            </div>
    </div>
  );
}

export default App;
