const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  mobileNav.hidden = true;
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  mobileNav.hidden = open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    closeMenu();
    menuButton.focus();
  }
});
window.matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

document.querySelectorAll('.copy-email').forEach(button => {
  button.addEventListener('click', async () => {
    const address = button.dataset.email;
    const status = document.querySelector('#copy-status');
    try {
      await navigator.clipboard.writeText(address);
      status.textContent = `${address} copied. Paste it into your email app.`;
    } catch {
      const addressLink = button.parentElement.querySelector('a');
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(addressLink);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = `Automatic copying is unavailable. Select and copy ${address} manually.`;
    }
  });
});
