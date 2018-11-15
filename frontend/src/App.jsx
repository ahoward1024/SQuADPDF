import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'passage': 'The Matrix is a 1999 science fiction action film written and directed by The Wachowskis, starring Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving, and Joe Pantoliano.',
      'question': 'Who stars in The Matrix?',
      'hc': '',
      'response': '',
      'answer': ''
    }

    this.handlePassageChange = this.handlePassageChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.getHealthCheck = this.getHealthCheck.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  handlePassageChange(event) {
    this.setState({'passage': event.target.value, 'answer': ''});
  }

  handleQuestionChange(event) {
    this.setState({'question': event.target.value, 'answer': ''});
  }

  async getHealthCheck() {
    fetch('http://localhost:8000/hc', {'method': 'GET'})
      .then(response => {
        if(response.status !== 200) {
          throw Error('Response not 200');
        } else {
          this.setState({'hc': response.statusText})
        }
      })
      .catch(exception => console.log(exception));
  }

  async sendToServer(passage, question) {
    fetch('http://localhost:8000/data', {
      'method': 'POST',
      'headers': {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      'body': JSON.stringify({passage, question})
    })
    .then(response => response.json())
    .then(json => {console.log(json); this.setState({'answer': json.answer})})
  }

  sendData() {
    this.sendToServer(this.state.passage, this.state.question);
  }

  render() {
    return (
      <div>
        <textarea
          rows="10"
          cols="50"
          placeholder={this.state.passage}
          onChange={this.handlePassageChange}
        >
        </textarea>
        <br/>
        <input
          type="text"
          placeholder={this.state.question}
          onChange={this.handleQuestionChange}
        />
        <button
          type="button"
          onClick={this.sendData}
        > Submit
        </button>
        <br/>
        <button
          type="button"
          onClick={this.getHealthCheck}
        > HC
        </button>
        <button
          type="button"
          onClick={() => this.setState({'answer': ''})}
        > Clear
        </button>
        <br/>
        {this.state.hc}
        <div>
          Answer: {this.state.answer}
        </div>
      </div>
    );
  }
}

export default App;
