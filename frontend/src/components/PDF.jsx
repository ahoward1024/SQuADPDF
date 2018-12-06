import '../styles/PDF.css';
import React from 'react';
import {store} from '../index';
import {appendText} from '../actions';
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
    this.state = {numPages: 0, pages: []}

    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
    this.getText = this.getText.bind(this);
  }

  onDocumentLoadSuccess({numPages}) {
    this.setState({numPages});
    const pages = Array.from(new Array(numPages), (element, index) => (
      <Page
        key={`page__${index + 1}`}
        pageNumber={index + 1}
        onGetTextSuccess={this.getText}
      />
    ));
    this.setState({pages});
  }

  getText(items) {
    let text = '';
    for(let i = 0; i < items.length; ++i) {
      let str = items[i].str;
      text = text.concat(str);
    }

    store.dispatch(appendText(text));
  }

  render() {
    return (
      <div>
        <Document
          file={this.props.file}
          onLoadSuccess={this.onDocumentLoadSuccess}
          rotate={this.props.rotation}
        >
        {this.state.pages}
        </Document>
      </div>
    );
  }
}

export default PDF;
