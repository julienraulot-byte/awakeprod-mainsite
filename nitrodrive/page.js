/* NITRODRIVE page: counters, 3D rail, sticky steps, reveals. No framework, no network. Everything degrades to the static CSS layout. */
(function(){
var d=document,h=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,raf=requestAnimationFrame;
h.classList.add('js');
var v=d.querySelector('.hero video');
if(v&&RM){v.removeAttribute('autoplay');v.pause();}
d.addEventListener('visibilitychange',function(){h.classList.toggle('hid',d.hidden);if(v&&!RM){d.hidden?v.pause():v.play().catch(function(){});}});
if(!('IntersectionObserver' in window))return;

/* reveals, once */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
d.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

/* counters: count up on reveal, ease-out */
function count(el){var n=+el.dataset.n,t0=performance.now(),dur=RM?1:1300;
 raf(function f(t){var p=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-p,3);el.textContent=Math.round(n*e);if(p<1)raf(f);});}
var co=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){count(e.target);co.unobserve(e.target);}});},{threshold:.5});
d.querySelectorAll('[data-n]').forEach(function(el){el.textContent='0';co.observe(el);});

/* 3D rail: each phone turns away from the centre of the rail */
var rail=d.querySelector('.rail');
if(rail){var items=[].slice.call(rail.children),wait=false,gap=parseFloat(getComputedStyle(rail).columnGap)||0;
 var lay=function(){wait=false;var c=rail.scrollLeft+rail.clientWidth/2;
  items.forEach(function(li){var w=li.offsetWidth,x=(li.offsetLeft+w/2-c)/(w+gap),a=Math.min(Math.abs(x),2.2);
   li.style.transform=RM?'':'rotateY('+(-x*26).toFixed(2)+'deg) translateZ('+(-a*110).toFixed(1)+'px)';
   li.style.opacity=(1-a*.2).toFixed(2);li.classList.toggle('is-c',a<.5);});};
 rail.addEventListener('scroll',function(){if(!wait){wait=true;raf(lay);}},{passive:true});
 addEventListener('resize',lay);lay();
}

/* sticky steps: the step crossing the middle of the viewport owns the phone */
var steps=d.querySelectorAll('.step'),shots=d.querySelectorAll('.stage img');
if(steps.length){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=+e.target.dataset.i;
  steps.forEach(function(s,k){s.classList.toggle('is-on',k===i);});shots.forEach(function(s,k){s.classList.toggle('is-on',k===i);});}});},{rootMargin:'-45% 0px -45% 0px'});
 steps.forEach(function(s){so.observe(s);});}
})();
