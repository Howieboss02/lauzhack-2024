from flask import Flask, request, jsonify
from sentiment import get_sentiment, get_emotion, get_hate_speech, get_irony
from static.run_fake_on_input import get_model, inference


app = Flask(__name__)
model, tokenizer = get_model()


# Run before server startup
def run_on_startup():

    print("Server has started!")


run_on_startup()

# Endpoint for handling text input
@app.route('/send-text', methods=['POST'])
def handle_text():
    # Get JSON data from the request
    data = request.get_json()
    
    # Check if 'text' is in the JSON payload
    if 'input-text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['input-text']
    print('siema jestem tutaj')
    fake_coefficient = inference(text, tokenizer, model)


    # Process the text (for now, we'll just echo it back)
    response = {
        'original_text': text,
        'fake_coefficient': fake_coefficient
    }
    return jsonify(response), 200

# Endpoint for handling text input
@app.route('/get_content', methods=['GET'])
def receive_content():
    # Get JSON data from the request
    data = request.get_json()
    # print in server console


    # Check if 'text' is in the JSON payload
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    text = data['text']

    # Process the text (for now, we'll just echo it back)
    response = {
        'original_text': text,
        'message': f'Received text: {text}'
    }
    return jsonify(response), 200

# Endpoint for handling text input
@app.route('/fake_probability', methods=['POST'])
def fake_probability():
    # Get JSON data from the request
    # Get 
    data = request.get_json()
    # print in server console
    
    
    # Check if 'text' is in the JSON payload
    if 'input_text' not in data:
        return jsonify({'error': 'No text provided'}), 400

    article = data['input_text']
    fake_coefficient = inference(article, tokenizer, model)
    
    # Process the text (for now, we'll just echo it back)
    response = {
        'fake_coefficient': fake_coefficient,
    }
    return jsonify(response), 200

@app.route('/sent_sentiment', methods=['POST'])
def sent_sentiment(data):

    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    response = {
        'original_text': text,
        'message': f'Received text: {text}'
    }
    return jsonify(response), 200

@app.route('/sent_emotion', methods=['POST'])
def sent_emotion():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    response = {
        'original_text': text,
        'message': f'Received text: {text}'
    }
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)