// // public/js/auth.js
// // Lightweight frontend-only auth using localStorage.
// // Uses WebCrypto SHA-256 for hashing (uid + password hash).

// const TICKETS_DB = {
//   "basic-pass": {
//     id: "basic-pass",
//     name: "Basic Pass",
//     price: "$50",
//     description: "Access to all festival stages.",
//     stock: 500,
//   },
//   "vip-pass": {
//     id: "vip-pass",
//     name: "VIP Pass",
//     price: "$250",
//     description: "Access to VIP lounges, priority entry, and meet-and-greet.",
//     stock: 100,
//   },
//   "platinum-pass": {
//     id: "platinum-pass",
//     name: "Platinum Pass",
//     price: "$1000",
//     description:
//       "All-inclusive backstage access, private bar, and exclusive viewing areas.",
//     stock: 20,
//   },
// };

// /**
//  * Creates and displays an error message below the specified input element.
//  * @param {HTMLElement} element The input element to place the error message below.
//  * @param {string} message The error message to display.
//  */
// function displayError(element, message) {
//   // Clear any existing error message for this element
//   const existingError = element.parentNode.querySelector(".error-message");
//   if (existingError) {
//     existingError.remove();
//   }

//   const errorDiv = document.createElement("div");
//   errorDiv.className = "error-message";
//   errorDiv.textContent = message;
//   errorDiv.style.color = "red";
//   errorDiv.style.fontSize = "12px";
//   errorDiv.style.marginTop = "5px";
//   element.parentNode.appendChild(errorDiv);
// }

// /**
//  * Clears all error messages from the document.
//  */
// function clearErrors() {
//   document.querySelectorAll(".error-message").forEach((el) => el.remove());
// }

// async function hashString(str) {
//   const enc = new TextEncoder().encode(String(str));
//   const buf = await crypto.subtle.digest("SHA-256", enc);
//   return Array.from(new Uint8Array(buf))
//     .map((b) => b.toString(16).padStart(2, "0"))
//     .join("");
// }

// function getUsers() {
//   try {
//     return JSON.parse(localStorage.getItem("usersDB") || "[]");
//   } catch (e) {
//     console.error("Invalid usersDB in localStorage, resetting.", e);
//     localStorage.removeItem("usersDB");
//     return [];
//   }
// }

// function saveUsers(users) {
//   localStorage.setItem("usersDB", JSON.stringify(users));
// }

// function saveSession(email) {
//   localStorage.setItem("session", JSON.stringify({ email, ts: Date.now() }));
// }

// function getSession() {
//   try {
//     return JSON.parse(localStorage.getItem("session"));
//   } catch {
//     return null;
//   }
// }

// function clearSession() {
//   localStorage.removeItem("session");
// }

// function getTicketsData() {
//   try {
//     return JSON.parse(localStorage.getItem("ticketsDB")) || TICKETS_DB;
//   } catch {
//     return TICKETS_DB;
//   }
// }

// function saveTicketsData(tickets) {
//   localStorage.setItem("ticketsDB", JSON.stringify(tickets));
// }

// // Tickets page loader
// function getQueryParam(name) {
//   const params = new URLSearchParams(window.location.search);
//   return params.get(name);
// }

// function renderTicketCards(user) {
//   const availableTicketsContainer =
//     document.getElementById("available-tickets");
//   const myTicketsContainer = document.getElementById("my-tickets");
//   const noTicketsMessage = document.getElementById("no-tickets-message");

//   const ticketsData = getTicketsData();

//   availableTicketsContainer.innerHTML = `<h3 class="section-title">Available Tickets</h3>`;
//   myTicketsContainer.innerHTML = `<h3 class="section-title">My Tickets</h3>`;

//   if (!user.tickets || user.tickets.length === 0) {
//     myTicketsContainer.appendChild(noTicketsMessage);
//     noTicketsMessage.style.display = "block";
//   } else {
//     noTicketsMessage.style.display = "none";
//     user.tickets.forEach((ticket) => {
//       const ticketCard = document.createElement("div");
//       ticketCard.className = "purchased-ticket-card";
//       ticketCard.innerHTML = `
//         <div class="ticket-header">
//           <h4 class="ticket-title">${ticket.name}</h4>
//         </div>
//         <div class="ticket-info">
//           <p><span>ID:</span> ${ticket.id}</p>
//           <p><span>Price:</span> ${ticket.price}</p>
//           <p><span>Date Purchased:</span> ${new Date(
//             ticket.date
//           ).toLocaleDateString()}</p>
//         </div>
//       `;
//       myTicketsContainer.appendChild(ticketCard);
//     });
//   }

//   Object.values(ticketsData).forEach((ticket) => {
//     const isPurchased = user.tickets?.some((t) => t.id === ticket.id);
//     const card = document.createElement("div");
//     card.className = "ticket-card";
//     card.innerHTML = `
//       <div class="ticket-header">
//         <h4 class="ticket-title">${ticket.name}</h4>
//         <span class="ticket-stock">Stock: ${ticket.stock}</span>
//       </div>
//       <p class="ticket-price">${ticket.price}</p>
//       <p class="ticket-description">${ticket.description}</p>
//       <button class="buy-button" data-ticket-id="${ticket.id}" ${
//       isPurchased || ticket.stock <= 0 ? "disabled" : ""
//     }>
//         ${
//           isPurchased ? "Purchased" : ticket.stock <= 0 ? "Sold Out" : "Buy Now"
//         }
//       </button>
//     `;
//     availableTicketsContainer.appendChild(card);
//   });
// }

// function purchaseTicket(ticketId) {
//   const session = getSession();
//   if (!session || !session.email) {
//     alert("Please sign in to purchase a ticket.");
//     window.location.href = "./signin.html";
//     return;
//   }

//   let users = getUsers();
//   const userIndex = users.findIndex((u) => u.email === session.email);
//   if (userIndex === -1) {
//     clearSession();
//     window.location.href = "./signin.html";
//     return;
//   }

//   const ticketsData = getTicketsData();
//   const ticket = ticketsData[ticketId];

//   if (!ticket || ticket.stock <= 0) {
//     alert("This ticket is currently unavailable or sold out.");
//     return;
//   }

//   // Simulate purchase
//   ticketsData[ticketId].stock -= 1;
//   saveTicketsData(ticketsData);

//   const purchasedTicket = {
//     id: ticketId,
//     name: ticket.name,
//     price: ticket.price,
//     date: Date.now(),
//     // For a real app, this would be a secure token or QR code
//     purchaseToken: `ruzz_${Date.now()}_${Math.random()
//       .toString(36)
//       .substring(2, 8)}`,
//   };

//   if (!users[userIndex].tickets) {
//     users[userIndex].tickets = [];
//   }
//   users[userIndex].tickets.push(purchasedTicket);
//   saveUsers(users);

//   alert(`You have successfully purchased the ${ticket.name}!`);
//   loadTickets(); // Reload the page content
// }

// function setupPurchaseListeners() {
//   document.addEventListener("click", function (event) {
//     if (event.target.classList.contains("buy-button")) {
//       const ticketId = event.target.dataset.ticketId;
//       if (ticketId) {
//         purchaseTicket(ticketId);
//       }
//     }
//   });
// }

// async function loadTickets() {
//   const session = getSession();
//   if (!session || !session.email) {
//     window.location.href = "./signin.html";
//     return;
//   }

//   const users = getUsers();
//   const user = users.find((u) => u.email === session.email);
//   if (!user) {
//     clearSession();
//     window.location.href = "./signin.html";
//     return;
//   }

//   const welcome = document.getElementById("welcome-message");
//   if (welcome) {
//     welcome.textContent = `Welcome, ${user.name}`;
//   }

//   const logoutBtn = document.getElementById("logout-btn");
//   if (logoutBtn) {
//     logoutBtn.style.display = "inline-block";
//   }

//   renderTicketCards(user);
//   setupPurchaseListeners();
// }

// // Sign-up handler
// async function handleSignup(e) {
//   e && e.preventDefault && e.preventDefault();
//   clearErrors();

//   const nameEl = document.getElementById("name");
//   const emailEl = document.getElementById("email");
//   const passwordEl = document.getElementById("password");
//   const confirmPasswordEl = document.getElementById("confirm-password");
//   const checkboxEl = document.getElementById("checkbox");

//   const name = nameEl.value.trim();
//   const email = emailEl.value.trim().toLowerCase();
//   const password = passwordEl.value;
//   const confirmPassword = confirmPasswordEl.value;
//   const agree = checkboxEl.checked;

//   if (!name || !email || !password || !confirmPassword) {
//     displayError(
//       document.getElementById("signup-form"),
//       "Please fill all fields."
//     );
//     return;
//   }

//   if (!agree) {
//     displayError(
//       document.getElementById("checkbox-row"),
//       "You must agree to the terms."
//     );
//     return;
//   }

//   const passwordRegex =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
//   if (!passwordRegex.test(password)) {
//     displayError(
//       passwordEl,
//       "Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, and 1 special character."
//     );
//     return;
//   }

//   if (password !== confirmPassword) {
//     displayError(confirmPasswordEl, "Passwords do not match.");
//     return;
//   }

//   let users = getUsers();
//   if (users.find((u) => u.email === email)) {
//     displayError(emailEl, "User already exists. Please sign in.");
//     return;
//   }

//   const hashedEmail = await hashString(email);
//   const passwordHash = await hashString(password);

//   users.push({ name, email, hashed: hashedEmail, passwordHash, tickets: [] });
//   saveUsers(users);
//   saveSession(email);

//   window.location.href = `tickets.html?uid=${hashedEmail}`;
// }

// // Sign-in handler
// async function handleSignin(e) {
//   e && e.preventDefault && e.preventDefault();
//   clearErrors();

//   const emailEl = document.getElementById("email");
//   const passwordEl = document.getElementById("password");
//   const email = emailEl.value.trim().toLowerCase();
//   const password = passwordEl.value;

//   if (!email || !password) {
//     displayError(
//       document.getElementById("signin-form"),
//       "Please enter email and password."
//     );
//     return;
//   }

//   let users = getUsers();
//   let user = users.find((u) => u.email === email);

//   if (!user) {
//     displayError(emailEl, "No user found with that email. Please sign up.");
//     return;
//   }

//   const enteredHash = await hashString(password);

//   if (user.passwordHash !== enteredHash) {
//     displayError(passwordEl, "Invalid credentials.");
//     return;
//   }

//   saveSession(email);
//   window.location.href = `tickets.html?uid=${user.hashed}`;
// }

// // Password visibility
// function togglePasswordVisibility(inputId, iconId) {
//   const input = document.querySelector(`#${inputId}`);
//   const icon = document.querySelector(`#${iconId}`);
//   if (input.type === "password") {
//     input.type = "text";
//     icon.src = "./assets/images/eye-off.svg"; // Replace with your hide icon
//     icon.alt = "Hide password";
//   } else {
//     input.type = "password";
//     icon.src = "./assets/images/eye.svg"; // Replace with your show icon
//     icon.alt = "Show password";
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const signupForm = document.getElementById("signup-form");
//   if (signupForm) signupForm.addEventListener("submit", handleSignup);

//   const signinForm = document.getElementById("signin-form");
//   if (signinForm) signinForm.addEventListener("submit", handleSignin);

//   const showPasswordIcon = document.querySelector("#show-password");
//   if (showPasswordIcon) {
//     showPasswordIcon.addEventListener("click", () => {
//       togglePasswordVisibility("password", "show-password");
//     });
//   }

//   const showConfirmPasswordIcon = document.querySelector(
//     "#show-confirm-password"
//   );
//   if (showConfirmPasswordIcon) {
//     showConfirmPasswordIcon.addEventListener("click", () => {
//       togglePasswordVisibility("confirm-password", "show-confirm-password");
//     });
//   }

//   window.auth = {
//     handleSignup,
//     handleSignin,
//     clearSession,
//     getUsers,
//     saveUsers,
//     loadTickets,
//     togglePasswordVisibility,
//   };
// });


// public/js/auth.js
import { Storage } from "./storage.js";
import { displayError, clearErrors, hashString } from "./utils.js";

export async function handleSignup(e) {
  e?.preventDefault();
  clearErrors();

  const nameEl = document.getElementById("name");
  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const confirmPasswordEl = document.getElementById("confirm-password");
  const checkboxEl = document.getElementById("checkbox");

  const name = nameEl.value.trim();
  const email = emailEl.value.trim().toLowerCase();
  const password = passwordEl.value;
  const confirmPassword = confirmPasswordEl.value;
  const agree = checkboxEl.checked;

  if (!name || !email || !password || !confirmPassword) {
    displayError(document.getElementById("signup-form"), "Please fill all fields.");
    return;
  }
  if (!agree) {
    displayError(document.getElementById("checkbox-row"), "You must agree to the terms.");
    return;
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    displayError(passwordEl, "Password must be at least 8 characters long and include 1 uppercase, 1 lowercase, and 1 special character.");
    return;
  }
  if (password !== confirmPassword) {
    displayError(confirmPasswordEl, "Passwords do not match.");
    return;
  }

  let users = Storage.getUsers();
  if (users.find((u) => u.email === email)) {
    displayError(emailEl, "User already exists. Please sign in.");
    return;
  }

  const hashedEmail = await hashString(email);
  const passwordHash = await hashString(password);

  users.push({ name, email, hashed: hashedEmail, passwordHash, tickets: [] });
  Storage.saveUsers(users);
  Storage.saveSession(email);

  window.location.href = `tickets.html?uid=${hashedEmail}`;
}

export async function handleSignin(e) {
  e?.preventDefault();
  clearErrors();

  const emailEl = document.getElementById("email");
  const passwordEl = document.getElementById("password");
  const email = emailEl.value.trim().toLowerCase();
  const password = passwordEl.value;

  if (!email || !password) {
    displayError(document.getElementById("signin-form"), "Please enter email and password.");
    return;
  }

  let users = Storage.getUsers();
  let user = users.find((u) => u.email === email);

  if (!user) {
    displayError(emailEl, "No user found with that email. Please sign up.");
    return;
  }

  const enteredHash = await hashString(password);
  if (user.passwordHash !== enteredHash) {
    displayError(passwordEl, "Invalid credentials.");
    return;
  }

  Storage.saveSession(email);
  window.location.href = `tickets.html?uid=${user.hashed}`;
}
