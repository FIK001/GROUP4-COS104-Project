
window.onload = function () {
  auth.loadTickets();
  document.getElementById("logout-btn").addEventListener("click", function () {
    auth.clearSession();
    window.location.href = "signin.html";
  });
};
