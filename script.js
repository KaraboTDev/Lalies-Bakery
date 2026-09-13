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

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, function (character) {
      var entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      };
      return entities[character];
    });
  }

  function createQuoteRequest() {
    var name = form.querySelector('#name').value.trim();
    var phone = form.querySelector('#phone').value.trim();
    var item = form.querySelector('#item').value;
    var date = form.querySelector('#date').value.trim();
    var details = form.querySelector('#details').value.trim();
    var itemLabels = {
      'wedding-cake': 'Wedding cake',
      'birthday-cake': 'Birthday cake',
      'scones': 'Scones',
      'biscuits': 'Biscuits',
      'other': 'Other / not sure yet'
    };

    if (!name || !phone) {
      status.textContent = 'Please add your name and a phone number before creating the quote request.';
      status.className = 'form-status error';
      return;
    }

    var quoteWindow = window.open('', '_blank');
    if (!quoteWindow) {
      status.textContent = 'Please allow pop-ups to create your printable quote request.';
      status.className = 'form-status error';
      return;
    }

    var logoUrl = new URL('assets/logo.jpeg', window.location.href).href;
    quoteWindow.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Quote request - Lalies Bakery</title><style>' +
      'body{font-family:Arial,sans-serif;color:#171017;max-width:780px;margin:0 auto;padding:48px;line-height:1.5}' +
      '.letterhead{display:flex;align-items:center;gap:18px;border-bottom:4px solid #ff18b7;padding-bottom:20px;margin-bottom:34px}' +
      '.letterhead img{width:84px;height:84px;object-fit:cover;border-radius:50%}' +
      'h1{font-size:30px;margin:0;color:#c90088}.business{font-size:14px;margin-top:4px}' +
      'h2{font-size:20px;color:#c90088;margin-top:28px}.details{display:grid;grid-template-columns:1fr 1fr;gap:18px;border:1px solid #e6b7d8;padding:20px}' +
      '.label{display:block;font-size:12px;text-transform:uppercase;color:#8a4578;font-weight:bold;letter-spacing:.06em}.value{font-size:17px}' +
      '.request{border-top:1px solid #e6b7d8;border-bottom:1px solid #e6b7d8;padding:18px 0}.note{background:#fff1fb;padding:16px;margin-top:28px}' +
      '.footer{margin-top:44px;font-size:13px;color:#68445f}@media print{body{padding:0}.no-print{display:none}}' +
      '</style></head><body>' +
      '<header class="letterhead"><img src="' + logoUrl + '" alt="Lalies Bakery logo"><div><h1>Lalies Bakery</h1><div class="business">Thohoyandou, South Africa<br>WhatsApp: 060 911 0436<br>Email: gadisimulalo4@gmail.com</div></div></header>' +
      '<h2>Quote request</h2><div class="details"><div><span class="label">Customer</span><span class="value">' + escapeHtml(name) + '</span></div><div><span class="label">Phone</span><span class="value">' + escapeHtml(phone) + '</span></div><div><span class="label">Date needed</span><span class="value">' + escapeHtml(date || 'To be confirmed') + '</span></div><div><span class="label">Requested item</span><span class="value">' + escapeHtml(itemLabels[item] || item) + '</span></div></div>' +
      '<div class="request"><span class="label">Order details</span><div class="value">' + escapeHtml(details || 'No extra details provided') + '</div></div>' +
      '<div class="note"><strong>Price to be confirmed</strong><br>This document records your quote request. Lalies Bakery will confirm availability, final pricing, and any deposit required with you.</div>' +
      '<div class="footer">Thank you for considering Lalies Bakery. Please keep this request for your records.</div>' +
      '<p class="no-print"><button onclick="window.print()">Print or save as PDF</button></p></body></html>');
    quoteWindow.document.close();
    quoteWindow.focus();
    status.textContent = 'Your printable quote request is ready.';
    status.className = 'form-status success';
  }

  var printQuoteButton = document.querySelector('#print-quote');
  if (printQuoteButton && form && status) {
    printQuoteButton.addEventListener('click', createQuoteRequest);
  }

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
