import {
  REQUEST_LIST,
  RECEIVE_LIST,
  requestList,
  receiveList
} from '@/actions';

const DATE_TO_USE = new Date('2016');
const _Date = Date;
global.Date = jest.fn(() => DATE_TO_USE);
global.Date.UTC = _Date.UTC;
global.Date.parse = _Date.parse;
global.Date.now = _Date.now;

describe('Test for actions', () => {
  test('requestList', () => {
    expect(requestList(0)).toEqual({
      type: REQUEST_LIST,
      page: 0
    });
  });

  test('receiveList', () => {
    expect(receiveList({doc: [null, null]}, 0)).toEqual({
      type: RECEIVE_LIST,
      items: {
        doc: [null, null],
      },
      page: 0,
      time: global.Date.now()
    });
  });
});
