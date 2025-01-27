import { likeRecipe, saveRecipe } from "../../services/action";
import { addRecipe, deleteRecipe, updateRecipe } from "../../services/recipes";
import { recipeValidation } from "../../utils/validation";

export const addRecipeAction = (recipe, token, router) => async (dispatch) => {
  dispatch({ type: `VALIDATION_REQUEST` });
  dispatch({ type: `ALERT_IDLE` });
  try {
    await recipeValidation.validate(recipe, { abortEarly: false });

    dispatch({ type: `VALIDATION_SUCCESS` });

    try {
      const { message } = await addRecipe({ data: recipe, token });

      dispatch({
        type: `ALERT_SUCCESS`,
        payload: message,
      });

      router.replace("/profile");
    } catch (error) {
      console.error(error);
      dispatch({
        type: `ALERT_FAILED`,
        payload: error.message,
      });
    }
  } catch (err) {
    if (err.inner) {
      const validateErrors = err.inner.reduce((acc, curr) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
      dispatch({
        type: `VALIDATION_FAILURE`,
        payload: validateErrors,
      });
      dispatch({
        type: `ALERT_FAILED`,
        payload: `Recipe should not empty`,
      });
    }
  }
};

export const updateRecipeAction =
  (recipe, token, router) => async (dispatch) => {
    dispatch({ type: `VALIDATION_REQUEST` });
    dispatch({ type: `ALERT_IDLE` });
    try {
      await recipeValidation.validate(recipe, { abortEarly: false });

      dispatch({ type: `VALIDATION_SUCCESS` });

      try {
        const { message } = await updateRecipe({ data: recipe, token });

        dispatch({
          type: `ALERT_SUCCESS`,
          payload: message,
        });

        router.replace("/profile");
      } catch (error) {
        dispatch({
          type: `ALERT_FAILED`,
          payload: error.message,
        });
      }
    } catch (err) {
      if (err.inner) {
        const validateErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        dispatch({
          type: `VALIDATION_FAILURE`,
          payload: validateErrors,
        });
        dispatch({
          type: `ALERT_FAILED`,
          payload: `Recipe should not empty`,
        });
      }
    }
  };

export const deleteRecipeAction = (id, token, router) => async (dispatch) => {
  dispatch({ type: `ALERT_IDLE` });
  try {
    const result = await deleteRecipe({ id, token });

    if (result.code === 500) {
      dispatch({
        type: `ALERT_FAILED`,
        payload:
          "You can't delete this recipe because someone liked or saved this recipe.",
      });
      return;
    }

    dispatch({
      type: `ALERT_SUCCESS`,
      payload: result.message,
    });

    router.replace(router.asPath, undefined, { scroll: false });
  } catch (error) {
    dispatch({
      type: `ALERT_FAILED`,
      payload: error.message,
    });
  }
};

export const saveAction = (recipe_id, token, router) => async (dispatch) => {
  dispatch({ type: `ALERT_IDLE` });
  try {
    const result = await saveRecipe({ id: recipe_id, token });

    dispatch({
      type: `ALERT_SUCCESS`,
      payload: result.message,
    });

    router.replace(router.asPath, undefined, { scroll: false });
  } catch (error) {
    dispatch({
      type: `ALERT_FAILED`,
      payload: error.message,
    });
  }
};

export const likeAction = (recipe_id, token, router) => async (dispatch) => {
  dispatch({ type: `ALERT_IDLE` });
  try {
    const result = await likeRecipe({ id: recipe_id, token });

    dispatch({
      type: `ALERT_SUCCESS`,
      payload: result.message,
    });

    router.replace(router.asPath, undefined, { scroll: false });
  } catch (error) {
    dispatch({
      type: `ALERT_FAILED`,
      payload: error.message,
    });
  }
};
