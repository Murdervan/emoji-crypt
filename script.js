// zero‑width mapping
const ZERO = {
  0: "\u200B", // zero width space
  1: "\u200C", // zero width non joiner
};

// Funktion: tekst → binær
function textToBinary(str) {
  return str
    .split("")
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

// Funktion: binær → zero‑width
function binaryToZW(bin) {
  return bin
    .split("")
    .map((b) => ZERO[b])
    .join("");
}

// Funktion: zero‑width → binær
function zwToBinary(zwStr) {
  let rev = "";
  for (let ch of zwStr) {
    if (ch === ZERO[0]) rev += "0";
    if (ch === ZERO[1]) rev += "1";
  }
  return rev;
}

// Funktion: binær → tekst
function binaryToText(bin) {
  let text = "";
  for (let i = 0; i < bin.length; i += 8) {
    let byte = bin.slice(i, i + 8);
    text += String.fromCharCode(parseInt(byte, 2));
  }
  return text;
}

// Encode knap
document
  .getElementById("encodeBtn")
  .addEventListener("click", () => {
    let plain = document.getElementById("plainText").value;
    let bin = textToBinary(plain);
    let zw = binaryToZW(bin);
    let emojis = "😀😃😄😁"; // du kan randomisere senere
    let result = "";
    for (let i = 0; i < zw.length; i++) {
      result += emojis[i % emojis.length] + zw[i];
    }
    document.getElementById("emojiText").value = result;
  });

// Decode knap
document
  .getElementById("decodeBtn")
  .addEventListener("click", () => {
    let emojiStr = document.getElementById("emojiText").value;
    // filtrer zero‑width ud
    let zwOnly = [...emojiStr].filter((c) =>
      c === ZERO[0] || c === ZERO[1]
    );
    let bin = zwToBinary(zwOnly.join(""));
    let text = binaryToText(bin);
    document.getElementById("decodedText").value = text;
  });
