import {Actions} from '../actions';

const Reducer = (state, action) => {
  switch(action.type) {
    case Actions.SET_FILE:
      return {...state, file: action.file};
    case Actions.SET_TEXT:
      return {...state, text: action.text};
    case Actions.SET_QUESTION:
      return {...state, question: action.question};
    case Actions.SET_ANSWER:
      return {...state, answer: action.answer};
    case Actions.SET_LOADING:
      return {...state, loading: action.loading};
    case Actions.SET_ROTATION:
      return {...state, rotation: action.rotation};
    case Actions.SET_ERROR:
      return {...state, error: action.error}
    default:
      return state;
  }
}

export default Reducer;
