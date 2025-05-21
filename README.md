# reChord37 0.03.2.3.1 (Fixed)

**Working In Harmony & Actual Intelligence**
*A browser-native MIDI chord recorder/player with no frameworks.*

---

## 🚀 Overview

**reChord37** is a fully self-contained web-based MIDI tool built without any frontend frameworks. It provides real-time chord recording, naming, playback, velocity tilt, inversion cycling, output routing, and session persistence via IndexedDB. It supports advanced live performance features like sequence playback, MIDI output splitting, and dynamic piano visualizations.

---

## 🎹 Core Features

* **Real-time chord recording** with inversion and velocity tilt
* **MIDI port selection** for input + 4 output roles (main, chord, bass, string)
* **Live mode switching** (STOP / RECORD / PLAY)
* **Chord name detection** with basic music theory logic
* **Interactive SVG piano keyboards** for visual feedback
* **CC-based control system** (e.g. record, play, octave shift, tilt, inversion)
* **Chord storage to pads** + pad-based chord sequence triggering
* **IndexedDB storage** by song name (via `#song=yourTitle` URL hash)
* **No dependencies** — runs entirely in the browser

---

## 📐 Flow Diagram

```
MIDI Input (MPK, TouchOSC, etc.)
       ↓
 navigator.requestMIDIAccess()
       ↓
 ┌──────────────────────────────────┐
 │ handleMIDIMessage(event)        │
 └──────────────────────────────────┘
       ↓
┌─────────────┬──────────────┬────────────┐
│ ButtonManager Logic        │           │
│ (CCs: record, play, stop)  │           │
│                            ▼           ▼
│                    Record Mode    Play Mode
│                     ┌───────┐     ┌────────────┐
│                     │ Pads  │     │ Sequence   │
│                     │       │     │ Triggering │
│                     └───────┘     └────────────┘
│                                   └──> sendChord()
└─────────────────────────────────────────────────┘
       ↓
  send() → Web MIDI Out (main, chord, bass, string)
       ↓
  updateKeyboard(), updateStatus()
       ↓
  update DOM: Piano UI + Chord Info
       ↓
  IndexedDB (on debounceSave)
```

---

## 🧪 Controls (Defaults)

| Action                  | CC / Note # | Notes                   |
| ----------------------- | ----------- | ----------------------- |
| Record Mode             | CC 119      | Hold + Pad = Save chord |
| Play Mode               | CC 118      |                         |
| Stop Mode               | CC 117      |                         |
| Velocity Tilt Adjust    | CC 75       | CC min/max to tilt      |
| Inversion Cycle         | CC 74       | +/-127 = rotate         |
| Chord Trigger Toggle    | Note 48     | Toggles pad playback    |
| Transpose Keys          | Note 60–71  | C4–B4 = offset          |
| Full Chord Playback     | Note 58     |                         |
| Full String Playback    | Note 73     |                         |
| Octave Up/Down (Chord)  | Note 59/57  |                         |
| Octave Up/Down (String) | Note 74/72  |                         |

---

## 🧠 Tech Stack

* HTML5 + Web MIDI API
* Vanilla JS (modular structure)
* CSS (with custom properties)
* IndexedDB for persistence

---

## 📝 Usage

1. Open `index.html` in a WebMIDI-compatible browser (Chrome or Edge)
2. Select your MIDI input/output ports
3. Press `Record` (CC 119), play a chord, then press a pad to save
4. Switch to `Play` mode (CC 118) and trigger your stored chords
5. Navigate to `#song=MySongName` to start a new save slot

---

## 📁 To Do (For Modularization)

* [ ] Move chord detection to `/js/chord-detector.js`
* [ ] Extract MIDI handler to `/js/midi-core.js`
* [ ] Split visual piano into `/js/piano-renderer.js`
* [ ] Move DB and song controls into `/js/db-handler.js`
* [ ] Extract UI functions (`updateStatus`, notifications) into `/js/ui-controls.js`
* [ ] Create `/styles/` folder for CSS segments

---

## 🧩 License

MIT (c) reChord37 contributors

---

## 💬 Feedback

Feature requests or bug reports? Fork it, remix it, or yell into the void responsibly.

Website: [https://reChord37.com](https://reChord37.com)

---

*This README will evolve with the app.*
