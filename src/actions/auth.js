import { authTypes } from "../types/authTypes";

export const login = (user, navigate) => ({
  type: authTypes.LOGIN_REQUEST,
  payload: user,
  navigate
});

export const googleLogin = (user, navigate) => ({
  type: authTypes.LOGIN_GOOGLE_REQUEST,
  payload: user,
  navigate
}); 

export const logout = (navigate) => ({
  type: authTypes.LOGOUT_REQUEST,
  navigate
});

export const getRoles = () => ({
  type: authTypes.GET_LIST_ROLES_REQUEST,
})

export const currentUserUpdated = (user) => ({
  type: authTypes.UPDATE_CURRENT_USER,
  payload: user
})
