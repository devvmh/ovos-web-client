import os, signal, pydub
from flask import Flask, send_from_directory
from soundmeter.meter import Meter
from soundmeter.settings import Config

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

soundmeter = Meter()
soundmeter_config = Config(None)
soundmeter.num_frames = int(soundmeter_config.RATE / soundmeter_config.FRAMES_PER_BUFFER * soundmeter_config.AUDIO_SEGMENT_LENGTH)
soundmeter_record = soundmeter.record()

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/streams/miclevel')
def stream_miclevel():
  def generate():
    while True:
      soundmeter_record.send(True)
      data = soundmeter.output.getvalue()
      segment = pydub.AudioSegment(data)
      yield str(segment.rms)
    print("exiting miclevel...")
  return app.response_class(generate(), mimetype='text/plain')

@app.route('/streams/logs/<path:path>')
def stream_logs(path):
  if path not in ALLOWED_LOG_PATHS: 
    abort(404)
  def generate():
    with open('{}/{}.log'.format(logs_folder, path)) as logfile:
      logfile.seek(0, os.SEEK_END)
      logfile.seek(logfile.tell() - 512, os.SEEK_SET)
      logfile.readline() # clear off the first likely-truncated line
      while True:
        yield logfile.read()
      print("exiting " + path)
  return app.response_class(generate(), mimetype='text/plain')

# fix Ctrl+C, which is broken by soundmeter https://github.com/shichao-an/soundmeter/issues/36
def sigint_handler(signum, frame):
  raise KeyboardInterrupt
signal.signal(signal.SIGINT, sigint_handler)

if __name__ == '__main__':
  app.run(use_reloader=True, threaded=True)
