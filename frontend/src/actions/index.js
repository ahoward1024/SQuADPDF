export const setFile = file => ({
  type: Actions.SET_FILE,
  file
});

export const setText = text => ({
  type: Actions.SET_TEXT,
  text
});

export const appendText = text => ({
  type: Actions.APPEND_TEXT,
  text
});

export const setQuestion = question => ({
  type: Actions.SET_QUESTION,
  question
});

export const setAnswer = answer => ({
  type: Actions.SET_ANSWER,
  answer
});

export const setLoading = loading => ({
  type: Actions.SET_LOADING,
  loading
});

export const setRotation = rotation => ({
  type: Actions.SET_ROTATION,
  rotation
})

export const setError = error => ({
  type: Actions.SET_ERROR,
  error
});

export const Actions = Object.freeze({
  SET_FILE: 'SET_FILE',
  SET_TEXT: 'SET_TEXT',
  APPEND_TEXT: 'APPEND_TEXT',
  SET_QUESTION: 'SET_QUESTION',
  SET_ANSWER: 'SET_ANSWER',
  SET_LOADING: 'SET_LOADING',
  SET_ROTATION: 'SET_ROTATION',
  SET_ERROR: 'SET_ERROR'
});
