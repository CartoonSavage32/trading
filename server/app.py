from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app) 

# Placeholder for storing user data
users = {}

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the user exists in the users dictionary
    if username in users and users[username]['password'] == password:
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists
    if username in users:
        return jsonify({'message': 'Username already exists'}), 400

    # Store user data in the users dictionary
    users[username] = {'username': username, 'password': password}
    
    return jsonify({'message': 'Signup successful'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
