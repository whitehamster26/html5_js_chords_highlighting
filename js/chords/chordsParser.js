const chordsRe = new RegExp(/[A-G](b|#)?(maj|min|m|M|\+|-|dim|aug)?[0-9]*(sus)?[0-9]*(\/[A-G](b|#)?)?/, "g");

export function parseChords(text) {
    let chords = text.matchAll(chordsRe);
    let foundChords = [];
    for (let chord of chords) {
        foundChords.push(chord[0]);
    }
    return Array.from(new Set(foundChords));
}

export function parseText(text) {
    const chords = parseChords(text);
    let textArr = text.split(" ");
    textArr = textArr.filter(x => x.length > 0);
    textArr = textArr.map(x => x.replaceAll("\n", "<br>"));
    for (let i = 0; i < textArr.length; i++) {
        let el = textArr[i];
        if (el.match(chordsRe) != null) {
            let modifiedEl = el.split("<br>");
            for (let j = 0; j < modifiedEl.length; j++) {
                if (modifiedEl[j] && chords.includes(modifiedEl[j])) {
                    modifiedEl[j] = `<span class="chord">${modifiedEl[j]}</span>`;
                }       
            }
            textArr[i] = modifiedEl.join("<br>");
        }
    }
    return textArr.join(" ");
}