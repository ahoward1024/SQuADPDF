import React from 'react';
import {setQuestion, setAnswer, setLoading, setError} from '../actions';
import {store} from '../index';

async function sendToServer(text, question, file) {
  let formData = new FormData();
  formData.append('question', question);
  formData.append('text', text);
  formData.append('file', file);
  fetch('http://localhost:8000/data', {
    'method': 'POST',
    'body': formData
  })
  .then(response => {
    if(response.status !== 200) {
      throw new Error(`${response.statusText}`);
    }
    return response.json()
  })
  .then(json => {
    console.log(json);
    const answer = json.answer;
    store.dispatch(setLoading(false));
    store.dispatch(setAnswer(answer));
  })
  .catch(error => {
    store.dispatch(setLoading(false));
    store.dispatch(setError('Server error!'));
    console.log(error);
  });
}

const handleQuestionChange = (event) => {
  const question = event.target.value;
  store.dispatch(setQuestion(question));
}

const handleSendQuestion = (event) => {
  const file = store.getState().file;
  if(file === null || file === undefined) {
    const message = 'Please upload a file first';
    store.dispatch(setError(message));
    console.log(message);
    return;
  } else {
    store.dispatch(setError(''));
  }

  const question = store.getState().question;
  if(question === '') {
    const message = 'Please enter a question';
    store.dispatch(setError(message));
    console.log(message);
    return;
  } else {
    const text = store.getState().text;
    if(text === '') {
      const message = 'Error: PDF had no text to evalutate. Make sure there is a text layer to the pdf';
      store.dispatch(setError(message));
      console.log(message);
    } else {
      const file = store.getState().file;
      if(file === null) {
        const message = 'Error: No file selected. Please select a file.';
        store.dispatch(setError(message));
        console.log(message);
      } else {
        store.dispatch(setError(''));
        store.dispatch(setAnswer(''));
        store.dispatch(setLoading(true));
        sendToServer(text, question, file);
      }
    }
  }
}

const QuestionBox = () => {
  return (
    <div>
      <input
        className="question-input"
        type="text"
        placeholder="What can I help you find?"
        onChange={handleQuestionChange}
      />
      &nbsp;
      <button
        type="button"
        onClick={handleSendQuestion}
      >
        Submit
      </button>
    </div>
  );
}

export default QuestionBox;
