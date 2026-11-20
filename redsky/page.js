/* Redsky page: HUD ladders and read-outs that run with the scroll, lock-on titles, the radio, the salvo demo, reveals.
   No framework, no network. Without JS (or with reduced motion) everything shows in its final state. */
(function(){
var d=document,h=d.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches,raf=requestAnimationFrame;
h.classList.add('js');

var vids=d.querySelectorAll('video[data-auto]');
if(RM)vids.forEach(function(v){v.removeAttribute('autoplay');v.pause();});
d.addEventListener('visibilitychange',function(){h.classList.toggle('hid',d.hidden);});

/* nav backdrop once scrolled; ladders and read-outs: ALT falls as you scroll down ("fly low"), SPD follows the scroll speed */
var top=d.querySelector('.top'),lads=d.querySelectorAll('.lad'),alt=d.querySelector('[data-ro=alt]'),spd=d.querySelector('[data-ro=spd]');
var lastY=scrollY,lastT=performance.now(),vel=0,wait=false;
function hud(){wait=false;var y=scrollY,t=performance.now(),dt=Math.max(16,t-lastT);
 vel=vel*.8+Math.abs(y-lastY)/dt*.2;lastY=y;lastT=t;
 top.classList.toggle('is-s',y>40);
 if(!RM){lads.forEach(function(l,i){l.style.setProperty('--o',((i?-y:y)*.35).toFixed(1)+'px');});
  if(alt)alt.textContent=Math.max(150,Math.round((3200-y*1.6)/10)*10);
  if(spd)spd.textContent=Math.round(420+Math.min(vel,6)*60);
  if(vel>.02)raf(settle);}
}
function settle(){if(!wait){wait=true;raf(hud);}}
addEventListener('scroll',settle,{passive:true});hud();

/* gameplay clips play only while on screen (preload=none until then) */
if(!RM&&'IntersectionObserver' in window){var vo=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting&&!d.hidden)v.play().catch(function(){});else v.pause();});},{rootMargin:'200px 0px'});
 vids.forEach(function(v){vo.observe(v);});}

if(!('IntersectionObserver' in window)){h.classList.remove('js');return;}

/* reveals and lock-on titles, once */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{rootMargin:'0px 0px -12% 0px'});
d.querySelectorAll('.rv,.disp,.wp').forEach(function(el){io.observe(el);});

/* the radio: a line lights as it crosses the lower third */
var ro=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);}});},{rootMargin:'0px 0px -30% 0px'});
d.querySelectorAll('.radio li').forEach(function(el){ro.observe(el);});

/* salvo demo: lock 1..4, fire, hit, reset; runs only while on screen */
var sc=d.getElementById('scope');
if(sc){var pips=sc.querySelectorAll('.pip'),seq=[[600,'l1'],[1000,'l2'],[1400,'l3'],[1800,'l4'],[2500,'fire'],[3100,'hit'],[4700,'']],timers=[],on=false;
 var set=function(cls){if(!cls){sc.setAttribute('class','scope');pips.forEach(function(p){p.classList.remove('on');});return;}
  sc.classList.add(cls);var n=+cls.slice(1);if(cls[0]==='l')pips[n-1].classList.add('on');};
 var run=function(){set('');seq.forEach(function(s){timers.push(setTimeout(function(){set(s[1]);},s[0]));});timers.push(setTimeout(function(){if(on)run();},5200));};
 var stop=function(){timers.forEach(clearTimeout);timers=[];};
 if(RM){['l1','l2','l3','l4'].forEach(set);}
 else new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!on){on=true;run();}else if(!e.isIntersecting&&on){on=false;stop();}});},{threshold:.3}).observe(sc);
}
})();
