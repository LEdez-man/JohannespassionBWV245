let midi = null;
let part = null;
let synth = null;

/* ============================= */
/* MIDI LADEN */
/* ============================= */
async function loadMidi(url) {
    await Tone.start(); // AudioContext aktivieren beim ersten Klick

    stop(); // vorherige Wiedergabe stoppen

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    midi = new Midi(arrayBuffer);

    // Einfach alle Noten zusammen in einen PolySynth packen
    synth = new Tone.PolySynth(Tone.Synth).toDestination();

    // Part für alle Tracks zusammenführen
    let notes = [];
    midi.tracks.forEach(track => {
        track.notes.forEach(n => {
            notes.push({
                time: n.time,
                name: n.name,
                duration: n.duration,
                velocity: n.velocity
            });
        });
    });

    // Part erstellen
    part = new Tone.Part((time, note) => {
        synth.triggerAttackRelease(note.name, note.duration, time, note.velocity);
    }, notes);

    part.start(0);

    Tone.Transport.stop();
    Tone.Transport.position = 0;
}

/* ============================= */
/* PLAY / STOP */
/* ============================= */
async function play() {
    if (!part) return;
    if (Tone.context.state !== 'running') {
        await Tone.start(); // AudioContext aktivieren
    }
    Tone.Transport.start();
}

function stop() {
    Tone.Transport.stop();
    Tone.Transport.position = 0;
    if (part) {
        part.dispose();
        part = null;
    }
    if (synth) {
        synth.dispose();
        synth = null;
    }
}
