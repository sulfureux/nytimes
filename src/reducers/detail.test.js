import detail from '@/reducers/detail';
import {
  ADD_DETAIL,
  SHOW_DETAIL,
  CLOSE_DETAIL,
  REMOVE_DETAIL
} from '@/actions';

describe('Test for detail reducer', () => {
  test('Add detail', () => {
    expect(detail({
      isShow: false,
      data: {},
      error: false
    }, {
      type: ADD_DETAIL,
      data: {test: 'detail'},
      error: false
    })).toEqual({
      isShow: false,
      data: {test: 'detail'},
      error: false
    });
  });
  test('Add error', () => {
    expect(detail({
      isShow: false,
      data: {},
      error: false
    }, {
      type: ADD_DETAIL,
      data: {test: 'detail'},
      error: true
    })).toEqual({
      isShow: false,
      data: {test: 'detail'},
      error: true
    });
  });
  test('Show detail', () => {
    expect(detail({
      isShow: false,
      data: {},
      error: false
    }, {
      type: SHOW_DETAIL
    })).toEqual({
      isShow: true,
      data: {},
      error: false
    });
  });
  test('Close detail', () => {
    expect(detail({
      isShow: true,
      data: {test: 'test'},
      error: false
    }, {
      type: CLOSE_DETAIL
    })).toEqual({
      isShow: false,
      data: {test: 'test'},
      error: false
    });
  });
  test('Remove detail', () => {
    expect(detail({
      isShow: true,
      data: {test: 'test'},
      error: false
    }, {
      type: REMOVE_DETAIL
    })).toEqual({
      isShow: true,
      data: {},
      error: false
    });
  });
});
