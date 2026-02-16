let midi = null;
let isTutti = false;
let parts = [];
let synths = {};
let masterVolume = new Tone.Volume(-6).toDestination();
let isLoaded = false;

/* ============================= */
/* MIDI LADEN */
/* ============================= */
async function loadMidi(url, tuttiMode) {
    await Tone.start(); // AudioContext aktivieren, falls noch suspended

    stop(); // alles zurücksetzen
    isTutti = tuttiMode;
    isLoaded = false;

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    midi = new Midi(arrayBuffer);

    parts = [];
    synths = {};

    // Automatische Track-Zuordnung nach Name
    midi.tracks.forEach(track => {
        const name = track.name.trim(); // Track-Name aus MIDI

        // Nur S,A,T,B Tracks berücksichtigen
        if (!['S','A','T','B'].includes(name)) return;

        const synth = new Tone.PolySynth(Tone.Synth).connect(masterVolume);
        synth.volume.value = -6;
        synths[name] = synth;

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

    // Tempo einstellen
    const tempoSlider = document.getElementById("tempo");
    if (tempoSlider) Tone.Transport.bpm.value = tempoSlider.value;

    // Transport stoppen, Position auf Anfang
    Tone.Transport.stop();
    Tone.Transport.position = 0;

    isLoaded = true;
}

/* ============================= */
/* TRANSPORT STEUERUNG */
/* ============================= */
async function play() {
    if (!isLoaded) return;

    // AudioContext aktivieren falls noch suspended
    if (Tone.context.state !== 'running') {
        await Tone.start();
        console.log("AudioContext aktiviert!");
    }

    Tone.Transport.start();
}

function pause() {
    Tone.Transport.pause();
}

function stop() {
    Tone.Transport.stop();
    Tone.Transport.position = 0;

    // Teile und Synths löschen
    parts.forEach(p => p.dispose());
    for (const key in synths) synths[key].dispose();

    parts = [];
    synths = {};
    isLoaded = false;
}

/* ============================= */
/* TEMPO-REGELUNG */
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
function setVoiceVolume(trackName, value) {
    if (!isTutti) return;
    if (synths[trackName]) synths[trackName].volume.value = value;
}

const volS = document.getElementById("volS");
const volA = document.getElementById("volA");
const volT = document.getElementById("volT");
const volB = document.getElementById("volB");

if (volS) volS.addEventListener("input", e => setVoiceVolume('S', e.target.value));
if (volA) volA.addEventListener("input", e => setVoiceVolume('A', e.target.value));
if (volT) volT.addEventListener("input", e => setVoiceVolume('T', e.target.value));
if (volB) volB.addEventListener("input", e => setVoiceVolume('B', e.target.value));
