// public/js/storage.js
const DEFAULT_TICKETS = {
  "basic-pass": {
    id: "basic-pass",
    name: "Basic Pass",
    price: "$50",
    description: "Access to all festival stages.",
    stock: 500,
  },
  "vip-pass": {
    id: "vip-pass",
    name: "VIP Pass",
    price: "$250",
    description: "Access to VIP lounges, priority entry, and meet-and-greet.",
    stock: 100,
  },
  "platinum-pass": {
    id: "platinum-pass",
    name: "Platinum Pass",
    price: "$1000",
    description:
      "All-inclusive backstage access, private bar, and exclusive viewing areas.",
    stock: 20,
  },
};

export const Storage = {
  getUsers() {
    try {
      return JSON.parse(localStorage.getItem("usersDB") || "[]");
    } catch (e) {
      console.error("Invalid usersDB, resetting.", e);
      localStorage.removeItem("usersDB");
      return [];
    }
  },
  saveUsers(users) {
    localStorage.setItem("usersDB", JSON.stringify(users));
  },
  getSession() {
    try {
      return JSON.parse(localStorage.getItem("session"));
    } catch {
      return null;
    }
  },
  saveSession(email) {
    localStorage.setItem("session", JSON.stringify({ email, ts: Date.now() }));
  },
  clearSession() {
    localStorage.removeItem("session");
  },
  getTickets() {
    try {
      return JSON.parse(localStorage.getItem("ticketsDB")) || DEFAULT_TICKETS;
    } catch {
      return DEFAULT_TICKETS;
    }
  },
  saveTickets(tickets) {
    localStorage.setItem("ticketsDB", JSON.stringify(tickets));
  },
  DEFAULT_TICKETS,
};
