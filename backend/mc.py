from allennlp.predictors.predictor import Predictor

path = "https://s3-us-west-2.amazonaws.com/allennlp/models/bidaf-model-2017.09.15-charpad.tar.gz"


def handle_request(request):
    passage = request.json['passage']
    question = request.json['question']

    return get_prediction(passage, question)

def get_prediction(p, q):
    predictor = Predictor.from_path(path)
    results = predictor.predict(passage=p, question=q)

    return results['best_span_str']
