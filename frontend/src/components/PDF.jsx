import '../styles/PDF.css';
import React from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
// NOTE: We are able to load pdfjs directly from react-pdf and just use the
// internal library it uses. Make absolutely sure you are using a version
// of react-pdf that is 4.0 or higher. Currently 4.0 is in beta.
// We are loading the web worker from a cdn because it is easier (currently)
// see https://github.com/wojtekmaj/react-pdf#browserify-and-others for more
// details about this.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      numPages: 0,
      text: ''
    }

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.documentClick = this.documentClick.bind(this);
    this.getText = this.getText.bind(this);
  }

  documentClick({pageNumber}) {
    console.log("Clicked item from page: " + pageNumber);
  }

  onDocumentLoadSuccess({numPages}) {
    this.setState({numPages});
  }

  getText(items) {
    console.log(items);
    let text = this.state.text;
    for(let i = 0; i < items.length; ++i) {
      const str = items[i].str;
      if(str !== '') {
        text = text.concat(str + ' ');
      }
    }

    this.setState({text});
  }

  render() {
    console.log(this.state.text);
    return (
      <div>
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
          file={this.props.file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          onItemClick={this.documentClick}
        >
        {
          Array.from(new Array(this.state.numPages), (element, index) => (
            <Page
              key={`page__${index + 1}`}
              pageNumber={index + 1}
              onGetTextSuccess={this.getText}
            />
          ))
        }
        </Document>
      </div>
    );
  }
}

export default PDF;
