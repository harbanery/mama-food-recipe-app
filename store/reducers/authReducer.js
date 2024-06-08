const initialState = {
  isAuth: false,
  loading: false,
  // alert: {
  //   status: `idle`,
  //   message: ``,
  // },
  // alertKey: 0,
  // errors: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `AUTH_REQUEST`:
      return {
        ...state,
        loading: true,
        // alert: { status: "idle", message: `` },
        // alertKey: 0,
        // errors: {},
      };
    case `AUTH_SUCCESS`:
      return {
        ...state,
        isAuth: true,
        loading: false,
        // alert: { status: "success", message: action.payload.message },
        // alertKey: state.alertKey + 1,
      };
    case `AUTH_FAILURE`:
      return {
        ...state,
        loading: false,
        // alert: { status: "failed", message: action.payload.message },
        // alertKey: state.alertKey + 1,
      };
    // case `VALIDATION_FAILURE`:
    //   return {
    //     ...state,
    //     errors: action.payload,
    //   };
    // case `FORM_AGREED_FAILED`:
    //   return {
    //     ...state,
    //     alert: {
    //       status: "failed",
    //       message: "You should agree terms & conditions!",
    //     },
    //     alertKey: state.alertKey + 1,
    //   };
    // case `CHECK_VALIDATION_ERROR`:
    //   return {
    //     ...state,
    //     errors: action.payload.errors,
    //   };
    // case `SET_ALERT`:
    //   return {
    //     ...state,
    //     alert: action.payload,
    //     alertKey: state.alertKey + 1,
    //   };
    case `AUTH_LOGOUT`:
      return {
        ...state,
        isAuth: false,
        loading: false,
        // alert: {
        //   status: `idle`,
        //   message: ``,
        // },
        // alertKey: 0,
        // errors: {},
      };
    default:
      return state;
  }
};

export default authReducer;
