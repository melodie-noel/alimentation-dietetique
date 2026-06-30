
  document.getElementById('yr').textContent=new Date().getFullYear();
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}});
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:0,rootMargin:'0px 0px -42% 0px'});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.cascade').forEach(function(el){io.observe(el)});

  document.querySelectorAll('[data-carousel]').forEach(function(c){
    var track=c.querySelector('[data-track]');
    var slides=[].slice.call(c.querySelectorAll('[data-slide]'));
    var dotsWrap=c.querySelector('[data-dots]');
    var n=slides.length, i=0, timer=null;
    if(!n||!track) return;
    slides.forEach(function(s,idx){
      var d=document.createElement('button');
      d.type='button'; d.setAttribute('role','tab'); d.setAttribute('aria-label','Témoignage '+(idx+1));
      d.addEventListener('click',function(){go(idx);restart()});
      dotsWrap.appendChild(d);
    });
    var dots=[].slice.call(dotsWrap.children);
    function go(k){ i=(k+n)%n; track.style.transform='translateX('+(-i*100)+'%)'; dots.forEach(function(d,idx){d.setAttribute('aria-selected', idx===i?'true':'false')}); }
    function next(){go(i+1)} function prev(){go(i-1)}
    var bn=c.querySelector('[data-next]'), bp=c.querySelector('[data-prev]');
    if(bn) bn.addEventListener('click',function(){next();restart()});
    if(bp) bp.addEventListener('click',function(){prev();restart()});
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function start(){ if(reduce) return; timer=setInterval(next,4000); }
    function stop(){ if(timer){clearInterval(timer);timer=null;} }
    function restart(){ stop(); start(); }
    c.addEventListener('mouseenter',stop); c.addEventListener('mouseleave',start);
    c.addEventListener('focusin',stop); c.addEventListener('focusout',start);
    go(0); start();
  });

  // Lightbox : miniatures cliquables (ex. courbe de suivi impédancemètre)
  (function(){
    var triggers=[].slice.call(document.querySelectorAll('[data-lightbox]'));
    if(!triggers.length) return;
    var lb=document.createElement('div');
    lb.className='lb'; lb.setAttribute('role','dialog'); lb.setAttribute('aria-modal','true'); lb.setAttribute('aria-label','Image agrandie');
    lb.innerHTML='<button type="button" class="lb-close" aria-label="Fermer">\u00D7</button><figure class="lb-fig"><img class="lb-img" alt=""><figcaption class="lb-cap"></figcaption></figure>';
    document.body.appendChild(lb);
    var img=lb.querySelector('.lb-img'), cap=lb.querySelector('.lb-cap'), closeBtn=lb.querySelector('.lb-close');
    var last=null;
    function open(src,alt,caption,opener){
      last=opener; img.src=src; img.alt=alt||''; cap.textContent=caption||'';
      cap.style.display=caption?'':'none';
      lb.classList.add('open'); document.body.style.overflow='hidden'; closeBtn.focus();
    }
    function close(){ lb.classList.remove('open'); document.body.style.overflow=''; img.src=''; if(last){last.focus();last=null;} }
    triggers.forEach(function(t){
      t.addEventListener('click',function(){
        open(t.getAttribute('data-lightbox'), t.querySelector('img')?t.querySelector('img').alt:'', t.getAttribute('data-caption'), t);
      });
    });
    closeBtn.addEventListener('click',close);
    lb.addEventListener('click',function(e){ if(e.target===lb||e.target.classList.contains('lb-fig')) close(); });
    document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&lb.classList.contains('open')) close(); });
  })();
