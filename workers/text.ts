let x = 0;

function display() {
  setInterval(() => {
    postMessage("hello");
  }, 2000);
}
display();
