import { authTypes } from "../types/authTypes";

export const login = (user) => ({
  type: authTypes.LOGIN_REQUEST,
  payload: user
});

export const googleLogin = (user) => ({
  type: authTypes.LOGIN_GOOGLE_REQUEST,
  payload: user
}); 

export const logout = () => ({
  type: authTypes.LOGOUT,
})


