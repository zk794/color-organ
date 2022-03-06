

const durations = [{dur:"1n", six:16}, {dur:"2n", six:8}, {dur:"4n", six:4}, {dur:"8n", six:2}, {dur:"16n", six:1}]
const velocities = [0.9, 0.8, 0.7, 0.6]
let row = shuffle(["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]) // generate 12 tone row
const notes = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
// let notesNew = [] // notes but starting from whatever the starting tone is
const intervals = [0, 3, 4, 7, 8, 9]

const reps = 10
let melody = []
let beat = []
let counterpoint1 = []
let counterpoint2 = []
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
      note: row[i%12]+"4", velocity: 0.9, rawnote: row[i%12]})
  }
  totMeasure = measure
  totQuarter = quarters
  totSixteenth = sixteenths
}

function createBeat() {
  let measure = 0
  let quarters = 0
  let sixteenths = 0
  let countdown = 16*totMeasure + 4*totQuarter + totSixteenth
  for (let i = countdown; i >= 0; i--) {
    sixteenths++
    if (sixteenths >= 4) {
      quarters += Math.floor(sixteenths/4)
      sixteenths = sixteenths % 4
    }
    if (quarters >= 4) {
      measure += Math.floor(quarters/4)
      quarters = quarters % 4
    }

    let instr = (quarters%4 == 2) ? 2 : 1;
    if (sixteenths == 0) {
      beat.push({ time: `${measure}:${quarters}:${sixteenths}`, dur: "32n",
        note: row[0]+"3", velocity: 0.5, instrument: instr})
    }
  }
  for (let i=countdown; i>= 0; i--) {
  }
}

function createCounterpoint() {
  melody.forEach(item => {
    let inter1 = notes[(notes.indexOf(item.rawnote) + intervals[Math.floor(Math.random() * intervals.length)])%12]
    let inter2 = notes[(notes.indexOf(item.rawnote) + intervals[Math.floor(Math.random() * intervals.length)])%12]
    counterpoint1.push({ time: item.time, dur: item.dur,
      note: inter1+"5", velocity: 0.8, rawnote: inter1})
    counterpoint2.push({ time: item.time, dur: item.dur,
      note: inter2+"2", velocity: 0.8, rawnote: inter2})
  });

}

function playMelody() {
  let melodyPart = new Tone.Part(function(time, value) {
    melodyInd = notes.indexOf(value.rawnote)
    coolGuy.triggerAttackRelease(value.note, value.dur, time, value.velocity)}, melody).start(0)
  Tone.Transport.start(0)
}

function playCounterpoint1() {
  let counter1Part = new Tone.Part(function(time, value) {
    counter1Ind = notes.indexOf(value.rawnote)
    electricCello.triggerAttackRelease(value.note, value.dur, time, value.velocity)}, counterpoint1).start(0)
  Tone.Transport.start(0)
}

function playCounterpoint2() {
  let counter2Part = new Tone.Part(function(time, value) {
    counter2Ind = notes.indexOf(value.rawnote)
    mono.triggerAttackRelease(value.note, value.dur, time, value.velocity)}, counterpoint2).start(0)
  Tone.Transport.start(0)
}

function playBeat() {
  let beatPart = new Tone.Part(function(time, value) {
    if (value.instrument == 2) {
      clave.triggerAttackRelease(value.note, value.dur, time, value.velocity)
      setBgYellow()
    } else {
      conga.triggerAttackRelease(value.note, value.dur, time, value.velocity)
      setBg()
    }
  }, beat).start(0)
  Tone.Transport.start(0)
}

function stopIt(){
  Tone.Transport.stop()
  Tone.Transport.cancel(0)
}

ctx.font = "30px Georgia";
ctx.fillText("Color Organ", w/2, h/2);
ctx.font = "20px Georgia";
ctx.fillText("click anywhere to start", w/2, h/2 + 40);

createMelody()
createCounterpoint()
createBeat()


document.querySelector('canvas').addEventListener('click', async () => {
	await Tone.start()
  playMelody()
  playCounterpoint1()
  playCounterpoint2()
  playBeat()

  const interval = setInterval(function() { // draw every eighth second
    drawBg(bgColor)
    drawCounter1(counter1Ind)
    drawCounter2(counter2Ind)
    drawMelody(melodyInd)
  }, 125)
	console.log('audio is ready')
})
