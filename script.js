// Lalies Bakery — site behaviour
// Kept deliberately simple: mobile nav toggle + order form handling.
// No scroll-triggered animation, no cursor effects.

document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.querySelector('.nav-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu after a link is tapped (mobile)
    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var form = document.querySelector('.order-form');
  var status = document.querySelector('.form-status');

  if (form && status) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var item = form.querySelector('#item').value;
      var date = form.querySelector('#date').value.trim();
      var details = form.querySelector('#details').value.trim();

      if (!name || !phone) {
        status.textContent = 'Please add your name and a phone number so we can reach you.';
        status.className = 'form-status error';
        return;
      }

      var itemLabels = {
        'wedding-cake': 'Wedding cake',
        'birthday-cake': 'Birthday cake',
        'scones': 'Scones',
        'biscuits': 'Biscuits',
        'other': 'Other / not sure yet'
      };

      var message = [
        'New order request',
        'Name: ' + name,
        'Phone: ' + phone,
        'Item: ' + (itemLabels[item] || item),
        'Date needed: ' + (date || 'Not specified'),
        'Details: ' + (details || 'No extra details')
      ].join('\n');

      var whatsappUrl = 'https://wa.me/27609110436?text=' + encodeURIComponent(message);
      status.textContent = 'Opening WhatsApp for ' + name.split(' ')[0] + '...';
      status.className = 'form-status success';
      window.open(whatsappUrl, '_blank');
      form.reset();
    });
  }

  // Update footer year automatically
  var yearEl = document.querySelector('#year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
