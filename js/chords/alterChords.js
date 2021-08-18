const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const NOTES_TO_DIGIT = {};
for (let i = 0; i < NOTES.length; i++) {
    NOTES_TO_DIGIT[NOTES[i]] = i;
}

export function alt(note, plus) {
    if (note.length > 1 && note[1] == "b") {
        note = alt(note[0], false);
    }
    let n = note[0];
    if (note.length > 1 && note[1] == "#") {
        n += note[1];
    }
    let noteNumber = NOTES_TO_DIGIT[n];
    noteNumber = calculateNote(noteNumber, plus);
    let result = NOTES[noteNumber];
    if (note.length > 1 && note[1] != "#") {
        result += note.slice(1);
    } else if (note.length > 2) {
        result += note.slice(2);
    }
    return result;
}

function calculateNote(noteDigit, plus) {
    if (plus) {
        noteDigit++;
    } else {
        noteDigit--;
    }
    if (noteDigit > NOTES.length - 1) {
        noteDigit -= NOTES.length;
    } else if (noteDigit < 0) {
        noteDigit += NOTES.length;
    }
    return noteDigit;
}