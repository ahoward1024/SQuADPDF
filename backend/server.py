from sanic import Sanic
from sanic import response
from sanic_cors import CORS
from mc import handle_request


app = Sanic()
CORS(app, automatic_options=True)


@app.route('/hc', methods=['GET', 'OPTIONS'])
async def health_check(request):
    # return json({'message': 'okay!'})
    return response.text('health check')


@app.route('/data', methods=['POST', 'OPTIONS'])
def data(request):
    return response.json({
        'message': 'Got data',
        'answer': handle_request(request)})


@app.route('/', methods=['GET', 'OPTIONS'])
async def home(request):
    return response.text('Hello world')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
