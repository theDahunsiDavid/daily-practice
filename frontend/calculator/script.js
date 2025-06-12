const btnListener = document.querySelector(".button-container");

btnListener.addEventListener("click", (e) => {
  const target = e.target.innerText;
  console.log(target);
});
