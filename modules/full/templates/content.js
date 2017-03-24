const GET_CONTENT = 'react-redux/content/GET_CONTENT';

export function getContent () {
  return dispatch => {
    setTimeout(() => {
      dispatch({ type: GET_CONTENT, data: { subtitle: 'This is a subtitle' }});
    }, 5000);
  };
}

export default function reducer (state = { subtitle: '' }, action = {}) {
  switch (action.type) {
  case GET_CONTENT:
    return Object.assign({}, action.data);
  default:
    return state;
  }
}
