 <script>
      // Mobile menu toggle
      const menuToggle = document.getElementById("menu-toggle");
      const navLinks = document.querySelector(".navbar ul");

      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
      });

      // Countdown Timer
      const countdown = document.getElementById("countdown");
      const eventDate = new Date("2025-12-31T00:00:00").getTime();

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (distance < 0) {
          countdown.innerHTML = "The festival has started!";
        }
      }

      setInterval(updateCountdown, 1000);
    </script>
  </body>
</html>
