let x = 0;

function display() {
  setInterval(() => {
    //console.log("hello ");
    postMessage("hello");
  }, 2000);
}
display();
