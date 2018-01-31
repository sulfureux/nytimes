import ReactTestUtils from 'react-dom/test-utils';
import React from 'react';
import News from '@/components/News/News';

const component = ReactTestUtils.renderIntoDocument(
  <News loaded={true} data={{
    snippet: 'Title news - abc',
    pub_date: '2018-01-26T14:03:34+0000',
    source: 'hehe'
  }} />
);

const snippet = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'news-title');
const pub_date = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'news-date');
const source = ReactTestUtils.findRenderedDOMComponentWithClass(component, 'news-source');

test('Test for News component', () => {
  expect(snippet.innerHTML).toEqual('Title news - abc');
  expect(pub_date.innerHTML).toEqual('<span>Public date: 2018-01-26T14:03:34+0000</span>');
  expect(source.innerHTML).toEqual('<span>source: hehe</span>');
});
