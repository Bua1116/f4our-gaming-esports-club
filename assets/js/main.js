/* Shared interactions: cookie greeting, session page counter and Bootstrap toast. */
// Create a cookie that lasts for the requested number of days.
function setCookie(name,value,days){const expires=new Date(Date.now()+days*864e5).toUTCString();document.cookie=`${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;}
// Read a saved cookie value by name.
function getCookie(name){return document.cookie.split('; ').find(row=>row.startsWith(name+'='))?.split('=')[1];}
function showToast(message){const el=document.getElementById('siteToast');if(!el)return;el.querySelector('.toast-body').textContent=message;bootstrap.Toast.getOrCreateInstance(el).show();}
// Update the active menu link and count page visits during this browser session.
$(function(){
 const page=(location.pathname.split('/').pop()||'index.html'); let visits=parseInt(sessionStorage.getItem('neonNexusPages')||'0',10)+1; sessionStorage.setItem('neonNexusPages',visits); $('.session-count').text(visits);
 $('.nav-link').filter(function(){return $(this).attr('href')===page;}).addClass('active');
 $('#year').text(new Date().getFullYear());
});
