import '../styles/UploadPage.css';
import '../styles/Loader.css';
import React from 'react';
import {connect} from 'react-redux';
import FileSelector from './FileSelector';
import QuestionBox from './QuestionBox';
import PDF from './PDF';

const mapStateToProps = (state) => ({
  file: state.file,
  text: state.text,
  question: state.question,
  answer: state.answer,
  loading: state.loading,
  error: state.error
});

const UploadPage = ({file, text, quesiton, answer, loading, error}) => {
  const load = [];
  if(loading) {
    load.push(<div className="loader" key="loading"></div>)
  }

  const ans = [];
  if(answer !== '') {
    ans.push(<p key="answer">Answer: {answer}</p>);
  }

  const pdf = [];
  if(file !== null) {
  }
  file = './sample.pdf';
  pdf.push(<PDF key="pdf" file={file}/>);

  return (
    <div align="center">
      <div>
        <div className="icon-div">
          <h1 className="heading">SQuADPDF</h1>
          <FileSelector />
          <QuestionBox />
          <p className="errorMessage">{error}</p>
        </div>
        {load}
        {ans}
      </div>
      {pdf}
    </div>
  )
}

export default connect(mapStateToProps)(UploadPage);
