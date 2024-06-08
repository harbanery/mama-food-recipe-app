const initialState = {
  alert: {
    status: `idle`,
    message: ``,
  },
  alertKey: 0,
};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case `ALERT_IDLE`:
      return {
        ...state,
        alert: { status: "idle", message: `` },
        alertKey: 0,
      };
    case `ALERT_SUCCESS`:
      return {
        ...state,
        alert: { status: "success", message: action.payload },
        alertKey: state.alertKey + 1,
      };
    case `ALERT_SUCCESS_NOT_CONTINUED`:
      return {
        ...state,
        alert: { status: "success", message: action.payload },
      };
    case `ALERT_FAILED`:
      return {
        ...state,
        alert: { status: "failed", message: action.payload },
        alertKey: state.alertKey + 1,
      };
    case `SET_ALERT_CUSTOM`:
      return {
        ...state,
        alert: action.payload,
        alertKey: state.alertKey + 1,
      };
    default:
      return state;
  }
};

export default alertReducer;
