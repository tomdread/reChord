// reChord Logic Pro Scripter Plugin - Debug Version
// Version: 1.0.0

var PluginParameters = [
    {name:"Mode", type:"menu", valueStrings:["Stop", "Record", "Play"], defaultValue:0},
    {name:"Inversion", type:"menu", valueStrings:["Root", "1st", "2nd", "3rd"], defaultValue:0},
    {name:"Velocity Tilt", type:"lin", minValue:-1.0, maxValue:1.0, numberOfSteps:200, defaultValue:0.0},
    {name:"Pad Trigger Mode", type:"checkbox", defaultValue:0}
];

// Debug mode - set to true for detailed logging
const DEBUG = true;

// State
var mode = 0; // 0=Stop, 1=Record, 2=Play
var chords = {}; // Store chord data: {padNote: [note1, note2, ...]}
var currentChord = [];
var currentInversion = 0;
var velocityTilt = 0.0;
var padTriggerMode = false;
var activeNotes = new Map();

// Required for Scripter to process timing info
var NeedsTimingInfo = true;

// Core MIDI Processing
function HandleMIDI(event) {
    if (DEBUG) Trace("MIDI Event: " + event);
    
    if (event instanceof NoteOn) {
        handleNoteOn(event);
    } else if (event instanceof NoteOff) {
        handleNoteOff(event);
    } else if (event instanceof ControlChange) {
        handleControlChange(event);
    } else {
        if (DEBUG) Trace("Passing through MIDI: " + event);
        event.send();
    }
}

function ProcessMIDI() {
    // This is required for Trace to work
    var info = GetTimingInfo();
}

// Handle Note On events
function handleNoteOn(event) {
    const padIndex = [36, 37, 38, 39, 40, 41, 42, 43].indexOf(event.pitch);
    
    if (DEBUG) Trace(`NoteOn: ${event.pitch} (${getNoteName(event.pitch)}), Velocity: ${event.velocity}, Mode: ${mode}, Pad: ${padIndex !== -1 ? padIndex + 1 : 'No'}`);
    
    if (padIndex !== -1) {
        if (mode === 1) { // Record mode
            currentChord = [];
            Trace("Recording - play notes to add to chord...");
        } else if (mode === 2 && chords[event.pitch]) { // Play mode
            playChord(chords[event.pitch], event.velocity);
        }
    } else if (mode === 1) { // Recording a chord
        if (currentChord.length < 10 && !currentChord.includes(event.pitch)) {
            currentChord.push(event.pitch);
            currentChord.sort((a, b) => a - b);
            Trace(`Added note: ${getNoteName(event.pitch)} (${event.pitch}), Chord: [${currentChord.map(n => getNoteName(n)).join(', ')}]`);
        }
    } else if (mode === 2) { // Play mode - pass through
        event.send();
    } else { // Stop mode
        event.send();
    }
}

// Handle Note Off events
function handleNoteOff(event) {
    if (activeNotes.has(event.pitch)) {
        const noteOff = new NoteOff;
        noteOff.pitch = event.pitch;
        noteOff.send();
        activeNotes.delete(event.pitch);
        if (DEBUG) Trace(`NoteOff (chord note): ${getNoteName(event.pitch)}`);
    } else {
        event.send();
        if (DEBUG) Trace(`NoteOff (passed through): ${getNoteName(event.pitch)}`);
    }
}

// Handle Control Change events
function handleControlChange(event) {
    if (DEBUG) Trace(`CC ${event.number}: ${event.value}`);
    
    switch(event.number) {
        case 74: // Inversion
            currentInversion = Math.min(3, Math.max(0, Math.floor(event.value / 32)));
            PluginParameters[1].value = currentInversion;
            Trace("Inversion: " + currentInversion);
            break;
        case 75: // Velocity Tilt
            velocityTilt = (event.value / 64.0) - 1.0;
            PluginParameters[2].value = velocityTilt;
            Trace("Velocity Tilt: " + velocityTilt.toFixed(2));
            break;
        default:
            event.send();
    }
}

// Play a chord
function playChord(chord, velocity) {
    if (!chord || chord.length === 0) return;
    
    Trace(`Playing chord: [${chord.map(n => getNoteName(n)).join(', ')}]`);
    
    // Apply inversion
    let notesToPlay = applyInversion(chord, currentInversion);
    
    // Apply velocity tilt
    const tiltedNotes = applyVelocityTilt(notesToPlay, velocity);
    
    // Send note-ons
    tiltedNotes.forEach(note => {
        const noteOn = new NoteOn;
        noteOn.pitch = note;
        noteOn.velocity = velocity;
        noteOn.send();
        activeNotes.set(note, true);
        if (DEBUG) Trace(`  NoteOn: ${getNoteName(note)} (${note}), Velocity: ${velocity}`);
    });
}

// Apply inversion to a chord
function applyInversion(chord, inversion) {
    if (chord.length < 2 || inversion === 0) return [...chord];
    
    const result = [...chord];
    for (let i = 0; i < inversion; i++) {
        const note = result.shift();
        result.push(note + 12); // Move note up an octave
    }
    return result;
}

// Apply velocity tilt to notes
function applyVelocityTilt(notes, baseVelocity) {
    if (velocityTilt === 0 || notes.length < 2) {
        return notes.map(note => note);
    }
    
    const center = (notes.length - 1) / 2;
    return notes.map((note, index) => {
        const distance = (index - center) / center;
        const velocityDelta = Math.round(velocityTilt * distance * 64);
        const velocity = Math.max(1, Math.min(127, baseVelocity + velocityDelta));
        return note;
    });
}

// UI Parameter Handling
function ParameterChanged(param, value) {
    switch(param) {
        case 0: // Mode
            mode = value;
            Trace("Mode changed to: " + ["Stop", "Record", "Play"][value]);
            if (value === 0) { // Stop
                // Turn off all active notes
                activeNotes.forEach((_, note) => {
                    const noteOff = new NoteOff;
                    noteOff.pitch = note;
                    noteOff.send();
                });
                activeNotes.clear();
                Trace("All notes turned off");
            }
            break;
        case 1: // Inversion
            currentInversion = value;
            Trace("Inversion changed to: " + value);
            break;
        case 2: // Velocity Tilt
            velocityTilt = value;
            Trace("Velocity Tilt changed to: " + value.toFixed(2));
            break;
        case 3: // Pad Trigger Mode
            padTriggerMode = value > 0;
            Trace("Pad Trigger Mode: " + (padTriggerMode ? "ON" : "OFF"));
            break;
    }
}

// Utility Functions
function Trace(message) {
    console.log("reChord: " + message);
}

function getNoteName(note) {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    return notes[note % 12] + Math.floor((note - 12) / 12);
}

// Initialize
function Reset() {
    activeNotes.clear();
    currentChord = [];
    Trace("=== reChord initialized ===");
    Trace("How to use:");
    Trace("1. Set mode to 'Record'");
    Trace("2. Press a pad (C2-G2)");
    Trace("3. Play the chord you want to record");
    Trace("4. Set mode to 'Play'");
    Trace("5. Press the pad to play the recorded chord");
}