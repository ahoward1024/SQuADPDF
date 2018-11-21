import React, { Component } from 'react';
// NOTE: We are able to load pdfjs directly from react-pdf and just use the
// internal library it uses. Make absolutely sure you are using a version
// of react-pdf that is 4.0 or higher. Currently 4.0 is in beta.
import {Document, Page, pdfjs} from 'react-pdf';
// We are loading the web worker from a cdn because it is easier (currently)
// see https://github.com/wojtekmaj/react-pdf#browserify-and-others for more
// details about this.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      'question': 'What does .dvi stand for?',
      'hc': '',
      'response': '',
      'answer': '',
      'file': 'sample.pdf',
      'currentPage': 1,
      'numPages': -1
    }

    this.handlePassageChange = this.handlePassageChange.bind(this);
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.getHealthCheck = this.getHealthCheck.bind(this);
    this.sendToServer = this.sendToServer.bind(this);
    this.sendData = this.sendData.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.getText = this.getText.bind(this);
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

  getText(url) {
    // We must chain the promises that pdfjs will return in order to get all
    // of the necessary data when loading the document
    var pdf = pdfjs.getDocument(url);
    return pdf.then((pdf) => {
      var numPages = pdf.pdfInfo.numPages;
      var countPromises = [];
      for(var i = 1; i <= numPages; ++i) {
        var page = pdf.getPage(i);

        countPromises.push(page.then((page) => {
          var textContent = page.getTextContent();
          return textContent.then((text) => {
            return text.items.map((s) => {
              return s.str;
            }).join('');
          });
        }));
      }
      return Promise.all(countPromises).then((texts) => {
        return texts.join('');
      });
    });
  }

  sendData() {
    console.log('send data');

    this.getText(this.state.file).then((text) => {
      this.sendToServer(text, this.state.question);
    });
    //this.sendToServer(passage, this.state.question);
  }

  handleFile() {
    const file = document.getElementById('dropInput').files[0];
    console.log(file);
    this.setState({file});
  }

  onLoadSuccess = ({numPages}) => {
    this.setState({numPages});
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <input
          type="file"
          id="dropInput"
          onChange={this.handleFile}
        /><br/>
        <input
          type="text"
          placeholder={this.state.question}
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
        <button
          type="button"
          onClick={() => {
            if(this.state.currentPage > 1) {
              this.setState({'currentPage': this.state.currentPage - 1})}
            }
          }
        > Previous
        </button>
        &nbsp;{this.state.currentPage} / {this.state.numPages}&nbsp;
        <button
          type="button"
          onClick={() => {
            if(this.state.currentPage < this.state.numPages) {
              this.setState({'currentPage': this.state.currentPage + 1})}
            }
          }
        > Next
        </button>
        <Document
          file={this.state.file}
          onLoadSuccess={this.onLoadSuccess}
        >
          <Page pageNumber={this.state.currentPage}/>
        </Document>
      </div>
    );
  }
}

export default App;
