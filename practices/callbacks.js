
function delay(ms, txt) {
  setTimeout(() => {
    console.log(txt)
  }, ms);
}

delay(500, '1')
delay(100, '2')
delay(300, '3')
