// public/js/main.js
import { handleSignup, handleSignin } from "./auth.js";
import { loadTickets } from "./tickets.js";
import { Storage } from "./storage.js";
import { togglePasswordVisibility } from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signup-form");
  if (signupForm) signupForm.addEventListener("submit", handleSignup);

  const signinForm = document.getElementById("signin-form");
  if (signinForm) signinForm.addEventListener("submit", handleSignin);

  const showPasswordIcon = document.querySelector("#show-password");
  if (showPasswordIcon) {
    showPasswordIcon.addEventListener("click", () => {
      togglePasswordVisibility("password", "show-password");
    });
  }

  const showConfirmPasswordIcon = document.querySelector(
    "#show-confirm-password"
  );
  if (showConfirmPasswordIcon) {
    showConfirmPasswordIcon.addEventListener("click", () => {
      togglePasswordVisibility("confirm-password", "show-confirm-password");
    });
  }

  // expose some functions for debugging
  window.app = {
    Storage,
    loadTickets,
  };
});
