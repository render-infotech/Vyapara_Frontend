import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import secureLocalStorage from "react-secure-storage";
import { UserSliceProp, AuthData, User } from "../../../Type/Vyapara/Auth/User";

const getInitialState = (): UserSliceProp => {
  const isLoggedIn = secureLocalStorage.getItem("isLoggedIn") === true;
  const currentUser = secureLocalStorage.getItem("currentUser") as User | null;
  
  return {
    isLoggedIn: !!isLoggedIn,
    currentUser,
    loading: false,
    error: false,
    loggedInUserData: null,
  };
};

const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = false;
    },
    loginSuccess: (state, action: PayloadAction<AuthData>) => {
      const { user, token } = action.payload;

      secureLocalStorage.setItem("loginToken", token);
      secureLocalStorage.setItem("currentUser", user);
      secureLocalStorage.setItem("isLoggedIn", true);

      // localStorage.setItem(
      //   "loginUserChange",
      //   JSON.stringify({ timestamp: Date.now(), userId: user.email })
      // );

      state.isLoggedIn = true;
      state.loading = false;
      state.currentUser = user;
      state.error = false;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logOut: (state) => {
      secureLocalStorage.removeItem("loginToken");
      secureLocalStorage.removeItem("currentUser");
      secureLocalStorage.removeItem("isLoggedIn");
      // localStorage.setItem("logout", Date.now().toString());

      state.currentUser = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = false;
      state.loggedInUserData = null;
    },
    setLoggedInUserData: (state, action: PayloadAction<any>) => {
      state.loggedInUserData = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logOut,
  setLoggedInUserData,
} = userSlice.actions;

export default userSlice.reducer;
