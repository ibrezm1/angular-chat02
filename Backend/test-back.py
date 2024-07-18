from flask import Flask, Response, make_response, render_template, request, jsonify
from flask_cors import CORS
import time
import os
import google.generativeai as genai
from dotenv import load_dotenv
import base64


# Load environment variables
load_dotenv()

# Replace these credentials with your actual authentication data
VALID_USERNAME = 'admin22'
VALID_PASSWORD = 'pass22'

def authenticate(auth_header):
    if not auth_header:
        return False
    
    auth_type, encoded_credentials = auth_header.split()
    if auth_type.lower() != 'basic':
        return False
    
    decoded_credentials = base64.b64decode(encoded_credentials).decode('utf-8')
    username, password = decoded_credentials.split(':')
    
    return username == VALID_USERNAME and password == VALID_PASSWORD


app = Flask(__name__)

# Configure CORS
CORS(app)#, resources={"/": {"origins": ["http://localhost:4200"]}})

# Configure Google Generative AI
genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def stream_llm_responses(prompt):
    responses = [f"Response part {i+1}" for i in range(10)]
    for response in responses:
        yield f"data: {response}\n\n"
        time.sleep(1)  # Simulate delay

def build_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

def build_cors_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
    return response

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello", methods=["GET"])
def hello():
    return "Hello, World!"

@app.route('/authenticate', methods=["GET", "POST", "OPTIONS"])
def authenticate_user():
    if request.method == 'OPTIONS':
        return build_cors_preflight_response()
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if username == VALID_USERNAME and password == VALID_PASSWORD:
        return jsonify(success=True), 200
    else:
        return jsonify(success=False), 401

@app.route('/stream-content', methods=["GET", "POST", "OPTIONS"])
def streamContent():
    if request.method == 'OPTIONS':
        return build_cors_preflight_response()

    auth_header = request.headers.get('Authorization')
    
    if not authenticate(auth_header):
        return jsonify({"error": "Unauthorized"}), 401

    if request.method == 'POST':
        if request.headers['Content-Type'] != 'application/json':
            return jsonify({"error": "Unsupported Media Type, expected 'application/json'"}), 415

        data = request.get_json()
        message = data.get("message")
        model = data.get("model")

        if not message or not model:
            return jsonify({"error": "Missing 'message' or 'model' parameter"}), 400

        if model == 'fixed':
            resp = Response("This is a fixed response." + "Oops! I can't help but laugh. Did you really just say that?")
            resp.headers.add('Content-Type', 'application/text')
            return build_actual_response(resp)

        elif model == 'gemini':
            model_instance = genai.GenerativeModel('gemini-1.5-flash')
            response = model_instance.generate_content(message, stream=True)

            def generate():
                for chunk in response:
                    yield f"{chunk.text}"
            resp = Response(generate(), content_type='text/event-stream')
            return build_actual_response(resp)
        
        else:
            resp = Response(stream_llm_responses(message), content_type='text/event-stream')
            return build_actual_response(resp)
    else:
        return jsonify({"error": "Method not allowed"}), 405



if __name__ == '__main__':
    app.run(debug=True, port=5001, host='0.0.0.0')
