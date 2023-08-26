import os
from flask import Flask, send_from_directory

static_folder = '../client/build'
logs_folder = os.environ.get('LOGS_FOLDER')

ALLOWED_LOG_PATHS = [
  'audio',
  'ovos',
  'phal',
  'skills',
  'voice'
]

app = Flask(__name__, static_folder=static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/streams/logs/<path:path>')
def stream_logs(path):
  if path not in ALLOWED_LOG_PATHS: 
    abort(404)
  def generate():
    with open('{}/{}.log'.format(logs_folder, path)) as logfile:
      logfile.seek(0, os.SEEK_END)
      logfile.seek(logfile.tell() - 512, os.SEEK_SET)
      while True:
        yield logfile.read()
  return app.response_class(generate(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
