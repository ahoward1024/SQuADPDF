import '../styles/UploadPage.css';
import '../styles/Loader.css';
import React from 'react';
import {connect} from 'react-redux';
import FileSelector from './FileSelector';
import QuestionBox from './QuestionBox';
import PDFControls from './PDFControls';
import PDF from './PDF';

const mapStateToProps = (state) => ({
  file: state.file,
  text: state.text,
  question: state.question,
  answer: state.answer,
  loading: state.loading,
  error: state.error,
  rotation: state.rotation
});

const UploadPage = ({
  file, text, quesiton, answer, loading, error, rotation}) => {

  const load = [];
  if(loading) {
    load.push(<div className="loader" key="loading"></div>)
  }

  const ans = [];
  if(answer !== '') {
    ans.push(<p key="answer">Answer: {answer}</p>);
  }

  const pdfcontrols = [];
  const pdf = [];
  if(file !== null) {
    pdfcontrols.push(<PDFControls key="pdfcontrols"/>);
    pdf.push(<PDF key="pdf" file={file} rotation={rotation}/>);
  }

  return (
    <div align="center">
      <div className="header">
        <div className="icon-div">
          <h1 className="heading">SQuADPDF</h1>
          <FileSelector />
          <QuestionBox />
          <p className="errorMessage">{error}</p>
        </div>
        {load}
        {ans}
        {pdfcontrols}
      </div>
      <div className="pdfcontent">
        {pdf}
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(UploadPage);
