# reChord

A web-based MIDI chord recorder and player application that allows musicians to record, store, and play back chord progressions using MIDI controllers.

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
- Sequence recording and playback (up to 8 chords)
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

1. Select your MIDI input and output devices
2. Use the record button to start recording chords
3. Play chords on your MIDI controller to record them
4. Use the play button to enter playback mode
5. Trigger recorded chords using your MIDI controller
6. Use octave controls to shift chord playback up or down
7. Use transpose controls to change the key of played chords
8. Record sequences by holding the record button
9. Navigate sequences using the sequence controls

## Version

Current version: 0.03.2.3

## License

Private - All Rights Reserved
This software is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.