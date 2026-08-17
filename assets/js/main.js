/*
  Shared F4our Gaming website features.
  This file handles cookies, navigation, visit counting, and the footer.
*/

// Saves a value in the browser as a cookie for a chosen number of days.
function setCookie(name, value, days) {
  const millisecondsInADay = 24 * 60 * 60 * 1000;
  const expiryDate = new Date(Date.now() + days * millisecondsInADay);
  const expires = expiryDate.toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// Looks for a cookie by name and returns its saved value.
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  const cookie = cookies.find(function (item) {
    return item.startsWith(name + '=');
  });

  if (!cookie) {
    return undefined;
  }

  return cookie.split('=')[1];
}

// Shows a Bootstrap toast message when the page contains a toast element.
function showToast(message) {
  const toastElement = document.getElementById('siteToast');

  if (!toastElement) {
    return;
  }

  toastElement.querySelector('.toast-body').textContent = message;
  bootstrap.Toast.getOrCreateInstance(toastElement).show();
}

$(function () {
  /*
    Set up the navigation bar.
    The logo is added here, and the Tournaments link becomes a dropdown menu.
  */
  $('.navbar-brand').html('<img class="brand-logo" src="assets/images/f4our-logo.jpeg" alt="F4our Gaming logo"><span>F4OUR GAMING</span>');
  $('.navbar-nav > li > a[href="tournaments.html"]').each(function () {
    $(this).parent().replaceWith('<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Tournaments</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="tournaments.html">Schedule</a></li><li><a class="dropdown-item" href="rankings.html">Rankings</a></li><li><a class="dropdown-item" href="players.html">Players</a></li></ul></li>');
  });
  /*
    Count how many pages the visitor opens during this browser session.
    sessionStorage is cleared when the browser session ends.
  */
  const currentPage = location.pathname.split('/').pop() || 'main.html';
  const previousVisits = sessionStorage.getItem('f4ourPages') || '0';
  const visits = parseInt(previousVisits, 10) + 1;

  sessionStorage.setItem('f4ourPages', visits);
  $('.session-count').text(visits);

  // Highlight the navigation link for the page currently being viewed.
  $('.nav-link').filter(function () {
    return $(this).attr('href') === currentPage;
  }).addClass('active');
  // Keep the copyright year and social-media footer current on every page.
  $('#year').text(new Date().getFullYear());
  $('.footer .container').append('<div class="footer-social"><strong>Follow us:</strong> <a target="_blank" href="https://www.instagram.com/f4our_gaming?igsh=MWFxbXk0NTN3dDUxaA%3D%3D&igsi=MWFxbXk0NTN3dDUxaA%3D%3D&utm_source=qr"><i class="bi bi-instagram"></i> @f4our_gaming</a></div>');

  /*
    Show the cookie notice only when the visitor has not accepted it before.
    Accepting the notice saves a cookie for 60 days.
  */
  if (!getCookie('f4ourCookieConsent')) {
    $('body').append('<div class="modal fade cookie-banner" id="cookieNotice" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h2 class="h5 mb-0">Cookie Notice</h2></div><div class="modal-body">F4our Gaming uses cookies to remember your greeting and improve your experience. By continuing, you agree to our use of cookies.</div><div class="modal-footer"><button id="acceptCookies" class="btn btn-neon">Accept cookies</button></div></div></div></div>');
    const modal = bootstrap.Modal.getOrCreateInstance('#cookieNotice');

    modal.show();

    $('#acceptCookies').on('click', function () {
      setCookie('f4ourCookieConsent', 'accepted', 60);
      modal.hide();
    });
  }
});
