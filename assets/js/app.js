(function(){
  function byId(id){ return document.getElementById(id); }
  function createCard(opts){
    var html = ''+
      '<article class="card">'+
      ' <div class="card__media" style="position:relative">'+
      (opts.badge?'<span class="badge '+opts.badge.class+'">'+opts.badge.text+'</span>':'')+
      '   <img class="hover-zoom" src="'+(opts.image||'assets/img/placeholder.svg')+'" alt="'+(opts.alt||opts.title)+'" loading="lazy">'+
      ' </div>'+
      ' <div class="card__body">'+
      '   <div class="card__title"><a href="/packages/'+(opts.id||'')+'" style="color:inherit;text-decoration:none">'+opts.title+'</a></div>'+
      '   <div class="card__meta">'+
      (opts.location?'<span class="pill">'+opts.location+'</span>':'')+
      (opts.duration?'<span class="pill">'+opts.duration+'</span>':'')+
      (opts.type?'<span class="pill">'+opts.type+'</span>':'')+
      '   </div>'+
      (opts.description?'<p class="card__desc">'+opts.description+'</p>':'')+
      (opts.rating?'<div class="card__meta"><span class="stars">'+renderStars(opts.rating)+'</span><span class="rating">'+opts.rating.toFixed(1)+'</span></div>':'')+
      ' </div>'+
      ' <div class="card__footer">'+
      (opts.price?'<div><span class="price">'+opts.price+'</span><span class="muted"> / person</span></div>':'<span></span>')+
      '   <button class="btn" data-action="wishlist" data-id="'+(opts.id||'')+'">♡ Save</button>'+
      ' </div>'+
      '</article>';
    var div = document.createElement('div');
    div.innerHTML = html; return div.firstChild;
  }

  function renderStars(r){
    var full = Math.floor(r);
    var half = r - full >= 0.5;
    var s='';
    for(var i=0;i<full;i++) s += '<span class="star">★</span>';
    if(half) s += '<span class="star">☆</span>';
    return s;
  }

  function fetchJSON(path){
    return fetch(path).then(function(r){ if(!r.ok) throw new Error('Failed '+path); return r.json(); });
  }

  // Skeletons
  function renderSkeletonCards(mount, count){
    for(var i=0;i<count;i++){
      var div = document.createElement('div');
      div.innerHTML = '<article class="card is-loading">\
        <div class="card__media skeleton" style="aspect-ratio:16/10"></div>\
        <div class="card__body">\
          <div class="line long"></div>\
          <div class="line medium"></div>\
        </div>\
        <div class="card__footer"><span></span><span class="line short" style="width:80px"></span></div>\
      </article>';
      mount.appendChild(div.firstChild);
    }
  }

  function populateFeatured(){
    var mount = byId('featuredDestinations'); if(!mount) return;
    renderSkeletonCards(mount, 8);
    fetchJSON('assets/data/destinations.json').then(function(all){
      var featured = all.filter(function(d){ return d.featured; }).slice(0,8);
      mount.innerHTML = '';
      featured.forEach(function(d){ mount.appendChild(createCard({
          id: d.id,
          title: d.name,
          alt: d.name+', '+d.country,
          image: d.image,
          location: d.country,
          type: d.category,
          description: 'Discover '+d.name+' with handpicked stays and experiences.',
          rating: 4.6,
          badge: { text: 'Trending', class: 'badge--trending' }
        })); });
    }).catch(function(){ /* no-op */ });
  }

  function populateTrendingPackages(){
    var mount = byId('trendingPackages'); if(!mount) return;
    renderSkeletonCards(mount, 8);
    fetchJSON('assets/data/packages.json').then(function(all){
      var trending = all.filter(function(p){ return p.tags && p.tags.indexOf('trending')>-1; }).slice(0,8);
      mount.innerHTML = '';
      trending.forEach(function(p){ mount.appendChild(createCard({
          id: p.id,
          title: p.title,
          image: p.image,
          location: p.destination,
          duration: p.duration,
          type: p.type,
          price: '$'+p.price,
          description: 'Includes stays, transfers and guided activities.',
          rating: 4.8,
          badge: { text: (p.tags && p.tags.indexOf('deal')>-1)?'Deal':'New', class: (p.tags && p.tags.indexOf('deal')>-1)?'badge--deal':'badge--new' }
        })); });
    }).catch(function(){});
  }

  function populateBlog(){
    var mount = byId('latestPosts'); if(!mount) return;
    renderSkeletonCards(mount, 3);
    fetchJSON('assets/data/blog.json').then(function(all){
      var latest = all.slice(0,3);
      mount.innerHTML = '';
      latest.forEach(function(p){
        var html = ''+
          '<article class="card">'+
          ' <div class="card__media">'+
          '   <img class="hover-zoom" src="'+(p.image||'assets/img/placeholder.svg')+'" alt="'+p.title+'" loading="lazy">'+
          ' </div>'+
          ' <div class="card__body">'+
          '   <div class="card__title">'+p.title+'</div>'+
          '   <div class="card__meta"><span class="pill">'+p.category+'</span> <span class="pill">'+p.readTime+' min read</span></div>'+
          '   <p>'+p.excerpt+'</p>'+ 
          ' </div>'+
          ' <div class="card__footer">'+
          '   <a class="btn" href="blog.html#'+p.id+'">Read</a>'+ 
          ' </div>'+
          '</article>';
        var div = document.createElement('div'); div.innerHTML = html; mount.appendChild(div.firstChild);
      });
    }).catch(function(){});
  }

  function handleSearch(){
    var form = byId('searchForm'); if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var where = (byId('searchWhere').value||'').trim();
      var when = byId('searchWhen').value;
      var type = byId('searchType').value;
      var url = new URL('packages.html', location.href);
      if(where) url.searchParams.set('q', where);
      if(when) url.searchParams.set('when', when);
      if(type) url.searchParams.set('type', type);
      location.href = url.toString();
    });
    var chips = document.getElementById('popularChips');
    if(chips){ chips.addEventListener('click', function(e){ var b = e.target.closest('.chip'); if(!b) return; byId('searchWhere').value = b.getAttribute('data-where')||''; var t = b.getAttribute('data-type')||''; byId('searchType').value = t; form.dispatchEvent(new Event('submit')); }); }
  }

  document.addEventListener('DOMContentLoaded', function(){
    populateFeatured();
    populateTrendingPackages();
    populateBlog();
    handleSearch();

    // Reveal on scroll
    var io;
    if('IntersectionObserver' in window){
      io = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){ if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target);} });
      }, {threshold: 0.15});
      Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function(el){ io.observe(el); });
    } else {
      Array.prototype.forEach.call(document.querySelectorAll('.reveal'), function(el){ el.classList.add('is-visible'); });
    }

    // Lightweight testimonials slider for small screens (auto-advance)
    try{
      var slider = document.querySelector('.testimonials');
      if(slider && window.matchMedia('(max-width: 720px)').matches){
        var items = slider.children;
        var index = 0;
        function show(i){
          for(var k=0;k<items.length;k++){ items[k].style.display = (k===i)?'block':'none'; }
        }
        if(items.length>1){
          show(index);
          setInterval(function(){ index = (index+1) % items.length; show(index); }, 5000);
        }
      }
    }catch(e){}
  });
})();


