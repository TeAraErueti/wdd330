function onClick() {
  if (inputsAreEmpty()) {
    label.textContent = "Error: one or both inputs are empty.";
    return;
  }
  updateLabel();
}
function inputsAreEmpty() {
  if (getNumber1() === "" || getNumber2() === "") {
    return true;
  } else {
    return false;
  }
}
function updateLabel() {
  var addend1 = getNumber1();
  var addend2 = getNumber2();
  var sum = parseInt(addend1) + parseInt(addend2);
  label.textContent = addend1 + " + " + addend2 + " = " + sum;
}
function getNumber1() {
  return inputs[0].value;
}
function getNumber2() {
  return inputs[1].value;
}
var inputs = document.querySelectorAll("input");
var label = document.querySelector("p");
var button = document.querySelector("button");
button.addEventListener("click", onClick);

//https://developer.chrome.com/docs/devtools/javascript/ instructions on how to debug by using dev tools and adding breakpoints in console and editing in console then ctrl+s to save changes.
