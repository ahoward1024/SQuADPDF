from allennlp.predictors.predictor import Predictor
from pdfminer.pdfparser import PDFParser
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdfpage import PDFPage

path = "https://s3-us-west-2.amazonaws.com/allennlp/models/bidaf-model-2017.09.15-charpad.tar.gz"


def handle_request(request):
    text = request.form['text'][0]
    question = request.form['question'][0]
    file = request.files['file'][0]
    if (file.type != 'application/pdf'):
        print('Error, not a pdf')
    else:
        print('File is a pdf')
    result = get_prediction(text, question);
    return result

def get_prediction(p, q):
    predictor = Predictor.from_path(path)
    results = predictor.predict(passage=p, question=q)

    return results['best_span_str']
