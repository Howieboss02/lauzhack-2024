from flask import Flask, request, jsonify
from sentiment import get_sentiment, get_emotion, get_hate_speech, get_irony
#from flask import flask_cors
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

@app.route('/send-text', methods=['POST'])
def send_text():
    data = request.get_json()['text']
    print("Received data:", data)
    return jsonify({'message': 'Data received', 'received': data}), 200


@app.route('/sent_sentiment', methods=['POST'])
def sent_sentiment(data):

    data = request.get_json()['text']
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    sentiment = get_sentiment(text)
    return jsonify(sentiment), 200

@app.route('/sent_emotion', methods=['POST'])
def sent_emotion(data):
    data = request.get_json()

    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    emotion = get_emotion(text)
    return jsonify(emotion), 200


@app.route('/sent_hate_speech', methods=['POST'])
def sent_hate_speech(data):
    data = request.get_json()

    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    hate_speech = get_hate_speech(text)
    return jsonify(hate_speech), 200

@app.route('/sent_irony', methods=['POST'])
def sent_irony(data):
    data = request.get_json()

    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    text = data['text']
    irony = get_irony(text)
    return jsonify(irony), 200

if __name__ == '__main__':
    app.run(debug=True)