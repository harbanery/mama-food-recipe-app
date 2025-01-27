import { login, logout, register } from "../../services/auth";
import { deleteToken, insertToken } from "../../utils/cookies";
import { loginValidation, registerValidation } from "../../utils/validation";

export const loginAction = (form, formAgreed, router) => async (dispatch) => {
  dispatch({ type: `VALIDATION_REQUEST` });
  try {
    await loginValidation.validate(form, { abortEarly: false });

    if (!formAgreed) {
      return dispatch({
        type: `ALERT_FAILED`,
        payload: "You should agree terms & conditions!",
      });
    }

    dispatch({ type: `AUTH_REQUEST` });
    dispatch({ type: `ALERT_IDLE` });
    dispatch({ type: `VALIDATION_SUCCESS` });

    try {
      const { token, refreshToken, message, status } = await login({ form });

      if (status === 200) {
        dispatch({
          type: `AUTH_SUCCESS`,
        });
        dispatch({
          type: `ALERT_SUCCESS`,
          payload: message,
        });
        insertToken({ token, refreshToken });
        router.push("/");
      } else {
        dispatch({
          type: `AUTH_FAILURE`,
        });
        dispatch({
          type: `ALERT_FAILED`,
          payload: message,
        });
      }
    } catch (error) {
      dispatch({
        type: `AUTH_FAILURE`,
      });
      dispatch({
        type: `ALERT_FAILED`,
        payload: error.message,
      });
    }
  } catch (err) {
    if (err.inner) {
      const formErrors = err.inner.reduce((acc, curr) => {
        return { ...acc, [curr.path]: curr.message };
      }, {});
      dispatch({
        type: `VALIDATION_FAILURE`,
        payload: formErrors,
      });
    }
  }
};

export const registerAction =
  (form, formAgreed, router) => async (dispatch) => {
    dispatch({ type: `VALIDATION_REQUEST` });
    try {
      await registerValidation.validate(form, { abortEarly: false });

      if (!formAgreed) {
        return dispatch({
          type: `ALERT_FAILED`,
          payload: "You should agree terms & conditions!",
        });
      }

      dispatch({ type: `AUTH_REQUEST` });
      dispatch({ type: `ALERT_IDLE` });
      dispatch({ type: `VALIDATION_SUCCESS` });

      try {
        const { message } = await register({ form });

        dispatch({
          type: `AUTH_SUCCESS`,
        });
        dispatch({
          type: `ALERT_SUCCESS`,
          payload: message,
        });
        router.replace("/login");
      } catch (error) {
        dispatch({
          type: `AUTH_FAILURE`,
        });
        dispatch({
          type: `ALERT_FAILED`,
          payload: error.message,
        });
      }
    } catch (err) {
      if (err.inner) {
        const formErrors = err.inner.reduce((acc, curr) => {
          return { ...acc, [curr.path]: curr.message };
        }, {});
        dispatch({
          type: `VALIDATION_FAILURE`,
          payload: formErrors,
        });
      }
    }
  };

export const clearErrorForms = (name) => (dispatch, getState) => {
  const errors = getState().validation.errors;

  dispatch({
    type: "CHECK_VALIDATION_ERROR",
    payload: {
      errors: { ...errors, [name]: "" },
    },
  });
};

export const logoutAction = (router) => async (dispatch) => {
  try {
    await logout();
    deleteToken();
    dispatch({ type: `ALERT_IDLE` });
    dispatch({
      type: `AUTH_LOGOUT`,
    });
    router.push("/login");
  } catch (error) {
    dispatch({
      type: `AUTH_FAILURE`,
    });
  }
};
