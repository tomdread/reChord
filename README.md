# reChord

A real-time MIDI chord recorder and player application that allows musicians to record, store, and play back chord progressions using MIDI controllers.

## Features

- Record and store chord progressions (up to 10 notes per chord)
- Play back recorded chords with multiple output routing
- Four MIDI output channels:
  - Main: Direct input passthrough
  - Bass: For low notes
  - Chord: For recorded chord playback
  - String: For individual note playback
- Visual piano keyboard interface with real-time note visualization
- Automatic chord detection and naming
- Sequence recording and playback (up to 16 chords)
- Song-based storage with notes and sequences
- Transpose functionality
- Octave control for full chords and strings
- Real-time MIDI activity visualization

## Setup

1. Clone the repository
2. Open `index.html` in a modern web browser (Chrome or Edge recommended)
3. Connect your MIDI controller
4. Allow MIDI access when prompted by the browser

## Requirements

- Web browser with Web MIDI API support (Chrome or Edge)
- MIDI controller (optional but recommended)
- MIDI output devices (optional)

## Usage

### Basic Controls
- **Record Button (CC 119)**: Enter recording mode
- **Play Button (CC 118)**: Enter playback mode
- **Stop Button (CC 117)**: Enter stop mode

### Recording Chords
1. Press the Record button to enter recording mode
2. Play notes on your MIDI controller to record a chord
3. Press a pad (36-43) to store the recorded chord
4. Repeat for additional chords

### Playing Chords
1. Press the Play button to enter playback mode
2. Press a pad to load its stored chord
3. Use the string triggers (76, 77, 79, 81, 83, 84) to play individual notes
4. Use the bass triggers (75, 78, 80, 82) to play bass notes
5. Use the full chord trigger (58) to play the entire chord

### Pad Trigger Mode
- Toggle with CC 48
- When enabled, pressing a pad both loads and triggers its chord
- When disabled, pressing a pad only loads the chord

### Sequence Mode
1. Hold the Record button to enter sequence recording mode
2. Press pads in the order you want them to play
3. Release the Record button to finish recording
4. Press both sequence controls (CC 115, 116) simultaneously to enter sequence mode
5. Use sequence controls to navigate through the sequence

### Transpose and Octave Controls
- Notes 60-71: Direct transpose mapping
- CC 59: Chord octave up
- CC 57: Chord octave down
- CC 74: String octave up
- CC 72: String octave down
- Press both octave controls simultaneously to reset to 0

### Song Management
- Each song is stored automatically
- Songs are identified by URL hash
- Notes and sequences are saved with each song
- Change songs by modifying the URL hash

## Version

Current version: 0.03.2.3

## License

Private - All Rights Reserved
This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.


## Upgrade Chord storage system to 8 switch's  

Bank A
00001000
10001000
11001000
11101000
11111000

Bank B
00000100
10000100
11000100
11100100
11110100

etc

can you finish that and order the cards like so