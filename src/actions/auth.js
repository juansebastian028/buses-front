import { userTypes } from "../types/userTypes";

export const login = (user) => ({
  type: userTypes.LOGIN_REQUEST,
  payload: user
});

export const googleLogin = (user) => ({
  type: userTypes.LOGIN_GOOGLE_REQUEST,
  payload: user
}); 

export const logout = () => ({
  type: userTypes.LOGOUT,
})


