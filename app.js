const docs=window.PORTFOLIO;
const pages=['home','works','gallery','about'];
document.querySelector('.skip').addEventListener('click',e=>{e.preventDefault();document.querySelector('#main').focus()});
const grid=document.querySelector('#work-grid');
const artworks=Array.from({length:8},(_,i)=>({title:`原创角色设计 ${String(i+1).padStart(2,'0')}`,file:`assets-art-${i+1}.png`}));
function renderWorks(filter='全部'){
 grid.innerHTML=docs.filter(d=>filter==='全部'||d.category===filter).map(d=>`<button class="work-card" data-doc="${d.id}"><div class="work-image"><img src="${d.pages[0]}" alt="${d.title}文档首页" loading="lazy"><span>PDF / ${d.pages.length} PAGES</span></div><div class="work-content"><span class="work-tag">${d.category}</span><h3>${d.title}</h3><h4>${d.subtitle}</h4><p>${d.description}</p><b>查看完整文档 ↗</b></div></button>`).join('');
}
renderWorks();
document.querySelector('#gallery-grid').innerHTML=artworks.map((a,i)=>`<button class="gallery-card" data-art="${i}"><img src="assets-thumb-${i+1}.jpg" alt="${a.title}，含角色立绘与设定" loading="lazy"><span>${a.title}<small>VIEW ↗</small></span></button>`).join('');
function route(){const page=pages.includes(location.hash.slice(1))?location.hash.slice(1):'home';document.querySelectorAll('.page').forEach(el=>el.hidden=el.id!==page);document.querySelectorAll('[data-page]').forEach(el=>{el.classList.toggle('active',el.dataset.page===page);if(el.dataset.page===page)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current')});window.scrollTo(0,0)}
addEventListener('hashchange',route);route();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(el=>el.classList.toggle('selected',el===b));renderWorks(b.dataset.filter)}));
const viewer=document.querySelector('#viewer'),image=document.querySelector('#viewer-image'),body=document.querySelector('.viewer-body');
let current=[],index=0,mode='doc',opener=null;
function showPage(){image.src=current[index];image.alt=mode==='doc'?`${document.querySelector('#viewer-title').textContent}，第${index+1}页`:artworks[index].title;document.querySelector('#page-count').textContent=`${index+1} / ${current.length}`;document.querySelector('#previous').disabled=index===0;document.querySelector('#next').disabled=index===current.length-1;body.scrollTo(0,0);if(mode==='art'){document.querySelector('#viewer-title').textContent=artworks[index].title;document.querySelector('#download').href=current[index]}}
function openViewer(type,id,trigger){mode=type;opener=trigger;body.classList.remove('zoomed');document.querySelector('#zoom').setAttribute('aria-pressed','false');document.querySelector('#zoom').textContent='放大阅读 ＋';if(type==='doc'){let d=docs.find(d=>d.id===id);current=d.pages;index=0;document.querySelector('#viewer-title').textContent=d.title;document.querySelector('#viewer-type').textContent=d.subtitle;document.querySelector('#download').href=d.file;document.querySelector('#download').download=d.filename;}else{current=artworks.map(a=>a.file);index=id;document.querySelector('#viewer-type').textContent='ORIGINAL CHARACTER / 自绘原创角色';document.querySelector('#download').download='';}showPage();viewer.showModal();document.body.classList.add('modal-open')}
document.addEventListener('click',e=>{const d=e.target.closest('[data-doc]'),a=e.target.closest('[data-art]');if(d)openViewer('doc',Number(d.dataset.doc),d);if(a)openViewer('art',Number(a.dataset.art),a)});
document.querySelector('#close-viewer').onclick=()=>viewer.close();viewer.addEventListener('close',()=>{document.body.classList.remove('modal-open');opener?.focus()});viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
function step(n){if(index+n>=0&&index+n<current.length){index+=n;showPage()}}
document.querySelector('#previous').onclick=()=>step(-1);document.querySelector('#next').onclick=()=>step(1);
viewer.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();step(-1)}if(e.key==='ArrowRight'){e.preventDefault();step(1)}});
document.querySelector('#zoom').onclick=e=>{let on=body.classList.toggle('zoomed');e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'适应页面 −':'放大阅读 ＋'};
document.querySelector('#motion').onclick=e=>{let off=document.body.classList.toggle('no-motion');e.currentTarget.setAttribute('aria-pressed',off);e.currentTarget.textContent=off?'动效 OFF':'动效 ON';e.currentTarget.title=off?'开启背景动效':'关闭背景动效'};
document.querySelector('#copy-email').onclick=async()=>{try{await navigator.clipboard.writeText('mayingqi789@163.com');document.querySelector('#copy-status').textContent='邮箱已复制。'}catch{document.querySelector('#copy-status').textContent='请长按或选中上方邮箱复制。'}};
