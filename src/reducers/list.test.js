import list from '@/reducers/list';
import {
  REQUEST_LIST,
  RECEIVE_LIST
} from '@/actions';

describe('Test for list reducer', () => {
  test('Request list', () => {
    let items = new Array(10).fill(null);
    expect(list({
      items,
      currentPage: 1,
      isFetching: false,
      distanceTimePerFetch: 1000
    }, {
      type: REQUEST_LIST,
      page: 1
    })).toEqual({
      items,
      currentPage: 1,
      isFetching: true,
      distanceTimePerFetch: 1000
    });
  });
  test('Add list', () => {
    let items = new Array(10).fill(null);
    let date = Date.now();
    expect(list({
      items,
      currentPage: 1,
      isFetching: false,
      distanceTimePerFetch: 1000
    }, {
      type: RECEIVE_LIST,
      items,
      page: 2,
      time: date
    })).toEqual({
      items,
      lastUpdated: date,
      currentPage: 2,
      isFetching: false,
      distanceTimePerFetch: 1000
    });
  });
});
