let inputboxex = document.querySelectorAll(".goals");
let checkboxex = document.querySelectorAll(".checkbox");
let warning_text = document.querySelector(".warning");
let completed_task = document.querySelector(".task-completed-text");
let progress = document.querySelector(".progress");
let taskBox = document.querySelector(".task-box ");
let darkModeSwitch = document.querySelector(".dark-mode-switch");
let goals = document.querySelectorAll(".goal")
checkboxex.forEach((checkbox) => {

  checkbox.addEventListener('click', (e) => {
    let inputvalues = [...inputboxex].every((input) => {
      return input.value
    })
    if (!inputvalues) {
      e.preventDefault()
      warning_text.style.display = 'block'
    } else {
      warning_text.style.display = 'none';
      let checked = [...checkboxex].filter((cb) => cb.checked)
      completed_task.innerText = `${checked.length}/3 task completed`
      let percent = (checked.length / checkboxex.length) * 100;
      progress.style.width = `${percent}%`;



    }

  })
})

inputboxex.forEach((input) => {
  input.addEventListener("input", () => {
    const inputValues = [...inputboxex].map(input => input.value);
    localStorage.setItem("goals", JSON.stringify(inputValues));
  });
});

checkboxex.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const checkboxStates = [...checkboxex].map(cb => cb.checked);
    localStorage.setItem("checkboxes", JSON.stringify(checkboxStates));
  });
});


const runDarkmode = () => {
  document.body.classList.add("dark-mode");
  taskBox.classList.add("dark-black-text")
  goals.forEach((goal) => {
    goal.classList.add("dark-input");

  });
  inputboxex.forEach((input)=>{
    input.classList.remove("opacity-low");
  })

  checkboxex.forEach((checkbox) => {
    checkbox.style.border = '2px solid #fff'
  })
}
const runLightMode = () => {
  document.body.classList.remove("dark-mode");
  taskBox.classList.remove("dark-black-text")
  goals.forEach((goal) => {
    goal.classList.remove("dark-input");
  });
   inputboxex.forEach((input)=>{
    input.classList.add("opacity-low");
  })
  checkboxex.forEach((checkbox) => {
    checkbox.style.border = '2px solid #61481C4D'
  })
}

// light and dark mode toggle with local storage functionality
darkModeSwitch.addEventListener('change', () => {
  let lightorDark = darkModeSwitch.checked ? true : false
  if (lightorDark) {
    runDarkmode()
  } else {
    runLightMode()
  }

  localStorage.setItem("darkmode", JSON.stringify(lightorDark))
})

// Reset button to clear all input fields
document.querySelector(".reset-btn").addEventListener("click", () => {
  inputboxex.forEach(input => input.value = "");
  checkboxex.forEach(cb => cb.checked = false);
  progress.style.width = "0%";
  completed_task.innerText = `0/3 tasks completed`;
  localStorage.clear();
});


// recover everything from local storage on reloading 

window.addEventListener("load", () => {
  const savedInputs = JSON.parse(localStorage.getItem("goals"));
  if (savedInputs) {
    inputboxex.forEach((input, index) => {
      input.value = savedInputs[index] || "";
    });
  }

  const savedCheckboxes = JSON.parse(localStorage.getItem("checkboxes"));
  if (savedCheckboxes) {
    checkboxex.forEach((checkbox, index) => {
      checkbox.checked = savedCheckboxes[index];
    });
  }

  const checked = savedCheckboxes?.filter(val => val === true).length || 0;
  completed_task.innerText = `${checked}/3 tasks completed`;
  const percent = (checked / checkboxex.length) * 100;
  progress.style.width = `${percent}%`;

  const darkMode = JSON.parse(localStorage.getItem("darkmode"))
  if (darkMode) {
    runDarkmode()
  };

});




