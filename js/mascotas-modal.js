(function(){
  const cards = document.querySelectorAll('.pet-card');
  if(!cards || cards.length === 0) return;

  // create modal elements
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.setAttribute('role','dialog');
  overlay.setAttribute('aria-modal','true');
  overlay.tabIndex = -1;

  const content = document.createElement('div');
  content.className = 'modal-content';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'modal-close';
  closeBtn.type = 'button';
  closeBtn.setAttribute('aria-label','Cerrar');
  closeBtn.innerHTML = '&times;';

  const mediaWrap = document.createElement('div');
  mediaWrap.className = 'modal-media';
  const img = document.createElement('img');
  img.alt = '';
  mediaWrap.appendChild(img);

  const desc = document.createElement('div');
  desc.className = 'modal-desc';

  content.appendChild(closeBtn);
  content.appendChild(mediaWrap);
  content.appendChild(desc);
  overlay.appendChild(content);
  document.body.appendChild(overlay);

  let lastFocused = null;

  function openModal(src, altText, description){
    lastFocused = document.activeElement;
    img.src = src;
    img.alt = altText || '';
    desc.textContent = description || '';
    overlay.classList.add('open');
    overlay.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeModal(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    img.src = '';
    if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  // events
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e)=>{ if(e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e)=>{
    if(!overlay.classList.contains('open')) return;
    if(e.key === 'Escape') closeModal();
  });

  // make cards open modal
  cards.forEach(card => {
    // ensure pointer cursor
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e)=>{
      const media = card.querySelector('.pet-media img');
      if(!media) return;
      const src = media.getAttribute('src');
      const alt = media.getAttribute('alt') || '';
      const description = card.dataset && card.dataset.desc ? card.dataset.desc : alt;
      openModal(src, alt, description);
    });
  });

})();
