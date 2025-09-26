(function(){
  var LS_WISHLIST = 'wanderly:wishlist';
  var LS_ITINERARY = 'wanderly:itinerary';

  function readJSON(path){ return fetch(path).then(function(r){ if(!r.ok) throw new Error('fetch '+path); return r.json(); }); }
  function qs(sel){ return document.querySelector(sel); }
  function byId(id){ return document.getElementById(id); }

  function getWishlist(){ try{ return JSON.parse(localStorage.getItem(LS_WISHLIST)||'[]'); }catch(e){ return []; } }
  function setWishlist(ids){ localStorage.setItem(LS_WISHLIST, JSON.stringify(ids)); }
  function toggleWishlist(id){ var ids=getWishlist(); var i=ids.indexOf(id); if(i>-1){ ids.splice(i,1);} else { ids.push(id);} setWishlist(ids); return ids; }

  function getItinerary(){ try{ return JSON.parse(localStorage.getItem(LS_ITINERARY)||'[]'); }catch(e){ return []; } }
  function setItinerary(items){ localStorage.setItem(LS_ITINERARY, JSON.stringify(items)); }

  function card(pkg){
    var saved = getWishlist().indexOf(pkg.id)>-1;
    var div = document.createElement('div');
    div.innerHTML = ''+
      '<article class="card">'+
      ' <div class="card__media"><img class="hover-zoom" src="'+(pkg.image||'assets/img/placeholder.svg')+'" alt="'+(pkg.title||pkg.name)+'" loading="lazy"></div>'+
      ' <div class="card__body">'+
      '   <div class="card__title">'+(pkg.id?'<a href="/packages/'+pkg.id+'" style="color:inherit;text-decoration:none">'+(pkg.title||pkg.name)+'</a>':(pkg.title||pkg.name))+'</div>'+
      '   <div class="card__meta">'+
      (pkg.destination?'<span class="pill">'+pkg.destination+'</span>':'')+
      (pkg.duration?'<span class="pill">'+pkg.duration+'</span>':'')+
      (pkg.type?'<span class="pill">'+pkg.type+'</span>':'')+
      '   </div>'+
      (pkg.description?'<p class="card__desc">'+pkg.description+'</p>':'')+
      (pkg.rating?'<div class="card__meta"><span class="stars">'+renderStars(pkg.rating)+'</span><span class="rating">'+Number(pkg.rating).toFixed(1)+'</span></div>':'')+
      ' </div>'+
      ' <div class="card__footer">'+
      (pkg.price?'<div><span class="price">$'+pkg.price+'</span><span class="muted"> / person</span></div>':'<span></span>')+
      '   <button class="btn" data-id="'+pkg.id+'" aria-pressed="'+(saved?'true':'false')+'">'+(saved?'♥ Saved':'♡ Save')+'</button>'+
      ' </div>'+
      '</article>';
    var el = div.firstChild; var btn = el.querySelector('button');
    btn.addEventListener('click', function(){
      var ids = toggleWishlist(pkg.id);
      var on = ids.indexOf(pkg.id)>-1;
      btn.textContent = on ? '♥ Saved' : '♡ Save';
      btn.setAttribute('aria-pressed', on?'true':'false');
    });
    return el;
  }

  function renderStars(r){
    var rating = Number(r) || 0;
    var full = Math.floor(rating);
    var half = rating - full >= 0.5;
    var s='';
    for(var i=0;i<full;i++) s += '<span class="star">★</span>';
    if(half) s += '<span class="star">☆</span>';
    return s;
  }

  function initDestinations(){
    var mount = byId('destList'); if(!mount) return;
    for(var i=0;i<8;i++){ var s=document.createElement('div'); s.innerHTML='<article class="card is-loading"><div class="card__media skeleton" style="aspect-ratio:16/10"></div><div class="card__body"><div class="line long"></div><div class="line medium"></div></div></article>'; mount.appendChild(s.firstChild);}    
    readJSON('assets/data/destinations.json').then(function(all){
      mount.innerHTML = '';
      all.concat(all).slice(0,12).forEach(function(d){ mount.appendChild(card({ id:d.id, name:d.name, destination:d.country, type:d.category, image:d.image, description: 'Top sights and hidden gems in '+d.name+'.', rating: 4.7 })); });
    });
  }

  function initPackages(){
    var list = byId('pkgList'); if(!list) return;
    var q = new URLSearchParams(location.search);
    var query = (q.get('q')||'').toLowerCase();
    var when = q.get('when')||''; // placeholder for later use
    var type = q.get('type')||'';
    var selType = byId('filterType'); if(selType && type){ selType.value = type; }
    var inputQ = byId('filterQuery'); if(inputQ && query){ inputQ.value = q.get('q'); }

    function render(all){
      list.innerHTML = '';
      all.forEach(function(p){
        var enriched = Object.assign({ description: 'Handpicked stays, comfortable transfers and immersive activities.', rating: 4.6 }, p);
        list.appendChild(card(enriched));
      });
    }

    for(var i=0;i<8;i++){ var s=document.createElement('div'); s.innerHTML='<article class="card is-loading"><div class="card__media skeleton" style="aspect-ratio:16/10"></div><div class="card__body"><div class="line long"></div><div class="line medium"></div></div></article>'; list.appendChild(s.firstChild);}    
    readJSON('assets/data/packages.json').then(function(all){
      function applyFilters(){
        var a = all.slice();
        var qv = (byId('filterQuery').value||'').toLowerCase();
        var tv = byId('filterType').value;
        if(qv){ a = a.filter(function(p){ return (p.title+' '+p.destination).toLowerCase().indexOf(qv)>-1; }); }
        if(tv){ a = a.filter(function(p){ return p.type===tv; }); }
        render(a);
      }
      list.innerHTML='';
      render(all.filter(function(p){
        var ok = true;
        if(query){ ok = ok && (p.title+' '+p.destination).toLowerCase().indexOf(query)>-1; }
        if(type){ ok = ok && p.type===type; }
        if(when){ ok = ok; }
        return ok;
      }));
      var controls = document.querySelector('#filters');
      if(controls){ controls.addEventListener('input', applyFilters); }
      var reset = byId('resetFilters'); if(reset){ reset.addEventListener('click', function(){ byId('filterQuery').value=''; byId('filterType').value=''; applyFilters(); }); }
    });
  }

  function initItinerary(){
    var list = byId('itinList'); if(!list) return;
    function render(){
      var items = getItinerary();
      list.innerHTML = '';
      if(items.length===0){ list.innerHTML = '<p>No items yet. Use the form below to add places or packages.</p>'; return; }
      items.forEach(function(it, idx){
        var row = document.createElement('div');
        row.className = 'card';
        row.innerHTML = ''+
          '<div class="card__body">'+
          '  <div class="card__title">'+it.title+'</div>'+
          '  <div class="card__meta">'+(it.date?'<span class="pill">'+it.date+'</span>':'')+(it.location?'<span class="pill">'+it.location+'</span>':'')+'</div>'+
          '  <p>'+(it.notes||'')+'</p>'+
          '</div>'+
          '<div class="card__footer">'+
          '  <button class="btn" data-action="up" data-idx="'+idx+'">↑</button>'+
          '  <button class="btn" data-action="down" data-idx="'+idx+'">↓</button>'+
          '  <button class="btn" data-action="remove" data-idx="'+idx+'">Remove</button>'+
          '</div>';
        list.appendChild(row);
      });
    }
    render();

    list.addEventListener('click', function(e){
      var btn = e.target.closest('button[data-action]'); if(!btn) return;
      var items = getItinerary();
      var i = parseInt(btn.getAttribute('data-idx'),10);
      var act = btn.getAttribute('data-action');
      if(act==='remove'){ items.splice(i,1); }
      if(act==='up' && i>0){ var t=items[i-1]; items[i-1]=items[i]; items[i]=t; }
      if(act==='down' && i<items.length-1){ var d=items[i+1]; items[i+1]=items[i]; items[i]=d; }
      setItinerary(items); render();
    });

    var form = byId('itinForm');
    if(form){
      form.addEventListener('submit', function(e){
        e.preventDefault();
        var item = {
          title: byId('itinTitle').value.trim(),
          date: byId('itinDate').value,
          location: byId('itinLocation').value.trim(),
          notes: byId('itinNotes').value.trim()
        };
        if(!item.title) return;
        var items = getItinerary(); items.push(item); setItinerary(items);
        form.reset(); render();
      });
    }

    var btnExport = byId('itinExport'); if(btnExport){ btnExport.addEventListener('click', function(){ var data = JSON.stringify(getItinerary(), null, 2); var blob = new Blob([data], {type:'application/json'}); var a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='itinerary.json'; a.click(); }); }
    var btnClear = byId('itinClear'); if(btnClear){ btnClear.addEventListener('click', function(){ setItinerary([]); render(); }); }
    var btnPrint = byId('itinPrint'); if(btnPrint){ btnPrint.addEventListener('click', function(){ window.print(); }); }
  }

  function initBlog(){
    var list = byId('blogList'); if(!list) return;
    readJSON('assets/data/blog.json').then(function(all){
      var id = location.hash ? location.hash.slice(1) : '';
      if(id){
        var post = all.find(function(p){ return p.id===id; });
        if(post){
          var mount = byId('blogPost');
          if(mount){
            mount.innerHTML = '<h1>'+post.title+'</h1><p class="muted">'+post.category+' · '+post.readTime+' min read</p><img src="'+(post.image||'assets/img/placeholder.svg')+'" alt="'+post.title+'"/><p>'+post.excerpt+'...</p>';
            return;
          }
        }
      }
      all.forEach(function(p){ list.appendChild(card({ id:p.id, title:p.title, type:p.category, image:p.image })); });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    var page = (location.pathname.split('/').pop()||'index.html');
    if(page==='destinations.html') initDestinations();
    if(page==='packages.html') initPackages();
    if(page==='itinerary.html') initItinerary();
    if(page==='blog.html') initBlog();
  });
})();


