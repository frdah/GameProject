let input = document.querySelector("input");
let showValue = document.querySelector("#showValue");
document.querySelector(
  "#showValue"
).textContent = `${input.value} X ${input.value}`;
input.addEventListener("input", function() {
  value = input.value;
  showValue.textContent = value + " X " + value;
  console.log("value");
});

document.querySelector("#goBtn").addEventListener("click", function() {
  let value = input.value.toString();
  localStorage.setItem("value", value);
});
