import os
from flask import Flask, send_from_directory

static_folder = '../client/build'

app = Flask(__name__, static_folder=static_folder)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/streams/logs')
def stream_logs():
  def generate():
    with open('/ramdisk/mycroft/skills.log') as f:
      f.seek(0, os.SEEK_END)
      f.seek(f.tell() - 512, os.SEEK_SET)
      while True:
        yield f.read()
  return app.response_class(generate(), mimetype='text/plain')

if __name__ == '__main__':
    app.run(use_reloader=True, threaded=True)
