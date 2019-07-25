import React, { createContext, useReducer, useContext } from "react";
import PropTypes from "prop-types";

//import { countInitialState, countActions } from "./count";
import { userInitialState, userActions } from "./User";

const initialState = {
//  ...countInitialState,
  ...userInitialState
};

const StoreContext = createContext(initialState);

const Actions = {
  ...userActions,
 // ...countActions
};

const reducer = (state, action) => {
  console.log("in reducer", state, action);

  state.user.userType = action.userType;
  state.user.token = action.token;
  state.user.userId = action.userId;

  const act = Actions[action.type];
  const update = act(state);
  return { ...state, ...update };
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

StoreProvider.propTypes = {
  children: PropTypes.node
};

export const useStore = store => {
  const { state, dispatch } = useContext(StoreContext);

  //const value = useContext(StoreContext);
  console.log("userStore", state);
  return { state, dispatch };
};
