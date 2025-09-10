// public/js/tickets.js
import { Storage } from "./storage.js";

export function renderTicketCards(user) {
  const availableTicketsContainer =
    document.getElementById("available-tickets");
  const myTicketsContainer = document.getElementById("my-tickets-container");
  const noTicketsMessage = document.getElementById("no-tickets-message");

  const ticketsData = Storage.getTickets();

  availableTicketsContainer.innerHTML = `<h3 class="section-title">Available Tickets</h3>`;

  if (!user.tickets || user.tickets.length === 0) {
    myTicketsContainer.appendChild(noTicketsMessage);
    noTicketsMessage.style.display = "block";
  } else {
    noTicketsMessage.style.display = "none";
    user.tickets.forEach((ticket) => {
      const ticketCard = document.createElement("div");
      ticketCard.className = "purchased-ticket-card";
      ticketCard.innerHTML = `
        <div class="ticket-header">
          <h4 class="ticket-title">${ticket.name}</h4>
        </div>
        <div class="ticket-info">
          <p><span>ID:</span> ${ticket.id}</p>
          <p><span>Price:</span> ${ticket.price}</p>
          <p><span>Date Purchased:</span> ${new Date(
            ticket.date
          ).toLocaleDateString()}</p>
        </div>
      `;
      myTicketsContainer.appendChild(ticketCard);
    });
  }

  Object.values(ticketsData).forEach((ticket) => {
    const isPurchased = user.tickets?.some((t) => t.id === ticket.id);
    const card = document.createElement("div");
    card.className = "ticket-card";
    card.innerHTML = `
      <div class="ticket-header">
        <h4 class="ticket-title">${ticket.name}</h4>
        <span class="ticket-stock">Stock: ${ticket.stock}</span>
      </div>
      <p class="ticket-price">${ticket.price}</p>
      <p class="ticket-description">${ticket.description}</p>
      <button class="buy-button" data-ticket-id="${ticket.id}" ${
      isPurchased || ticket.stock <= 0 ? "disabled" : ""
    }>
        ${
          isPurchased ? "Purchased" : ticket.stock <= 0 ? "Sold Out" : "Buy Now"
        }
      </button>
    `;
    availableTicketsContainer.appendChild(card);
  });
}

export function purchaseTicket(ticketId) {
  const session = Storage.getSession();
  if (!session || !session.email) {
    alert("Please sign in to purchase a ticket.");
    window.location.href = "./signin.html";
    return;
  }

  let users = Storage.getUsers();
  const userIndex = users.findIndex((u) => u.email === session.email);
  if (userIndex === -1) {
    Storage.clearSession();
    window.location.href = "./signin.html";
    return;
  }

  const ticketsData = Storage.getTickets();
  const ticket = ticketsData[ticketId];

  if (!ticket || ticket.stock <= 0) {
    alert("This ticket is currently unavailable or sold out.");
    return;
  }

  ticketsData[ticketId].stock -= 1;
  Storage.saveTickets(ticketsData);

  const purchasedTicket = {
    id: ticketId,
    name: ticket.name,
    price: ticket.price,
    date: Date.now(),
    purchaseToken: `ruzz_${Date.now()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`,
  };

  if (!users[userIndex].tickets) {
    users[userIndex].tickets = [];
  }
  users[userIndex].tickets.push(purchasedTicket);
  Storage.saveUsers(users);

  alert(`You have successfully purchased the ${ticket.name}!`);
  loadTickets(); // reload content
}

export function setupPurchaseListeners() {
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("buy-button")) {
      const ticketId = event.target.dataset.ticketId;
      if (ticketId) purchaseTicket(ticketId);
    }
  });
}

export function loadTickets() {
  const session = Storage.getSession();
  if (!session || !session.email) {
    window.location.href = "./signin.html";
    return;
  }

  const users = Storage.getUsers();
  const user = users.find((u) => u.email === session.email);
  if (!user) {
    Storage.clearSession();
    window.location.href = "./signin.html";
    return;
  }

  const welcome = document.getElementById("welcome-message");
  if (welcome) welcome.textContent = `Welcome, ${user.name}`;

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.style.display = "inline-block";

  renderTicketCards(user);
  setupPurchaseListeners();
}
