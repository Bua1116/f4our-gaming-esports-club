/* Shared F4our Gaming interactions: cookies, navigation, session count and footer. */
function setCookie(name,value,days){const expires=new Date(Date.now()+days*864e5).toUTCString();document.cookie=`${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;}
function getCookie(name){return document.cookie.split('; ').find(row=>row.startsWith(name+'='))?.split('=')[1];}
function showToast(message){const el=document.getElementById('siteToast');if(!el)return;el.querySelector('.toast-body').textContent=message;bootstrap.Toast.getOrCreateInstance(el).show();}

$(function(){
  // Add the supplied logo and replace the simple tournament link with a dropdown menu.
  $('.navbar-brand').html('<img class="brand-logo" src="assets/images/f4our-logo.jpeg" alt="F4our Gaming logo"><span>F4OUR GAMING</span>');
  $('.navbar-nav > li > a[href="tournaments.html"]').each(function(){
    $(this).parent().replaceWith('<li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown">Tournaments</a><ul class="dropdown-menu"><li><a class="dropdown-item" href="tournaments.html">Schedule</a></li><li><a class="dropdown-item" href="rankings.html">Rankings</a></li><li><a class="dropdown-item" href="players.html">Players</a></li></ul></li>');
  });
  const page=(location.pathname.split('/').pop()||'index.html');
  let visits=parseInt(sessionStorage.getItem('f4ourPages')||'0',10)+1;
  sessionStorage.setItem('f4ourPages',visits); $('.session-count').text(visits);
  $('.nav-link').filter(function(){return $(this).attr('href')===page;}).addClass('active');
  $('#year').text(new Date().getFullYear());
  $('.footer .container').append('<div class="footer-social mt-3"><strong>Follow us:</strong> <a target="_blank" href="https://www.instagram.com/f4our_gaming?igsh=MWFxbXk0NTN3dDUxaA%3D%3D&igsi=MWFxbXk0NTN3dDUxaA%3D%3D&utm_source=qr"><i class="bi bi-instagram"></i> @f4our_gaming</a></div>');

  // Display the cookie explanation once per visitor, then remember their choice with a cookie.
  if(!getCookie('f4ourCookieConsent')){
    $('body').append('<div class="modal fade cookie-banner" id="cookieNotice" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h2 class="h5 mb-0">Cookie Notice</h2></div><div class="modal-body">F4our Gaming uses cookies to remember your greeting and improve your experience. By continuing, you agree to our use of cookies.</div><div class="modal-footer"><button id="acceptCookies" class="btn btn-neon">Accept cookies</button></div></div></div></div>');
    const modal=bootstrap.Modal.getOrCreateInstance('#cookieNotice'); modal.show();
    $('#acceptCookies').on('click',function(){setCookie('f4ourCookieConsent','accepted',60);modal.hide();});
  }
});


