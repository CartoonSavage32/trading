from flask import Flask
from flask_cors import CORS
from src.routes import user_routes

def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/*": {"origins": "*"}})  # Enable CORS for all origins and all methods
    app.register_blueprint(user_routes.bp)
    return app

app = create_app()

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)