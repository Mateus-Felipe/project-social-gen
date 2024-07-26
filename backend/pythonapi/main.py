from flask import Flask, request, jsonify
from src.ai import process_text

app = Flask(__name__)

@app.route('/process_text', methods=['POST'])
def process_text_endpoint():
    data = request.json
    if 'text' not in data:
        return jsonify({'error': 'No text provided'}), 400
    
    text = data['text']
    response = process_text(text)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(port=4500)
