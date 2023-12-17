import os
import base64
import uuid
from cryptography.fernet import Fernet
from flask import Blueprint, request, jsonify
from services.fyers_auth_service import FyersDataService

bp = Blueprint("user", __name__)

# Placeholder to store user data
users = {}


@bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Check if the user exists in the users dictionary
    if username in users and users[username]["password"] == password:
        # Generate a session ID
        session_id = str(uuid.uuid4())
        # Store the session ID in the users dictionary
        users[username]["session_id"] = session_id
        # Return the session ID to the frontend
        return jsonify({"message": "Login successful", "session_id": session_id})
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # Check if the username already exists
    if username in users:
        return jsonify({"message": "Username already exists"}), 400

    # Store user data in the users dictionary
    users[username] = {"username": username, "password": password}

    return jsonify({"message": "Signup successful"})


@bp.route("/dashboard", methods=["POST"])
def dashboard():
    data = request.json
    session_id = data.get("session_id")
    appId = data.get("appId")
    secretKey = data.get("secretKey")
    fyId = data.get("fyId")
    totp = data.get("totp")
    pin = data.get("pin")

    # Find the user with the provided session ID
    for user in users.values():
        if user.get("session_id") == session_id:
            username = user["username"]
            break
    else:
        return jsonify({"message": "Invalid session ID"}), 401

    # Generate a key for encryption and decryption
    key = base64.urlsafe_b64encode(os.urandom(32))
    cipher_suite = Fernet(key)

    # Encrypt the credentials
    encrypted_appId = cipher_suite.encrypt(appId.encode("utf-8"))
    encrypted_secretKey = cipher_suite.encrypt(secretKey.encode("utf-8"))
    encrypted_fyId = cipher_suite.encrypt(fyId.encode("utf-8"))
    encrypted_totp = cipher_suite.encrypt(totp.encode("utf-8"))
    encrypted_pin = cipher_suite.encrypt(pin.encode("utf-8"))

    # Store the encrypted credentials in the users dictionary
    users[username]["credentials"] = {
        "appId": encrypted_appId,
        "secretKey": encrypted_secretKey,
        "fyId": encrypted_fyId,
        "totp": encrypted_totp,
        "pin": encrypted_pin,
    }

    # Instantiate FyersDataService with the encrypted credentials
    fyers_service = FyersDataService(
        encrypted_appId,
        encrypted_secretKey,
        encrypted_fyId,
        encrypted_totp,
        encrypted_pin,
    )

    return jsonify(fyers_service.status)
