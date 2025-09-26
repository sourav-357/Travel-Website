(function(){
  function renderHeader(){
    var header = document.getElementById('header');
    if(!header) return;
    header.className = 'site-header';
    header.innerHTML = [
      '<div class="container nav">',
      '  <a class="nav__brand" href="index.html" aria-label="Wanderly home">',
      '    <img src="assets/img/logo.svg" alt="" width="28" height="28" style="border-radius:8px"/>',
      '    <span>Wanderly</span>',
      '  </a>',
      '  <button class="btn nav__toggle" aria-expanded="false" aria-controls="navMenu" id="navToggle">Menu</button>',
      '  <nav id="navMenu" class="nav__menu" aria-label="Primary">',
      '    <a href="destinations.html">Destinations</a>',
      '    <a href="packages.html">Packages</a>',
      '    <a href="itinerary.html">Itinerary</a>',
      '    <a href="blog.html">Blog</a>',
      '    <a href="about.html">About</a>',
      '    <a href="contact.html">Contact</a>',
      '    <a href="faq.html">FAQ</a>',
      '  </nav>',
      '  <div class="nav__actions">',
      '    <a class="btn" href="itinerary.html" title="Open itinerary">✧ Wishlist</a>',
      '    <a class="btn btn--primary" href="packages.html">Book now</a>',
      '  </div>',
      '</div>'
    ].join('');

    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if(toggle && menu){
      toggle.addEventListener('click', function(){
        var open = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
      });
    }

    // Mark current page
    try{
      var path = location.pathname.split('/').pop() || 'index.html';
      var links = menu ? menu.querySelectorAll('a') : [];
      Array.prototype.forEach.call(links, function(a){
        if(a.getAttribute('href') === path){ a.setAttribute('aria-current','page'); }
      });
    }catch(e){}
  }

  function renderFooter(){
    var footer = document.getElementById('footer');
    if(!footer) return;
    footer.className = 'site-footer';
    footer.innerHTML = [
      '<div class="container">',
      '  <div class="footer__grid">',
      '    <div>',
      '      <a class="nav__brand" href="index.html"><img src="assets/img/logo.svg" alt="" width="24" height="24"/> <strong>Wanderly</strong></a>',
      '      <p style="max-width:42ch">Your companion for thoughtfully crafted journeys and stress-free planning.</p>',
      '    </div>',
      '    <div>',
      '      <h4>Explore</h4>',
      '      <p><a href="destinations.html">Destinations</a></p>',
      '      <p><a href="packages.html">Packages</a></p>',
      '      <p><a href="blog.html">Blog</a></p>',
      '    </div>',
      '    <div>',
      '      <h4>Company</h4>',
      '      <p><a href="about.html">About</a></p>',
      '      <p><a href="contact.html">Contact</a></p>',
      '      <p><a href="faq.html">FAQ</a></p>',
      '    </div>',
      '    <div>',
      '      <h4>Legal</h4>',
      '      <p><a href="#">Terms</a></p>',
      '      <p><a href="#">Privacy</a></p>',
      '    </div>',
      '  </div>',
      '  <div class="footer__bottom">',
      '    <small>© <span id="year"></span> Wanderly</small>',
      '    <small>Made with care for travelers worldwide</small>',
      '  </div>',
      '</div>'
    ].join('');
    var y = footer.querySelector('#year'); if(y) y.textContent = String(new Date().getFullYear());
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderHeader();
    renderFooter();
    if('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js').catch(function(){}); }
    // Newsletter mock handler
    var nf = document.getElementById('newsletterForm');
    if(nf){ nf.addEventListener('submit', function(e){ e.preventDefault(); var email = document.getElementById('newsletterEmail'); if(!email) return; fetch('/api/newsletter', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ email: email.value }) }).then(function(){ nf.innerHTML = '<p>Thanks! A confirmation has been sent to <strong>'+(email.value||'your email')+'</strong>.</p>'; }).catch(function(){ nf.innerHTML = '<p>Something went wrong. Please try again.</p>'; }); }); }
  });
})();


