import { busRoutesTypes } from '../types/busRoutesTypes';

const initialState = {
  busRoutes: [],
  isLoading: true,
  activeBusRoute: null,
};
export const busRoutesReducer = (state = initialState, action) => {
  switch (action.type) {
    case busRoutesTypes.GET_LIST_BUS_ROUTES_SUCCESS:
      return {
        ...state,
        busRoutes: action.payload,
        isLoading: false,
      };
    case busRoutesTypes.ADD_BUS_ROUTE_SUCCESS:
      return {
        ...state,
        busRoutes: [...state.busRoutes, action.payload],
      };
    case busRoutesTypes.UPDATE_BUS_ROUTE_SUCCESS:
      return {
        ...state,
        busRoutes: state.busRoutes.map((busRoute) => (busRoute.uid === action.payload.uid ? action.payload : busRoute)),
      };
    case busRoutesTypes.DELETE_BUS_ROUTE_SUCCESS:
      return {
        ...state,
        busRoutes: state.busRoutes.filter((busRoute) => busRoute.uid !== action.payload),
      };
    case busRoutesTypes.SET_ACTIVE_BUS_ROUTE:
      return {
        ...state,
        activeBusRoute: action.payload,
      };
    case busRoutesTypes.CLEAR_ACTIVE_BUS_ROUTE:
      return {
        ...state,
        activeBusRoute: null,
      };
    case busRoutesTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        busRoutes: state.busRoutes.map((busRoute) => (busRoute.uid === action.payload.uid ? action.payload : busRoute)),
      };
    default:
      return state;
  }
};
