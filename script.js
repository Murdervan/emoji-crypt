const ZERO = {0:"\u200B",1:"\u200C"};

function textToBinary(str){
  return [...str].map(c=>c.charCodeAt(0).toString(2).padStart(8,'0')).join('');
}

function binaryToZW(bin){
  return [...bin].map(b=>ZERO[b]).join('');
}

function zwToBinary(zwStr){
  let bin = '';
  for(let c of zwStr){
    if(c===ZERO[0]) bin+='0';
    if(c===ZERO[1]) bin+='1';
  }
  return bin;
}

function binaryToText(bin){
  let text='';
  for(let i=0;i<bin.length;i+=8){
    text+=String.fromCharCode(parseInt(bin.slice(i,i+8),2));
  }
  return text;
}

// Encode knap
document.getElementById("enc").addEventListener("click", ()=>{
  const msg = document.getElementById("plain").value;
  if(!msg) return;
  const zw = binaryToZW(textToBinary(msg));
  const emoji = "😀"; // carrier
  document.getElementById("out").value = emoji + zw;
});

// Decode knap
document.getElementById("dec").addEventListener("click", ()=>{
  const src = document.getElementById("out").value.trim() || document.getElementById("decoded").value.trim();
  if(!src) return;
  const zw = src.slice(1); // drop first emoji
  const bin = zwToBinary(zw);
  document.getElementById("decoded").value = binaryToText(bin);
});
