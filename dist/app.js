const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
nav.querySelectorAll('a').forEach(a=>{if(location.pathname===a.pathname)a.setAttribute('aria-current','page');a.addEventListener('click',closeMenu);});
matchMedia('(min-width:851px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
const cityData=[['Colorado Springs','colorado-springs','Based in Colorado Springs, with towing and roadside assistance available by phone. Share your exact pickup point to confirm service.'],['Pueblo','pueblo','Pueblo is part of the company’s published service territory. Call with your vehicle and pickup location to discuss availability.'],['Cañon City','canon-city','Towing and roadside assistance in the Cañon City area. Confirm the exact pickup point, access, and current availability by phone.']];
document.querySelectorAll('[data-city]').forEach(button=>button.addEventListener('click',()=>{const [name,slug,copy]=cityData[Number(button.dataset.city)];document.querySelectorAll('[data-city]').forEach(x=>x.setAttribute('aria-pressed',String(x===button)));document.querySelector('#area-name').textContent=name;document.querySelector('#area-copy').textContent=copy;document.querySelector('#area-link').href='/service-areas/'+slug+'/';}));
const dialog=document.querySelector('#lightbox'), items=[...document.querySelectorAll('.gallery-item')];let photoIndex=0, opener;
function showPhoto(index){photoIndex=(index+items.length)%items.length;const item=items[photoIndex],img=item.querySelector('img');dialog.querySelector('img').src=img.src;dialog.querySelector('img').alt=img.alt;dialog.querySelector('.lightbox-caption').textContent=item.closest('figure').querySelector('figcaption').textContent;}
items.forEach((item,index)=>item.addEventListener('click',()=>{opener=item;showPhoto(index);dialog.showModal();}));
dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('close',()=>opener?.focus());
dialog.querySelectorAll('[data-direction]').forEach(x=>x.addEventListener('click',()=>showPhoto(photoIndex+Number(x.dataset.direction))));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showPhoto(photoIndex+1);}if(e.key==='ArrowLeft'){e.preventDefault();showPhoto(photoIndex-1);}});
let touchStart;dialog.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX;},{passive:true});dialog.addEventListener('touchend',e=>{const delta=e.changedTouches[0].clientX-touchStart;if(Math.abs(delta)>50)showPhoto(photoIndex+(delta<0?1:-1));},{passive:true});
const form=document.querySelector('#request-form');
if(form){let summary='';form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const d=new FormData(form);summary=['Towing / roadside enquiry','Name: '+d.get('name'),'Callback: '+d.get('phone'),'Pickup: '+d.get('location'),'Vehicle: '+d.get('vehicle'),'Service: '+d.get('service'),'Details: '+d.get('details')].join('\n');document.querySelector('#request-summary').textContent=summary;document.querySelector('#request-result').hidden=false;document.querySelector('#email-request').href='mailto:squarestatetowing@gmail.com?subject='+encodeURIComponent('Towing / roadside enquiry')+'&body='+encodeURIComponent(summary);});document.querySelector('#copy-request').addEventListener('click',async e=>{try{await navigator.clipboard.writeText(summary);e.target.textContent='Details copied';}catch{e.target.textContent='Select and copy the details above';}});form.addEventListener('input',()=>{document.querySelector('#request-result').hidden=true;document.querySelector('#copy-request').textContent='Copy details';});}
const hero=document.querySelector('.hero'),video=document.querySelector('.cinema-video'),motion=matchMedia('(prefers-reduced-motion: reduce)');
if(hero&&!video&&!motion.matches){let seen=false;try{seen=sessionStorage.getItem('sst-photo-seen')==='1';sessionStorage.setItem('sst-photo-seen','1');}catch{}if(!seen)hero.classList.add('photo-reveal');}
if(video){let skipped=false;try{skipped=localStorage.getItem('sst-skip-intro')==='1';}catch{}const slow=navigator.connection?.saveData||/2g/.test(navigator.connection?.effectiveType||'');const controls=document.querySelector('.cinema-controls'),skip=document.querySelector('#skip-intro'),sound=document.querySelector('#sound-toggle');let timer,audio,finished=false;
 const finish=()=>{finished=true;clearTimeout(timer);video.pause();video.classList.remove('playing');controls.hidden=true;if(audio){audio.pause();audio.currentTime=0;}video.muted=true;};
 skip.addEventListener('click',()=>{try{localStorage.setItem('sst-skip-intro','1');}catch{}finish();document.querySelector('.hero .button')?.focus();});
 sound?.addEventListener('click',()=>{if(!audio){audio=new Audio(video.dataset.audio);audio.volume=.2;}if(audio.paused){audio.currentTime=video.currentTime;audio.play().then(()=>{sound.setAttribute('aria-pressed','true');sound.textContent='Mute sound';}).catch(()=>{sound.textContent='Sound unavailable';});}else{audio.pause();sound.setAttribute('aria-pressed','false');sound.textContent='Enable sound';}});
 video.addEventListener('ended',finish);video.addEventListener('error',finish);video.addEventListener('stalled',finish);motion.addEventListener('change',e=>{if(e.matches)finish();});document.addEventListener('visibilitychange',()=>{if(document.hidden)finish();});
 if(!skipped&&!motion.matches&&!slow&&matchMedia('(min-width:851px)').matches){video.src=video.dataset.src;video.load();timer=setTimeout(finish,6000);video.play().then(()=>{if(finished){video.pause();return;}video.classList.add('playing');controls.hidden=false;}).catch(finish);}
}

// Authentic-photo fallback for the Midnight Dispatch concept. No simulated footage or audio.
const entrance=document.querySelector('.cinematic-hero');
if(entrance){
 const skip=document.querySelector('#skip-entrance'),replay=document.querySelector('#replay-entrance'),status=document.querySelector('#entrance-status');
 let jobs=[],active=false;
 const clearJobs=()=>{jobs.forEach(clearTimeout);jobs=[];};
 const finish=(label='Southern Colorado. Ready for the next call.')=>{clearJobs();active=false;entrance.classList.remove('entrance-playing');skip.hidden=true;replay.hidden=false;status.textContent=label;};
 const play=()=>{if(motion.matches)return;clearJobs();entrance.classList.remove('entrance-playing');void entrance.offsetWidth;entrance.classList.add('entrance-playing');active=true;skip.hidden=false;replay.hidden=true;status.textContent='01 / After dark';const duration=matchMedia('(max-width:850px)').matches?2800:5800;entrance.style.setProperty('--entrance-duration',duration+'ms');jobs.push(setTimeout(()=>{status.textContent='02 / The equipment behind the work';},duration*.23),setTimeout(()=>{status.textContent='03 / On the road. On the job.';},duration*.52),setTimeout(()=>finish(),duration));try{sessionStorage.setItem('sst-entrance-seen','1');}catch{}};
 skip.addEventListener('click',()=>{try{localStorage.setItem('sst-skip-intro','1');}catch{}finish('Entrance skipped.');replay.focus();});
 replay.addEventListener('click',()=>{try{localStorage.removeItem('sst-skip-intro');}catch{}play();skip.focus();});
 motion.addEventListener('change',e=>{if(e.matches){finish('Reduced motion enabled.');replay.disabled=true;}else{replay.disabled=false;}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&active)finish();});
 let seen=false,skipped=false;try{seen=sessionStorage.getItem('sst-entrance-seen')==='1';skipped=localStorage.getItem('sst-skip-intro')==='1';}catch{}
 const limited=navigator.connection?.saveData||/2g/.test(navigator.connection?.effectiveType||'');
 if(motion.matches){finish('Reduced motion enabled.');replay.disabled=true;}else if(!seen&&!skipped&&!limited){play();}else{finish();}
}
