import { busRoutesTypes } from "../types/busRoutesTypes";

export const getListBuses = () => ({
  type: busRoutesTypes.GET_LIST_BUS_ROUTES_REQUEST,
});

export const getBusRouteById = (id) => ({
  type: busRoutesTypes.GET_BUS_ROUTE_REQUEST,
  payload: id
});

export const busRouteDeleted = (id) => ({
  type: busRoutesTypes.DELETE_BUS_ROUTE_REQUEST,
  payload: id
}); 

export const busRouteAdded = (busRoute) => ({
  type: busRoutesTypes.ADD_BUS_ROUTE_REQUEST,
  payload: busRoute
})

export const busRouteUpdated = (busRoute) => ({
  type: busRoutesTypes.UPDATE_BUS_ROUTE_REQUEST,
  payload: busRoute
})

export const clearActiveBusRoute = () => ({
  type: busRoutesTypes.CLEAR_ACTIVE_BUS_ROUTE
})

export const setActiveBusRoute = (busRoute) => ({
  type: busRoutesTypes.SET_ACTIVE_BUS_ROUTE,
  payload: busRoute
})

export const addComment = (comment) => ({
  type: busRoutesTypes.ADD_COMMENT_REQUEST,
  payload: comment
})
