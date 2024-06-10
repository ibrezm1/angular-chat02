from flask import Flask, Response, make_response, render_template, request, jsonify
from flask_cors import CORS
import time
import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configure CORS
CORS(app, resources={"/": {"origins": ["http://localhost:4200"]}})

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

@app.route('/stream-content', methods=["GET", "POST", "OPTIONS"])
def streamContent():
    if request.method == 'OPTIONS':
        return build_cors_preflight_response()

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
    app.run(debug=True, port=5001)
