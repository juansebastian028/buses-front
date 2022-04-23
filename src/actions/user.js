import { userTypes } from "../types/userTypes";

export const getListUsers = () => ({
  type: userTypes.GET_LIST_USERS_REQUEST,
});

export const userDeleted = (id) => ({
  type: userTypes.DELETE_USER_REQUEST,
  payload: id
}); 

export const userAdded = (user) => ({
  type: userTypes.ADD_USER_REQUEST,
  payload: user
})

export const userUpdated = (user) => ({
  type: userTypes.UPDATE_USER_REQUEST,
  payload: user
})

export const clearActiveUser = () => ({
  type: userTypes.CLEAR_ACTIVE_USER
})

export const setActiveUser = (user) => ({
  type: userTypes.SET_ACTIVE_USER,
  payload: user
})

export const addBusRouteToFavourites = (userId, busRouteId) => ({
  type: userTypes.ADD_BUS_ROUTE_TO_FAVOURITES,
  userId,
  busRouteId
})

export const removeBusRouteFromFavourites = (busRouteId) => ({
  type: userTypes.REMOVE_BUS_ROUTE_FROM_FAVOURITES,
  payload: busRouteId
})
