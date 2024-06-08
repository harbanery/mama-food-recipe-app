const initialState = {
  allRecipes: [],
  newestRecipe: {},
  popularRecipes: [],
  yourPopularRecipes: [],
  detailRecipe: {},
  params: {
    search: "",
    page: 1,
    limit: 6,
  },
};

const recipeReducers = (state = initialState, action) => {
  switch (action.type) {
    case `GET_ALL_RECIPES`:
      return {
        ...state,
        allRecipes: action.payload,
      };
    case "GET_DETAIL_RECIPE":
      return {
        ...state,
        detailRecipe: action.payload,
      };
    case `SET_NEW_RECIPE`:
      return {
        ...state,
        newestRecipe: action.payload,
      };
    case "SET_POPULAR_RECIPES":
      return {
        ...state,
        popularRecipes: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducers;
