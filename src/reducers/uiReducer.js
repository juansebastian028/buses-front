import { uiTypes } from '../types/uiTypes';

const initialState = {
  isModalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiTypes.UI_OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case uiTypes.UI_CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };
    default:
      return state;
  }
};
