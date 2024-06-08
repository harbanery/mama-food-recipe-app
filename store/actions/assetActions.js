import { uploadImage } from "../../services/assets";

export const uploadImageAction =
  (file, recipe, setRecipe) => async (dispatch, getState) => {
    const errors = getState().validation.errors;
    dispatch({ type: `ALERT_IDLE` });

    try {
      const { url } = await uploadImage({ file });

      dispatch({
        type: `ALERT_SUCCESS`,
        payload: `Photo added successfully.`,
      });

      setRecipe({
        ...recipe,
        image: url,
      });

      dispatch({
        type: "CHECK_VALIDATION_ERROR",
        payload: {
          errors: { ...errors, image: "" },
        },
      });
    } catch (error) {
      dispatch({
        type: `ALERT_FAILED`,
        payload: error.message,
      });
    }
  };
