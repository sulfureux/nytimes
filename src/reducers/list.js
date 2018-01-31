import {
  REQUEST_LIST,
  RECEIVE_LIST
} from '@/actions';

const list = (state = {
  items: new Array(10).fill(null),
  currentPage: 1,
  isFetching: false,
  distanceTimePerFetch: 1000
}, action) => {
  switch (action.type) {
  case REQUEST_LIST:
    return {
      ...state,
      isFetching: true,
      currentPage: action.page
    };
  case RECEIVE_LIST:
    return {
      ...state,
      isFetching: false,
      items: action.items,
      currentPage: action.page,
      lastUpdated: action.time
    };
  default:
    return state;
  }
};

export default list;
