
const electricCello = new Tone.FMSynth({
  "volume" : -5,
  "harmonicity": 3.01,
  "modulationIndex": 14,
  "oscillator": {
    "type": "triangle"
  },
  "envelope": {
    "attack": 0.2,
    "decay": 0.3,
    "sustain": 0.4,
    "release": 1.2
  },
  "modulation" : {
    "type": "square"
  },
  "modulationEnvelope" : {
    "attack": 0.01,
    "decay": 0.5,
    "sustain": 0.2,
    "release": 0.1
  }
}).toDestination();

// const dampConga = new Tone.Volume(-12).toDestination();

const conga = new Tone.MembraneSynth({
  "pitchDecay" : 0,
  "octaves" : 3,
  "envelope" : {
    "attack" : 0.0006,
    "decay" : 0.5,
    "sustain" : 0
  },
  "volume" : -10
}).toDestination();

const metronome = new Tone.MembraneSynth({
  "pitchDecay" : 0,
  "octaves" : 3,
  "envelope" : {
    "attack" : 0.0006,
    "decay" : 0.5,
    "sustain" : 0
  },
  "volume" : -1
}).toDestination();

const coolGuy = new Tone.MonoSynth({
  "volume" : -18,
  "oscillator" : {
    "type" : "pwm",
    "modulationFrequency" : 1
  },
  "filter" : {
    "Q" : 6,
    "rolloff" : -24
  },
  "envelope" : {
    "attack" : 0.025,
    "decay" : 0.3,
    "sustain" : 0.7,
    "release" : 2
  },
  "filterEnvelope" : {
    "attack" : 0.245,
    "decay" : 0.131,
    "sustain" : 0.5,
    "release" : 2,
    "baseFrequency" : 20,
    "octaves" : 7.2,
    "exponent" : 2
  }
}).toDestination();

const bell = new Tone.MetalSynth({
  "harmonicity" : 12,
  "resonance" : 800,
  "modulationIndex" : 20,
  "envelope" : {
    "decay" : 0.4,
  },
  "volume" : -25
}).toDestination();
