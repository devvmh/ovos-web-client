from flask import Flask

app = Flask(__name__)

@app.route('/')
def ovos_web_client_server():
    return 'Hello, World!'
