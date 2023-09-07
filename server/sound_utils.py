from soundmeter.meter import Meter
from soundmeter.settings import Config

def get_soundmeter():
  soundmeter = Meter()
  soundmeter_config = Config(None)
  soundmeter.num_frames = int(soundmeter_config.RATE / soundmeter_config.FRAMES_PER_BUFFER * soundmeter_config.AUDIO_SEGMENT_LENGTH)
  return soundmeter

