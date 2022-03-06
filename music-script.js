

const durations = [{dur:"1n", six:16}, {dur:"2n", six:8}, {dur:"4n", six:4}, {dur:"8n", six:2}, {dur:"16n", six:1}]
const velocities = [0.9, 0.8, 0.7, 0.6]
let row = shuffle(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]) // generate 12 tone row
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
// let retrRow = []

const reps = 2
let melody = []
let beat = []
let totMeasure = 0
let totQuarter = 0
let totSixteenth = 0

const synth = new Tone.MonoSynth({
	oscillator: {
		type: "square"
	},
	envelope: {
		attack: 0.1
	}
}).toDestination();

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function retroRow(row) { // row backwards
  for (let i = 1; i <= row.length; i++) {
    retrRow.push(row[row.length-i])
  }
}

// function createMelody() {
//   rowNotes = []
//   durs = []
//   vels = []
//   for (i=0; i<reps*12; i++) {
//     melody.push({ time: i, note: row[i%12], velocity: 0.9 })
//     // rowNotes.push(row[i]+"4")
//     // durs.push(Math.floor(Math.random() * durations.length))
//     // vels.push(Math.floor(Math.random() * velocities.length))
//   }
// }

function createMelody() {
  let measure = 0
  let quarters = 0
  let sixteenths = 0
  for (let i = 0; i < reps*12; i++) {
    let ind = Math.floor(Math.random() * durations.length)
    let d = durations[ind].dur
    sixteenths += durations[ind].six
    if (sixteenths >= 4) {
      quarters += Math.floor(sixteenths/4)
      sixteenths = sixteenths % 4
    }
    if (quarters >= 4) {
      measure += Math.floor(quarters/4)
      quarters = quarters % 4
    }

    melody.push({ time: `${measure}:${quarters}:${sixteenths}`, dur: d,
      note: row[i%12]+"4", velocity: 0.9})
  }
  totMeasure = measure
  totQuarter = quarters
  totSixteenth = sixteenths
}

function createBeat() {
  let c = 0
  let measure = 0
  let quarters = 0
  let sixteenths = 0
  let countdown = 16*totMeasure + 4*totQuarter + totSixteenth
  for (let i = countdown; i >= 0; i-=4) {
    sixteenths += 4
    if (sixteenths >= 4) {
      quarters += Math.floor(sixteenths/4)
      sixteenths = sixteenths % 4
    }
    if (quarters >= 4) {
      measure += Math.floor(quarters/4)
      quarters = quarters % 4
    }

    let instr = (c%4 == 2) ? 2 : 1;
    beat.push({ time: `${measure}:${quarters}:${sixteenths}`, dur: "32n",
      note: row[0]+"3", velocity: 0.5, instrument: instr})
    c++
  }
}

function playRow() {
  let melodyPart = new Tone.Part(function(time, value) {
    coolGuy.triggerAttackRelease(value.note, value.dur, time, value.velocity)}, melody).start(0)
  Tone.Transport.start(0)
}

function playBeat() {
  let beatPart = new Tone.Part(function(time, value) {
    if (value.instrument == 2) {
      bell.triggerAttackRelease(value.note, value.dur, time, value.velocity)
    } else {
      conga.triggerAttackRelease(value.note, value.dur, time, value.velocity)
    }
  }, beat).start(0)
  Tone.Transport.start(0)
}

function stopIt(){
  Tone.Transport.stop()
  Tone.Transport.cancel(0)
}

createMelody()
createBeat()

document.querySelector('canvas').addEventListener('click', async () => {
	await Tone.start()
  playRow()
  playBeat()
	console.log('audio is ready')
  console.log(melody)
})
