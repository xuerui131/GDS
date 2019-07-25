export const userInitialState = {
    user: { loggedIn: false, userId: -1, userType: "经销商", token: null }
  };
  
  export const userActions = {
    login: state => {
      console.log("userActions->login", state);
      return { user: { loggedIn: true, userId:state.user.userId, userType: state.user.userType, token: state.user.token } };
    },
    logout: state => {
      return { user: { loggedIn: false } };
    },
    changeUserType: state => {
      // console.log("changeUserType:");
      // console.log(state);
      // console.log(state.user.userType);
      return {
        user: {userType: state.user.userType}};
    }
  };
  