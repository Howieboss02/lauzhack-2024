from flask import Flask, request, jsonify
#from sentiment import get_sentiment, get_emotion, get_hate_speech, get_irony
#from flask import flask_cors
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/send-text', methods=['POST'])
def send_text():
    data = request.get_json()
    print("Received data:", data)
    return jsonify({'message': 'Data received', 'received': data})

# Endpoint for handling text input
@app.route('/get_content', methods=['GET'])
def receive_content():
    # Get JSON data from the request
    # Get 
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

@app.route('/sent_sentiment', methods=['POST'])
def sent_sentiment(data):

    sentiment = get_sentiment(data)
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
def sent_emotion(data):
    emotion = get_emotion(data)
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