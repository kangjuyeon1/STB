let socket = io();
let isScanned = false;

socket.on("plogging", (v) => {
  plogs(v.value.toString())
});

function plogs(qr) {
  if(isScanned == false){
    qr.includes('2019') ? processQr(qr) : tryAgain()
  }
}

function processQr(qr) {
  isScanned = true
  alert(`next page to ${qr}`)
  console.log(qr)
}

function tryAgain() {
  isScanned = false
  alert('try again')
  console.log("TRY AGAIN!")
}

