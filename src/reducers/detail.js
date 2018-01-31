import {
  ADD_DETAIL,
  SHOW_DETAIL,
  CLOSE_DETAIL,
  REMOVE_DETAIL
} from '@/actions';

const detail = (state = {
  isShow: false,
  data: {},
  error: false
}, action) => {
  switch (action.type) {
  case ADD_DETAIL:
    return {
      ...state,
      data: action.data,
      error: action.error
    };
  case SHOW_DETAIL:
    return {
      ...state,
      isShow: true
    };
  case CLOSE_DETAIL:
    return {
      ...state,
      isShow: false
    };
  case REMOVE_DETAIL:
    return {
      ...state,
      data: {}
    };
  default:
    return state;
  }
};

export default detail;
