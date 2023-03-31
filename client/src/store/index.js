import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isloggedIn: false,
};
const admininitialState = {
  isloggedIn: false,
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    login(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      state.isloggedIn = false;
      localStorage.removeItem("userId");
    },
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

const adminSlice = createSlice({
  name: "admin",
  initialState: admininitialState,
  reducers: {
    login(state) {
      state.isloggedIn = true;
    },
    logout(state) {
      state.isloggedIn = false;
      localStorage.removeItem("adminId");
      localStorage.removeItem("token");
    },
  },
});

export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    admin: adminSlice.reducer,
  },
});
