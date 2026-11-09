"""
JARVIS Voice Recognition System - Windows Compatible Version
Listens for "JARVIS" wake word, then processes voice commands
"""

import sys
import subprocess
import time
import os
from datetime import datetime

# CRITICAL: Create pyaudio alias BEFORE importing speech_recognition
try:
    import pyaudiowpatch
    sys.modules['pyaudio'] = pyaudiowpatch
    AUDIO_AVAILABLE = True
except ImportError as e:
    print(f"❌ Audio library error: {e}")
    AUDIO_AVAILABLE = False

# Now import speech_recognition - it will find 'pyaudio' via our alias
try:
    import speech_recognition as sr
except ImportError as e:
    print(f"❌ Speech recognition error: {e}")
    AUDIO_AVAILABLE = False

try:
    import pyttsx3
    TTS_AVAILABLE = True
except ImportError:
    TTS_AVAILABLE = False

class JarvisVoice:
    def __init__(self):
        if not AUDIO_AVAILABLE:
            raise RuntimeError("Audio libraries not properly installed")

        self.recognizer = sr.Recognizer()
        self.listening = True
        self.wake_word = "jarvis"

        # Initialize text-to-speech engine
        if TTS_AVAILABLE:
            try:
                self.tts_engine = pyttsx3.init()
                self.tts_engine.setProperty('rate', 180)
                self.tts_engine.setProperty('volume', 0.9)
                self.voice_feedback = True
            except Exception as e:
                print(f"⚠️  Voice feedback unavailable: {e}")
                self.voice_feedback = False
        else:
            self.voice_feedback = False

        # Get microphone
        print("🎤 Detecting microphone...")
        try:
            self.microphone = sr.Microphone()
            print(f"✅ Microphone found: {self.microphone.device_index}")
        except Exception as e:
            raise RuntimeError(f"Could not access microphone: {e}")

        # Adjust for ambient noise
        print("🎤 Calibrating for ambient noise (this may take a few seconds)...")
        try:
            with self.microphone as source:
                self.recognizer.adjust_for_ambient_noise(source, duration=2)
            print("✅ Calibration complete!\n")
        except Exception as e:
            raise RuntimeError(f"Calibration failed: {e}")

        if self.voice_feedback:
            self.speak("JARVIS voice system online, sir.")

    def listen_for_wake_word(self):
        """Continuously listen for the wake word 'JARVIS'"""
        print(f"👂 Listening for wake word: '{self.wake_word.upper()}'...")
        print("   (Say 'JARVIS' to activate)\n")

        while self.listening:
            try:
                with self.microphone as source:
                    # Listen with shorter timeout for wake word
                    audio = self.recognizer.listen(source, timeout=1, phrase_time_limit=3)

                try:
                    # Use Google Speech Recognition
                    text = self.recognizer.recognize_google(audio).lower()

                    # Show what was heard (for debugging)
                    # print(f"[Heard: {text}]")

                    if self.wake_word in text:
                        print(f"\n✅ Wake word detected! [{datetime.now().strftime('%H:%M:%S')}]")
                        self.play_activation_sound()
                        self.listen_for_command()

                except sr.UnknownValueError:
                    # Couldn't understand audio - just continue listening
                    pass
                except sr.RequestError as e:
                    print(f"❌ Error with speech recognition service: {e}")
                    time.sleep(1)

            except sr.WaitTimeoutError:
                # No speech detected - continue listening
                pass
            except KeyboardInterrupt:
                print("\n\n👋 JARVIS voice recognition stopped.")
                self.listening = False
                break
            except Exception as e:
                print(f"❌ Unexpected error: {e}")
                time.sleep(1)

    def listen_for_command(self):
        """Listen for the actual command after wake word"""
        print("🎤 Listening for command...")

        try:
            with self.microphone as source:
                audio = self.recognizer.listen(source, timeout=5, phrase_time_limit=10)

            try:
                command = self.recognizer.recognize_google(audio)
                print(f"📝 You said: '{command}'")
                self.process_command(command)

            except sr.UnknownValueError:
                print("❌ Sorry, I didn't catch that. Please try again.")
                if self.voice_feedback:
                    self.speak("Sorry, I didn't catch that.")
            except sr.RequestError as e:
                print(f"❌ Error with speech recognition: {e}")

        except sr.WaitTimeoutError:
            print("⏱️  No command detected. Returning to wake word listening...")
            if self.voice_feedback:
                self.speak("I didn't hear anything, sir.")

        print(f"\n👂 Listening for wake word: '{self.wake_word.upper()}'...\n")

    def process_command(self, command):
        """Process the voice command"""
        command_lower = command.lower()

        # Built-in commands
        if "stop listening" in command_lower or "goodbye" in command_lower or "shut down" in command_lower:
            print("👋 Goodbye, sir!")
            self.speak("Goodbye, sir. JARVIS shutting down.")
            self.listening = False
            return

        elif "open paida" in command_lower or "start paida" in command_lower or "launch paida" in command_lower:
            print("🚀 Starting PAIDA...")
            self.speak("Starting PAIDA, sir.")
            subprocess.Popen(
                ['cmd', '/c', 'start', 'cmd', '/k', 'cd', '/d',
                 'C:\\Users\\VICTUS 16\\Personal-AI-', '&&', 'npm', 'run', 'dev'],
                shell=True
            )

        elif "time" in command_lower or "what time" in command_lower:
            current_time = datetime.now().strftime("%I:%M %p")
            print(f"⏰ It's {current_time}, sir.")
            self.speak(f"It's {current_time}, sir.")

        elif "date" in command_lower or "what date" in command_lower or "what day" in command_lower:
            current_date = datetime.now().strftime("%A, %B %d, %Y")
            print(f"📅 It's {current_date}, sir.")
            self.speak(f"It's {current_date}, sir.")

        # Send everything else to Claude Code
        else:
            print(f"🤖 Sending to Claude Code: {command}")
            self.speak("Processing your request, sir.")
            self.send_to_claude(command)

    def send_to_claude(self, command):
        """Send command to Claude Code CLI"""
        try:
            # Set environment variables
            env = os.environ.copy()
            env['CLAUDE_CONFIG_DIR'] = os.path.expanduser('~\\.claude-omniroute')
            env['ANTHROPIC_BASE_URL'] = 'http://localhost:20128'
            env['ANTHROPIC_AUTH_TOKEN'] = 'sk-701e0a293aa77b9b-266020-bfa548f1'
            env['ANTHROPIC_API_KEY'] = ''
            env['ANTHROPIC_MODEL'] = 'omniroute-free'

            # Send command to Claude in a new window
            subprocess.Popen(
                ['cmd', '/c', 'start', 'cmd', '/k', 'claude', 'chat', '-m', f'"{command}"'],
                env=env,
                shell=True
            )
            print("✅ Command sent to Claude Code")

        except Exception as e:
            print(f"❌ Error sending to Claude: {e}")

    def speak(self, text):
        """Speak text using text-to-speech"""
        if self.voice_feedback:
            try:
                self.tts_engine.say(text)
                self.tts_engine.runAndWait()
            except Exception as e:
                print(f"⚠️  TTS error: {e}")

    def play_activation_sound(self):
        """Play a sound when wake word is detected"""
        print("🔊 *beep*")
        self.speak("Yes, sir?")

def main():
    print("=" * 50)
    print("     JARVIS Voice Recognition System")
    print("=" * 50)
    print("\n🤖 Initializing JARVIS voice assistant...")
    print("📋 Commands:")
    print("   - Say 'JARVIS' to activate")
    print("   - Then say your command")
    print("   - Say 'JARVIS stop listening' to quit")
    print("   - Press Ctrl+C to force quit\n")
    print("=" * 50 + "\n")

    if not AUDIO_AVAILABLE:
        print("\n❌ ERROR: Audio libraries not available!")
        print("Please run: pip install SpeechRecognition PyAudioWPatch")
        return

    try:
        jarvis = JarvisVoice()
        jarvis.listen_for_wake_word()
    except KeyboardInterrupt:
        print("\n\n👋 JARVIS voice recognition stopped.")
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("\nTroubleshooting:")
        print("1. Make sure you have a working microphone connected")
        print("2. Check microphone permissions in Windows Settings")
        print("3. Try running: pip install --upgrade PyAudioWPatch")

if __name__ == "__main__":
    main()
