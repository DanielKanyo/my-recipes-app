import {
  db
} from './firebase';

// Create user
export const doCreateUser = (id, username, email, language) => {
  return db.ref(`users/${id}`).set({
    username,
    email,
    language
  });
}

// Get all user
export const onceGetUsers = () =>
  db.ref('users').once('value');

// Get user data
export const getUserInfo = (id) =>
  db.ref(`users/${id}`).once('value').then(function (snap) {
    return snap.val();
  });

// Save recipe 
export const addRecipe = (id, recipe) => {
  let recipesRef = db.ref(`recipes`);
  let recipeRef = recipesRef.push();

  recipeRef.set({
    userId: id,
    category: recipe.category,
    creationTime: recipe.creationTime,
    longDes: recipe.longDes,
    prepTime: recipe.prepTime,
    publicChecked: recipe.publicChecked,
    story: recipe.story,
    ingredients: recipe.ingredients,
    sliderValue: recipe.sliderValue,
    title: recipe.title
  });

  return recipeRef;
}

// Get users recipes
export const getUsersRecipes = () => {
  return db.ref(`recipes`).once('value').then(function (snap) {
    return snap.val();
  });
}

// Remove recipe
export const removeRecipe = (recipeId) => {
  let recipeRef = db.ref(`recipes/${recipeId}`);
  recipeRef.remove();
}

// Update user info
export const updateUserInfo = (id, username, language) => {
  let userRef = db.ref(`users/${id}`);

  return userRef.update({
    username,
    language
  });
}

// Update recipe visibility
export const updateRecipeVisibility = (recipeId, visibility) => {
  let recipeRef = db.ref(`recipes/${recipeId}`);

  return recipeRef.update({
    publicChecked: visibility
  });
}

export const addRecipeToFavourites = (userId, recipeId) => {
  let favouritesRef = db.ref(`users/${userId}/favourites`);
  let favouriteRef = favouritesRef.push();

  favouriteRef.set({
    userId,
    recipeId
  });

  return favouriteRef;
}

export const removeRecipeFromFavourites = (userId, favouriteId) => {
  let favouriteRef = db.ref(`users/${userId}/favourites/${favouriteId}`);
  favouriteRef.remove();
}