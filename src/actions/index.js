import API from '@/scripts/nytimes-api';

export const REQUEST_LIST = 'REQUEST_LIST';
export const RECEIVE_LIST = 'RECEIVE_LIST';

export const ADD_DETAIL = 'ADD_DETAIL';
export const SHOW_DETAIL = 'SHOW_DETAIL';
export const CLOSE_DETAIL = 'CLOSE_DETAIL';
export const REMOVE_DETAIL = 'REMOVE_DETAIL';

// List

let fetchTime = 0;

export const requestList = page => {
  return {
    type: REQUEST_LIST,
    page: page
  };
};

export const receiveList = (data, page) => {
  return {
    type: RECEIVE_LIST,
    items: data,
    page: page,
    time: Date.now()
  };
};

function fetch(page, dispatch) {
  API({page})
    .then((res) => {
      if (res.data.status === 'OK') {
        const list = res.data.response.docs;
        dispatch(receiveList(list, page + 1));
      } else {
        dispatch(receiveList(new Array(10).fill(null), page + 1));
        dispatch(showErr(res));
      }
    })
    .catch((res) => {
      if (res.status === 500) {
        fetchTime++;
        if (fetchTime < 3) {
          setTimeout (() => fetchList(page), 600);
        }
      } else {
        dispatch(receiveList(new Array(10).fill(null), page + 1));
        dispatch(showErr(res));
      }
    });
}

export const fetchList = page => (dispatch, getState) => {
  let state = getState();
  if (state.list.isFetching) return;
  dispatch(requestList(page + 1));
  if (state.list.lastUpdated) {
    if (state.list.lastUpdated + state.list.distanceTimePerFetch > Date.now()) {
      setTimeout(
        () => {
          fetch(page, dispatch);
        }, state.list.lastUpdated + state.list.distanceTimePerFetch - Date.now()
      );
    } else {
      fetch(page, dispatch);
    }
  } else {
    fetch(page, dispatch);
  }
};

// Error
export const showErr = err => dispatch => {
  // catch err

  let errString = 'Have a error, please refresh your browser!';
  dispatch(showModal(errString, true));
};

// Detail

export const addDetail = (data, error) => {
  return {
    type: ADD_DETAIL,
    data,
    error: error
  };
};

export const showDetail = () => {
  return {
    type: SHOW_DETAIL
  };
};

export const closeDetail = () => {
  return {
    type: CLOSE_DETAIL
  };
};

export const removeDetail = () => {
  return {
    type: REMOVE_DETAIL
  };
};

export const showModal = (data, error = false) => dispatch => {
  dispatch(addDetail(data, error));
  dispatch(showDetail());
};

export const closeModal = () => dispatch => {
  dispatch(closeDetail());
  dispatch(removeDetail());
};
