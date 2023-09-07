from ovos_config.config import Configuration
from ovos_bus_client import MessageBusClient, Message
from ovos_plugin_manager.templates.tts import TTS

class WebClientBusInterface:
  def __init__(self):
    """Connect to the mycroft messagebus and load and register config on the bus."""
    self.history = []
    self.bus = MessageBusClient()  # Mycroft messagebus connection
    Configuration.set_config_update_handlers(self.bus)
    self.bus.on('speak', self.handle_speak)
    self.bus.on('recognizer_loop:utterance', self.handle_utterance)
    self.bus.run_in_thread()

  def handle_utterance(self, event):
    """user said something to mycroft"""
    utterance = event.data.get('utterances')[0]
    self.history.append(">> " + utterance + "\n")

  def handle_speak(self, event):
    """mycroft said something to user"""
    utterance = event.data.get('utterance')
    utterance = TTS.remove_ssml(utterance)
    self.history.append(utterance + "\n")

  def get_history(self):
    return self.history
