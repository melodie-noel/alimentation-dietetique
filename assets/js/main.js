
  document.getElementById('yr').textContent=new Date().getFullYear();
  var b=document.getElementById('burger'),m=document.getElementById('menu');
  b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
  m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded',false)}});
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:0,rootMargin:'0px 0px -42% 0px'});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.cascade').forEach(function(el){io.observe(el)});
