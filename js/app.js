import {parseChords, parseText} from "./chords/chordsParser.js";
import {alt} from "./chords/alterChords.js";

let alterCounter = 0;

input.oninput = function() {
    alterCounter = 0;
    result.innerHTML = parseText(stripHTML(input.value));
    foundChords.innerHTML = "";
    let chordSet = new Set();
    for (let chord of document.getElementsByClassName('chord')) {
        chordSet.add(chord.innerText);
    }
    foundChords.innerHTML = Array.from(chordSet)
                .map(x => `<span class="chord">${x}</span>`)
                .join(" ");
    foundChordsListener();
}

document.getElementById("btnClear").onclick = function() {
    result.innerHTML = "";
    input.value = "";
    foundChords.innerText = "";
    chordsControl.innerHTML = "";
}

function stripHTML(text){
    var regex = /(<([^>]+)>)/ig;
    return text.replace(regex, "");
 }

function foundChordsListener() {
    if (foundChords.innerHTML) {
        chordsControl.innerHTML = `
        <div class="btn-group" role="group">
            <button id="altMinus" type="button" class="btn btn-outline-primary">-</button>
            <input id="altCounter" type="text" value="0" readonly>
            <button id="altPlus" type="button" class="btn btn-outline-primary">+</button>
            <input type="color" class="form-control form-control-color" id="colorInput" value="#FF0000" title="Choose highlight color">
        </div>
        
        `
        function btnOnclick(plus) {
            plus ? alterCounter++ : alterCounter--;
            if (Math.abs(alterCounter) <= 12) {
                document.getElementById("altCounter").value = alterCounter;
                let el = plus ? "altMinus" : "altPlus";
                document.getElementById(el).setAttribute("class", "btn btn-outline-primary");
                let chords = document.getElementsByClassName("chord");
                for (let chord of chords) {
                    chord.innerText = alt(chord.innerText, plus)
                }
            } else {
                plus? alterCounter-- : alterCounter++;
            }
            if (Math.abs(alterCounter) == 12) {
                let el = plus ? "altPlus" : "altMinus";
                document.getElementById(el).setAttribute("class", "btn btn-outline-secondary btnDisabled");
            }
        }
        colorInput.oninput = () => {
            let chords = document.getElementsByClassName("chord");
            for (let chord of chords) {
                chord.setAttribute("style", `color: ${colorInput.value}`);
            }
        }
        document.getElementById("altPlus").onclick = () => btnOnclick(true);                                                          
        document.getElementById("altMinus").onclick = () => btnOnclick(false); 
        
    } else {
        chordsControl.innerHTML = "";
    }
}


