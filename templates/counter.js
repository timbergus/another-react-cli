const INCREMENT = 'react-mfa/counter/INCREMENT';
const DECREMENT = 'react-mfa/counter/DECREMENT';

export function incrementCounter () {
  return { type: INCREMENT };
}

export function decrementCounter () {
  return { type: DECREMENT };
}

export default function reducer (state = 0, action = {}) {
  switch (action.type) {
  case INCREMENT:
    return state + 1;
  case DECREMENT:
    return state - 1;
  default:
    return state;
  }
}
