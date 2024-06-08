const initialState = {
  errors: {},
};

const validationReducer = (state = initialState, action) => {
  switch (action.type) {
    case `VALIDATION_REQUEST`:
      return {
        ...state,
        errors: state.errors,
      };
    case `VALIDATION_SUCCESS`:
      return {
        ...state,
        errors: {},
      };
    case `VALIDATION_FAILURE`:
      return {
        ...state,
        errors: action.payload,
      };
    case `CHECK_VALIDATION_ERROR`:
      return {
        ...state,
        errors: action.payload.errors,
      };
    default:
      return state;
  }
};

export default validationReducer;
