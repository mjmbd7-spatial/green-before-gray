(() => {
'use strict';
let language='en';try{language=localStorage.getItem('gbg-language')==='bn'?'bn':'en';}catch{}
window.tr=key=>(window.TEXT[language][key]??window.TEXT.en[key]??key);
window.getLanguage=()=>language;
window.residentHref=(lat,lon,cell)=>{const p=new URLSearchParams({lat:String(lat),lon:String(lon),cell:String(cell)});return(window.SINGLE_FILE?'#resident?':'resident.html?')+p.toString();};
window.setLanguage=lang=>{
 language=lang==='bn'?'bn':'en';document.documentElement.lang=language;
 try{localStorage.setItem('gbg-language',language);}catch{}
 document.querySelectorAll('[data-i18n]').forEach(el=>el.textContent=tr(el.dataset.i18n));
 document.querySelectorAll('[data-i18n-html]').forEach(el=>el.innerHTML=tr(el.dataset.i18nHtml));
 document.querySelectorAll('[data-i18n-aria]').forEach(el=>el.setAttribute(el.tagName==='IMG'?'alt':'aria-label',tr(el.dataset.i18nAria)));
 document.querySelectorAll('[data-language]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.language===language)));
 document.querySelectorAll('#basemap-select option,#improvement option').forEach(el=>{const key=el.parentElement.id==='improvement'?'goal'+el.value:({streets:'streets',light:'light',dark:'dark',offline:'local'}[el.value]);if(key)el.textContent=tr(key);});
 document.querySelectorAll('.header nav').forEach(nav=>nav.setAttribute('aria-label',language==='bn'?'মূল মেনু':'Main navigation'));
 window.dispatchEvent(new CustomEvent('languagechange',{detail:{language}}));
};
document.querySelectorAll('[data-language]').forEach(b=>b.onclick=()=>setLanguage(b.dataset.language));
setLanguage(language);
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.header nav');
if(menu&&nav){menu.onclick=()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);};nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));}
document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');if(href.startsWith('#resident'))return;const target=document.getElementById(href.slice(1));if(target){e.preventDefault();if(window.routeResident)window.routeResident(false);target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});}}));
document.querySelectorAll('[data-open-methods]').forEach(b=>b.onclick=()=>{const d=document.getElementById('methods-dialog');if(d?.showModal)d.showModal();});
document.querySelectorAll('[data-close-methods]').forEach(b=>b.onclick=()=>b.closest('dialog').close());
const dialog=document.getElementById('methods-dialog');dialog?.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();});
if('IntersectionObserver' in window){document.body.classList.add('enhanced');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}
window.downloadBlob=(blob,name)=>{const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),15000);};
const D=window.PILOT;
if(D){const collection=fs=>({type:'FeatureCollection',features:fs.map(f=>({type:'Feature',geometry:f.geometry,properties:f.properties}))});const csv=fs=>{const keys=Object.keys(fs[0].properties);return [keys,...fs.map(f=>keys.map(k=>f.properties[k]??''))].map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(',')).join('\r\n');};document.querySelectorAll('[data-download]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();const key=a.dataset.download;let text,mime='application/geo+json;charset=utf-8';if(key==='fine-grid')text=JSON.stringify(collection(D.features),null,2);if(key==='population')text=JSON.stringify(collection(D.coarseFeatures),null,2);if(key==='boundary')text=JSON.stringify(D.boundary,null,2);if(key==='scenes'){text=D.sourceScenesCsv;mime='text/csv;charset=utf-8';}if(key==='fine-table'){text=csv(D.features);mime='text/csv;charset=utf-8';}if(text!==undefined)downloadBlob(new Blob([text],{type:mime}),a.download);}));}
// Canonical URLs are based on the real HTTPS location, never an invented host.
if(location.protocol==='https:'){const url=window.SITE_CONFIG?.siteUrl||location.href.split('#')[0].split('?')[0];const canonical=document.createElement('link');canonical.rel='canonical';canonical.href=url;document.head.append(canonical);const metas=[['og:url',url]];if(!window.SINGLE_FILE)metas.push(['og:image',new URL('assets/green-lane.webp',url).href]);for(const [key,value] of metas){const m=document.createElement('meta');m.setAttribute('property',key);m.content=value;document.head.append(m);}try{const s=document.getElementById('site-schema'),v=JSON.parse(s.textContent);v.url=url;s.textContent=JSON.stringify(v);}catch{}}
})();
