let midi = null;
let isTutti = false;

let synths = [];
let parts = [];

let masterVolume = new Tone.Volume(-6).toDestination();
let isLoaded = false;

/* ============================= */
/* MIDI LADEN */
/* ============================= */

async function loadMidi(url, tuttiMode) {

    await Tone.start();

    stop(); // alles sauber zurücksetzen

    isTutti = tuttiMode;
    isLoaded = false;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    midi = new Midi(arrayBuffer);

    synths = [];
    parts = [];

    midi.tracks.forEach((track, index) => {

        const synth = new Tone.PolySynth(Tone.Synth);
        synth.connect(masterVolume);
        synth.volume.value = -6;

        synths.push(synth);

        const part = new Tone.Part((time, note) => {
            synth.triggerAttackRelease(
                note.name,
                note.duration,
                time,
                note.velocity
            );
        }, track.notes.map(n => ({
            time: n.time,
            name: n.name,
            duration: n.duration,
            velocity: n.velocity
        })));

        part.start(0);
        parts.push(part);
    });

    Tone.Transport.bpm.value = document.getElementById("tempo").value;

    Tone.Transport.stop();
    Tone.Transport.position = 0;

    isLoaded = true;
}

/* ============================= */
/* TRANSPORT STEUERUNG */
/* ============================= */

function play() {
    if (!isLoaded) return;
    Tone.Transport.start();
}

function pause() {
    Tone.Transport.pause();
}

function stop() {
    Tone.Transport.stop();
    Tone.Transport.position = 0;

    parts.forEach(p => p.dispose());
    synths.forEach(s => s.dispose());

    parts = [];
    synths = [];
}

/* ============================= */
/* TEMPO */
/* ============================= */

const tempoSlider = document.getElementById("tempo");
if (tempoSlider) {
    tempoSlider.addEventListener("input", e => {
        Tone.Transport.bpm.value = e.target.value;
    });
}

/* ============================= */
/* MASTER VOLUME */
/* ============================= */

const masterSlider = document.getElementById("masterVol");
if (masterSlider) {
    masterSlider.addEventListener("input", e => {
        masterVolume.volume.value = e.target.value;
    });
}

/* ============================= */
/* EINZELSTIMMEN (nur Tutti) */
/* ============================= */

function setVoiceVolume(index, value) {
    if (!isTutti) return;
    if (synths[index]) {
        synths[index].volume.value = value;
    }
}

const volS = document.getElementById("volS");
const volA = document.getElementById("volA");
const volT = document.getElementById("volT");
const volB = document.getElementById("volB");

if (volS) volS.addEventListener("input", e => setVoiceVolume(0, e.target.value));
if (volA) volA.addEventListener("input", e => setVoiceVolume(1, e.target.value));
if (volT) volT.addEventListener("input", e => setVoiceVolume(2, e.target.value));
if (volB) volB.addEventListener("input", e => setVoiceVolume(3, e.target.value));
