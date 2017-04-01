/* globals test, expect */

import reducer, { incrementCounter, decrementCounter } from './counter';

test('incrementCounter counter must return action', () => {
  expect(JSON.stringify(incrementCounter())).toBe('{"type":"react-mfa/counter/INCREMENT"}');
});

test('decrementCounter counter must return action', () => {
  expect(JSON.stringify(decrementCounter())).toBe('{"type":"react-mfa/counter/DECREMENT"}');
});

test('incrementCounter must increment state in 1', () => {
  expect(reducer(0, { type: 'react-mfa/counter/INCREMENT' })).toBe(1);
});

test('decrementCounter must decrement state in 1', () => {
  expect(reducer(0, { type: 'react-mfa/counter/DECREMENT' })).toBe(-1);
});

test('No action return the state', () => {
  expect(reducer(undefined, undefined)).toBe(0);
});
