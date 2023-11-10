from app import app
from flask import jsonify

@app.route('/', methods=['GET'])
def return_home():
    return jsonify({'message': 'Hello, World!'})
