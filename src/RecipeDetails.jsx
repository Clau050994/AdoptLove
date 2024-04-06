import { useLocation } from 'react-router-dom';

const RecipeDetails = () => {
  const location = useLocation();
  const { recipe } = location.state;

  return (
    <div className="recipe-details">
      <h2>{recipe.title}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipe-metrics">
        <p>Health Score: {recipe.healthScore}</p>
        <p>Price Per Serving: ${recipe.pricePerServing.toFixed(2)}</p>
        <p>Spoonacular Score: {recipe.spoonacularScore.toFixed(2)}</p>
        <p>Servings: {recipe.servings}</p>
        <p>Ready In Minutes: {recipe.readyInMinutes}</p>
      </div>
      <div className="recipe-summary" dangerouslySetInnerHTML={{ __html: recipe.summary }} />
      <div className="recipe-instructions">
        <h3>Instructions:</h3>
        <p>{recipe.instructions}</p>
      </div>
    </div>
  );
};

export default RecipeDetails;
