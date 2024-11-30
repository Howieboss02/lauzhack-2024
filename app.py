from flask import Flask, request, jsonify

app = Flask(__name__)

# Endpoint for handling text input
@app.route('/send-text', methods=['POST'])
def handle_text():
    # Get JSON data from the request
    data = request.get_json()
    
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

if __name__ == '__main__':
    app.run(debug=True)