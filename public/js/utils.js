// public/js/utils.js
export function displayError(element, message) {
  const existingError = element.parentNode.querySelector(".error-message");
  if (existingError) existingError.remove();

  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  errorDiv.style.color = "red";
  errorDiv.style.fontSize = "12px";
  errorDiv.style.marginTop = "5px";
  element.parentNode.appendChild(errorDiv);
}

export function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}

export async function hashString(str) {
  const enc = new TextEncoder().encode(String(str));
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

export function togglePasswordVisibility(inputId, iconId) {
  const input = document.querySelector(`#${inputId}`);
  const icon = document.querySelector(`#${iconId}`);
  if (input.type === "password") {
    input.type = "text";
    icon.src = "./assets/images/eye-off.svg";
    icon.alt = "Hide password";
  } else {
    input.type = "password";
    icon.src = "./assets/images/eye.svg";
    icon.alt = "Show password";
  }
}
