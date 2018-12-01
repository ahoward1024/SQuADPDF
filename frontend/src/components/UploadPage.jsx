import '../styles/UploadPage.css';
import '../styles/Loader.css';
import React from 'react';
import {connect} from 'react-redux';
import FileSelector from './FileSelector';
import QuestionBox from './QuestionBox';
import PDFView from './PDFView';

const mapStateToProps = (state) => ({
  file: state.file,
  text: state.text,
  question: state.question,
  answer: state.answer,
  loading: state.loading,
  error: state.error
});

const UploadPage = ({file, text, quesiton, answer, loading, error}) => {
  const elements = [];
  if(loading) {
    elements.push(<div className="loader" key="loading"></div>)
  }

  if(answer !== '') {
    elements.push(<p key="answer">Answer: {answer}</p>);
  }

  if(file !== null && file !== undefined) {
    elements.push(<PDFView key="pdfview" file={file}/>);
  }

  return (
    <div>
      <div className="icon-div">
        <h1>SQuADPDF</h1>
        <i className="far fa-file-alt fa-6x icon"></i>
        <FileSelector />
        <QuestionBox />
        <p className="errorMessage">{error}</p>
      </div>
      {elements}
    </div>
  )
}

export default connect(mapStateToProps)(UploadPage);
