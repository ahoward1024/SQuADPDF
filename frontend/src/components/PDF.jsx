import '../styles/PDF.css';
import React from 'react';
import {store} from '../index';
import {setText} from '../actions';
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
      numPages: 0,
      text: ''
    }

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.getText = this.getText.bind(this);
  }

  onDocumentLoadSuccess({numPages}) {
    this.setState({numPages});
  }

  // NOTE: FIXME: We need a better way of getting all of the Page
  // elements first and then getting all of the text.
  // Should we just send the file to the server and have the server
  // scrape the text instead??
  getText(items) {
    let text = this.state.text;
    for(let i = 0; i < items.length; ++i) {
      const str = items[i].str;
      if(str !== '') {
        text = text.concat(str + '');
      }
    }

    store.dispatch(setText(text));
  }

  render() {
    return (
      <div>
        <Document
          file={this.props.file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          rotate={this.props.rotation}
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
