// ticketService.js
import { Storage } from './storage.js';

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

export const TicketService = {
  getAll() { return Storage.get('ticketsDB', DEFAULT_TICKETS); },
  saveAll(data) { Storage.set('ticketsDB', data); },
  purchase(ticketId, user) { /* update tickets + user */ },
};
