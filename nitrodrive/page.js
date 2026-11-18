/* NITRODRIVE page: hero video, bottom bar, 3D rail, sticky steps, reveals. No framework, no network. Everything degrades to the static CSS layout. */
(function(){
var d=document,h=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,raf=requestAnimationFrame;
h.classList.add('js');
/* hero video: loaded by JS only, never under reduced motion or Save-Data (the poster stays) */
var c=navigator.connection,v=d.querySelector('.hero video[data-src]'),heroIn=true;
if(v&&!RM&&!(c&&c.saveData)){v.src=v.dataset.src;v.play().catch(function(){});}else v=null;
function vid(){if(v){(heroIn&&!d.hidden)?v.play().catch(function(){}):v.pause();}}
d.addEventListener('visibilitychange',function(){h.classList.toggle('hid',d.hidden);vid();});
/* the bottom bar copies the hero store button, so launch day is one edit in the hero */
var st=d.querySelector('.hero .store');
d.querySelectorAll('[data-store]').forEach(function(el){el.appendChild(st.cloneNode(true));});
if(!('IntersectionObserver' in window))return;

/* hero off screen: show the bar, pause the video */
var bar=d.querySelector('.bar'),hero=d.querySelector('.hero');
new IntersectionObserver(function(es){heroIn=es[0].isIntersecting;if(bar)bar.classList.toggle('on',!heroIn);vid();}).observe(hero);

/* tickers stop when off screen */
var to=new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('off',!e.isIntersecting);});});
d.querySelectorAll('.tick').forEach(function(el){to.observe(el);});

/* reveals, once */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -8% 0px'});
d.querySelectorAll('.rv').forEach(function(el){io.observe(el);});

/* 3D rail: each phone turns away from the centre of the rail */
var rail=d.querySelector('.rail');
if(rail){var items=[].slice.call(rail.children),wait=false,gap=parseFloat(getComputedStyle(rail).columnGap)||0;
 var lay=function(){wait=false;var c=rail.scrollLeft+rail.clientWidth/2;
  var xs=items.map(function(li){var w=li.offsetWidth;return (li.offsetLeft+w/2-c)/(w+gap);});
  items.forEach(function(li,i){var x=xs[i],a=Math.min(Math.abs(x),2.2);
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
