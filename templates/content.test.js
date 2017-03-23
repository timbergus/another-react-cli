/* globals test, expect */

import reducer from './content';

test('An action must return a message', () => {

  let action = {
    type: 'react-redux/content/GET_CONTENT',
    data: {
      subtitle: 'Fake data'
    }
  };

  expect(JSON.stringify(reducer(undefined, action))).toBe('{"subtitle":"Fake data"}');
});

test('No action must return an empty string', () => {
  expect(JSON.stringify(reducer(undefined, undefined))).toBe('{"subtitle":""}');
});
