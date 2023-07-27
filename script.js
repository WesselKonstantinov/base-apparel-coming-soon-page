const form = document.querySelector(".js-form");
const emailField = document.querySelector(".js-input");
const successBlock = document.querySelector(".js-success");

const setInputStatus = (field, errorMessage) => {
  const formError = field.parentElement.querySelector(".js-error");

  if (errorMessage) {
    formError.innerHTML = `<p class="cta-form__error-message">${errorMessage}</p>`;
    field.setAttribute("aria-invalid", "true");
  } else {
    formError.innerHTML = "";
    field.setAttribute("aria-invalid", "false");
  }
};

const validateInput = (field) => {
  const isEmpty = field.value.trim().length === 0;
  const emailRegex = /\S+@\S+\.\S+/;

  let errorMessage;
  if (isEmpty) {
    errorMessage = "Email cannot be empty";
  } else if (!emailRegex.test(field.value)) {
    errorMessage = "Please provide a valid email";
  }

  setInputStatus(field, errorMessage);
};

emailField.addEventListener("change", (e) => {
  e.target.setAttribute("data-touched", "true");
});

emailField.addEventListener("input", (e) => {
  if (e.target.getAttribute("data-touched") !== "true") {
    return;
  }
  validateInput(e.target);
});

emailField.addEventListener("blur", (e) => {
  if (e.target.getAttribute("data-touched") !== "true") {
    return;
  }
  validateInput(e.target);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  validateInput(emailField);
  if (emailField.getAttribute("aria-invalid") === "true") {
    emailField.setAttribute("data-touched", "true");
    emailField.focus();
  } else {
    form.hidden = true;
    successBlock.classList.replace("success--hidden", "success--visible");
  }
});
