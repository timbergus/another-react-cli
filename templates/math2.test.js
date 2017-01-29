/* eslint-disable no-undef */

import { sum } from './math2';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('No first argument return second', () => {
  expect(sum(undefined, 2)).toBe(2);
});

test('No second argument return first', () => {
  expect(sum(3)).toBe(3);
});
