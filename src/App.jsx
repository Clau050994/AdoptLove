import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';



function RecipeApp() {
  const SERVER_URL = 'https://api.spoonacular.com/recipes/random';
  const API = 'a5a7263d29c348bf9d99333ab34c974e';
  const number = 20;
  const [searchResult, setSearchResult] = useState([]);
  const [medianHealthScore, setMedianHealthScore] = useState(0);
  const [highestSpoonacularScore, setHighestSpoonacularScore] = useState(0);
  const [minpricePerServing, setMinpricePerServing] = useState(0);
  const [maxPricePerServing, setMaxPricePerServing] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [healthScoreFilter, setHealthScoreFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [displayedRecipes, setDisplayedRecipes] = useState([]);


  const searchRecipy = async () => {
    try{
      const request = await axios.get(`${SERVER_URL}?apiKey=${API}&number=${number}`)
      console.log(request.data.recipes)
      setSearchResult(request.data.recipes);
      setDisplayedRecipes(request.data.recipes);
     

      let sum = 0;
      for (let i = 0; i < request.data.recipes.length; i++) {
        sum += request.data.recipes[i].healthScore;
      }
      const median = sum / request.data.recipes.length;

      setMedianHealthScore(median);

      let newMAx = 0;
      for(let i =0; i < request.data.recipes.length; i++){
        newMAx = request.data.recipes[0].spoonacularScore;
        if(request.data.recipes[i].spoonacularScore > newMAx){
          newMAx = request.data.recipes[i].spoonacularScore;
        }
      }
      setHighestSpoonacularScore(newMAx);

      let minPricePerServing = request.data.recipes[0].pricePerServing;
      let maxPricePerServing = request.data.recipes[0].pricePerServing;

      for (let i = 1; i < request.data.recipes.length; i++) {
        const pricePerServing = request.data.recipes[i].pricePerServing;
        if (pricePerServing > maxPricePerServing) {
          maxPricePerServing = pricePerServing;
        }
        if (pricePerServing < minPricePerServing) {
          minPricePerServing = pricePerServing;
        }
      }
      setMinpricePerServing(minPricePerServing);
      setMaxPricePerServing(maxPricePerServing);
            
    }catch(error){
      console.log(error)
    }
   
}

const handleSearch = () => {
  const filtered = searchResult.filter(recipe => {
    return recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!healthScoreFilter || recipe.healthScore >= parseFloat(healthScoreFilter)) &&
      (!priceFilter || recipe.pricePerServing <= parseFloat(priceFilter));
  });
  console.log(filtered);
  setDisplayedRecipes(filtered);
};


useEffect(() => {
    searchRecipy();
}, []);


  return (
    <div className="App">
      <header className="App-header">
             <h1>Recipe App</h1>
      </header>
      {medianHealthScore && highestSpoonacularScore && minpricePerServing && maxPricePerServing &&
        <div className="stats-container">
          <div className="stat-card">
            <h2>Median Health Score</h2>
            <p>{medianHealthScore.toFixed(1)}</p>
          </div>
          <div className="stat-card">
            <h2>Highest Spoonacular Score</h2>
            <p>{highestSpoonacularScore.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <h2>Range Price Per Serving</h2>
            <p>${minpricePerServing.toFixed(2)} - ${maxPricePerServing.toFixed(2)}</p>
          </div>
        </div>
      }
      <div>
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          style={{ backgroundColor: 'white', color: 'black', marginRight: '10px'}}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <input
          type="number"
          placeholder="Minimum Health Score"
          value={healthScoreFilter}
          style={{ backgroundColor: 'white', color: 'black', marginRight: '10px'}}
          onChange={(e) => setHealthScoreFilter(e.target.value)}
        />
        <input
          type="number"
          placeholder="Maximum Price"
          value={priceFilter}
          style={{ backgroundColor: 'white', color: 'black', marginRight: '10px'}}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Health Score</th>
              <th>Price Per Serving</th>
              <th>Spoonacular Score</th>
            </tr>
          </thead>
          <tbody>
            {displayedRecipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe.title}</td>
                <td>{recipe.healthScore}</td>
                <td>${recipe.pricePerServing}</td>
                <td>{recipe.spoonacularScore}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  );  
  }



export default RecipeApp;
