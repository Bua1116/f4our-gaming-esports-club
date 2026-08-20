/* Common code used on every F4our Gaming page. */

// Save a value in a browser cookie.
function setCookie(name, value, days) {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  document.cookie = name + "=" + encodeURIComponent(value) +
    "; expires=" + expiryDate.toUTCString() + "; path=/; SameSite=Lax";
}

// Read one cookie by its name.
function getCookie(name) {
  const cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].startsWith(name + "=")) {
      return cookies[i].split("=")[1];
    }
  }

  return "";
}

// Show the Bootstrap toast used for feedback messages.
function showToast(message) {
  const toastElement = document.getElementById("siteToast");

  if (!toastElement) {
    return;
  }

  toastElement.querySelector(".toast-body").textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

$(document).ready(function () {
  // Add the club logo and name to each navigation bar.
  $(".navbar-brand").html(
    '<img class="brand-logo" src="assets/images/f4our-logo.jpeg" alt="F4our Gaming logo">' +
    "<span>F4OUR GAMING</span>"
  );

  // Keep Schedule, Rankings and Players in one Tournaments menu.
  $(".navbar-nav > li > a[href='tournaments.html']").each(function () {
    $(this).parent().replaceWith(
      '<li class="nav-item dropdown">' +
        '<a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Tournaments</a>' +
        '<ul class="dropdown-menu">' +
          '<li><a class="dropdown-item" href="tournaments.html">Schedule</a></li>' +
          '<li><a class="dropdown-item" href="rankings.html">Rankings</a></li>' +
          '<li><a class="dropdown-item" href="players.html">Players</a></li>' +
        "</ul>" +
      "</li>"
    );
  });

  // Display the current year and social link in the footer.
  $("#year").text(new Date().getFullYear());
  $(".footer .container").append(
    '<div class="footer-social"><strong>Follow us:</strong> ' +
      '<a target="_blank" href="https://www.instagram.com/f4our_gaming">' +
        '<i class="bi bi-instagram"></i> @f4our_gaming' +
      "</a>" +
    "</div>"
  );

  // Use Session Storage as a backup when the website is opened directly from a file.
  let cookieAccepted = getCookie("f4ourCookieConsent") === "accepted";

  try {
    cookieAccepted = cookieAccepted || sessionStorage.getItem("f4ourCookieConsent") === "accepted";
  } catch (error) {
    // The cookie still works when Session Storage is not available.
  }

  // Show the notice only until the visitor accepts it during this website session.
  if (!cookieAccepted) {
    const cookieNotice =
      '<div class="modal fade cookie-banner" id="cookieNotice" tabindex="-1">' +
        '<div class="modal-dialog modal-dialog-centered"><div class="modal-content">' +
          '<div class="modal-header"><h2 class="h5 mb-0">Cookie Notice</h2></div>' +
          '<div class="modal-body">F4our Gaming uses cookies to remember your greeting and improve your experience.</div>' +
          '<div class="modal-footer"><button id="acceptCookies" class="btn btn-neon">Accept cookies</button></div>' +
        "</div></div>" +
      "</div>";

    $("body").append(cookieNotice);
    const cookieModal = bootstrap.Modal.getOrCreateInstance("#cookieNotice");
    cookieModal.show();

    $("#acceptCookies").on("click", function () {
      setCookie("f4ourCookieConsent", "accepted", 60);

      try {
        sessionStorage.setItem("f4ourCookieConsent", "accepted");
      } catch (error) {
        // The cookie still works when Session Storage is not available.
      }

      cookieModal.hide();
    });
  }
});
