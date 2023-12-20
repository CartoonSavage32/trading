import uuid
from flask import Blueprint, request, jsonify
from src.services.fyers_auth_service import FyersAuthService

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
    APP_ID = data.get("appId")
    SECRETE_KEY = data.get("secretKey")
    FY_ID = data.get("fyId")
    TOTP_KEY = data.get("totp")
    PIN = data.get("pin")

    # Find the user with the provided session ID
    for user in users.values():
        if user.get("session_id") == session_id:
            username = user["username"]
            break
    else:
        return jsonify({"message": "Invalid session ID"}), 401
    
    # Store the encrypted credentials in the users dictionary
    users[username]["credentials"] = {
        "appId": APP_ID,
        "secretKey": SECRETE_KEY,
        "fyId": FY_ID,
        "totp": TOTP_KEY,
        "pin": PIN,
    }

    # Instantiate FyersDataService with the encrypted credentials
    fyers_service = FyersAuthService(
        APP_ID,
        SECRETE_KEY,
        FY_ID,
        TOTP_KEY,
        PIN,
    )
    if fyers_service.status["status"] == "success":
        profile = fyers_service.get_fyers_profile()
        return jsonify(profile)
    else:
        return jsonify(fyers_service.status)
