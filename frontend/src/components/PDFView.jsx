import '../styles/PDF.css';
import React from 'react';
import {Document, Page, pdfjs} from 'react-pdf';
import {setText} from '../actions';
import {store} from '../index';
// NOTE: We are able to load pdfjs directly from react-pdf and just use the
// internal library it uses. Make absolutely sure you are using a version
// of react-pdf that is 4.0 or higher. Currently 4.0 is in beta.
// We are loading the web worker from a cdn because it is easier (currently)
// see https://github.com/wojtekmaj/react-pdf#browserify-and-others for more
// details about this.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class PDFView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      numPages: 0,
    }

    this.getText = this.getText.bind(this);
  }

  getText(file) {
    // We must chain the promises that pdfjs will return in order to get all
    // of the necessary data when loading the document
    const url = URL.createObjectURL(file);
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
        pdf = null; // This will free the PDF object
        // Free the url as it is no longer needed
        const text = texts.join('');
        URL.revokeObjectURL(url);
        store.dispatch(setText(text));
        return text;
      });
    });
  }

  render() {
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
          onLoadSuccess={({numPages}) => {
            this.setState({numPages});
            this.setState({text: this.getText(this.props.file)});
          }}
        >
          <Page
            pageNumber={this.state.currentPage}
          />
        </Document>
      </div>
    );
  }
}

export default PDFView;
