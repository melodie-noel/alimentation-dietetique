
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
    function start(){ if(reduce) return; timer=setInterval(next,4200); }
    function stop(){ if(timer){clearInterval(timer);timer=null;} }
    function restart(){ stop(); start(); }
    c.addEventListener('mouseenter',stop); c.addEventListener('mouseleave',start);
    c.addEventListener('focusin',stop); c.addEventListener('focusout',start);
    go(0); start();
  });
