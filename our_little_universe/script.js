(() => {
  'use strict';
  const content = window.BIRTHDAY_CONTENT;
  if (!content) { document.body.insertAdjacentHTML('afterbegin', '<p>content.js файлыг шалгана уу.</p>'); return; }

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  // Зөвхөн <em> тэмдэглэгээг гарчигт зөвшөөрнө.
  const titleHtml = (value) => escapeHtml(value).replace(/&lt;em&gt;/g, '<em>').replace(/&lt;\/em&gt;/g, '</em>').replace(/&lt;br&gt;/g, '<br>');

  function photoMarkup(file, description, className = '') {
    return `<div class="photo-slot ${className}" data-photo="${escapeHtml(file)}">
      <div class="placeholder-content"><span class="placeholder-icon" aria-hidden="true">♡</span>
      <strong>${escapeHtml(description)}</strong><small>Энд зураг оруулна</small></div>
      <img loading="lazy" alt="${escapeHtml(description)}"></div>`;
  }

  function bindPhotos(root = document) {
    $$('[data-photo]', root).forEach(slot => {
      const filename = slot.getAttribute('data-photo');
      if (!filename) return;
      const img = $('img', slot);
      if (!img) return;
      img.onload = () => slot.classList.add('has-photo');
      img.onerror = () => slot.classList.remove('has-photo');
      img.src = 'assets/' + filename;
      if (img.complete && img.naturalWidth > 0) slot.classList.add('has-photo');
    });
  }

  $('#hero-title').innerHTML = titleHtml(content.hero.title);
  $('#hero-subtitle').textContent = content.hero.subtitle;
  $('.hero-photo-wrap').setAttribute('data-photo', content.hero.photo);
  $('#bridge-quote').textContent = content.bridgeQuote;
  $('#final-title').textContent = content.final.title;
  $('#final-message').textContent = content.final.message;

  $('#story-timeline').innerHTML = content.story.map((story) => `
    <article class="story-row reveal">
      <div class="story-image-col">
        <div class="story-frame">${photoMarkup(story.photo, 'Бидний дурсамжийн зураг', 'story-photo')}
          <div class="story-image-caption">${escapeHtml(story.photoCaption)} ♡</div>
        </div>
      </div>
      <div class="story-copy">
        <span class="story-number">${escapeHtml(story.number)}</span>
        <span class="story-tag">${escapeHtml(story.label)}</span>
        <h3>${titleHtml(story.title)}</h3>
        <p>${escapeHtml(story.text)}</p>
      </div>
    </article>`).join('');

  $('#memory-grid').innerHTML = content.memories.map((memory, index) => `
    <button class="memory-card ${escapeHtml(memory.color)} reveal" type="button" data-memory="${index}" aria-label="${escapeHtml(memory.title)}: дурсамжийг нээх">
      <span class="memory-number">дурсамж ${String(index + 1).padStart(2, '0')}</span>
      <div class="memory-present" aria-hidden="true">
        <span class="present-bow"></span><span class="present-lid"></span>
        <span class="present-box"></span><span class="present-ribbon-v"></span>
        <span class="present-ribbon-h"></span><span class="present-knot"></span>
      </div>
      <div><h3>${escapeHtml(memory.title)}</h3><p>${escapeHtml(memory.subtitle)}</p>
      <span class="memory-open">Дараад нээгээрэй <span aria-hidden="true">↗</span></span></div>
    </button>`).join('');

  const bookIcon = `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M14 26c12-7 28-7 42 1v62c-14-8-30-8-42-1V26Z" fill="#F2DED3" stroke="#986C7D" stroke-width="2.5"/>
    <path d="M98 26c-12-7-28-7-42 1v62c14-8 30-8 42-1V26Z" fill="#FFF4E8" stroke="#986C7D" stroke-width="2.5"/>
    <path d="M56 27v62M22 36c8-3 17-3 26 1M22 46c8-3 17-3 26 1M64 37c9-4 18-4 26-1M64 47c9-4 18-4 26-1" stroke="#C59E9F" stroke-width="2" stroke-linecap="round"/>
    <path d="M43 18l4-8 4 8M74 12l2-6 2 6" stroke="#C88F9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 27 56 89" stroke="#75566C" stroke-width="2"/>
  </svg>`;
  const flowerIcon = `<svg viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M58 96c-3-21 4-42 0-61" stroke="#7A8D72" stroke-width="3" stroke-linecap="round"/>
    <path d="M58 70c-16-15-28-11-26-4 2 7 13 13 26 8M58 84c14-15 27-12 24-4-3 7-14 11-24 7" fill="#A4B6A0" stroke="#738D74" stroke-width="2"/>
    <ellipse cx="58" cy="23" rx="12" ry="19" fill="#EFB2BF" transform="rotate(-7 58 23)"/>
    <ellipse cx="76" cy="39" rx="12" ry="19" fill="#F3BFC9" transform="rotate(67 76 39)"/>
    <ellipse cx="66" cy="55" rx="12" ry="19" fill="#E6A0B4" transform="rotate(141 66 55)"/>
    <ellipse cx="42" cy="50" rx="12" ry="19" fill="#F6CBD0" transform="rotate(-141 42 50)"/>
    <ellipse cx="39" cy="28" rx="12" ry="19" fill="#E6A0B4" transform="rotate(-64 39 28)"/>
    <circle cx="57" cy="40" r="13" fill="#E3C17E" stroke="#CBAE77" stroke-width="2"/>
    <path d="M53 39h1M62 39h1M54 44c2 2 5 2 7 0" stroke="#94754E" stroke-width="2" stroke-linecap="round"/>
  </svg>`;

  $('#secret-grid').innerHTML = content.gifts.map((gift, index) => `
    <article class="secret-card reveal" data-gift="${index}">
      <span class="corner-number">${escapeHtml(gift.number)} / 02</span>
      <div class="secret-icon">${gift.icon === 'book' ? bookIcon : flowerIcon}</div>
      <p class="secret-label">${escapeHtml(gift.label)}</p>
      <h3>${escapeHtml(gift.title)}</h3>
      <p class="secret-clue">${escapeHtml(gift.clue)}</p>
      <button class="guess-toggle" type="button" aria-expanded="false">Бэлгийг таах <span aria-hidden="true">→</span></button>
      <div class="guess-panel" hidden>
        <label for="guess-${index}">Ямар бэлэг гэж бодож байна?</label>
        <form class="guess-form" novalidate>
          <div class="guess-input-row"><input class="guess-input" id="guess-${index}" type="text" placeholder="Хариултаа энд бичээрэй..." autocomplete="off" required maxlength="110">
            <button class="guess-submit" type="submit">Таах</button></div>
          <p class="feedback" role="status" aria-live="polite" hidden></p>
        </form>
        <ul class="hint-list" hidden></ul>
        <div class="hint-actions"><button class="hint-button" type="button">Бас нэг сэжүүр ✧</button>
          <button class="skip-button" type="button" hidden>Нууцыг харах ♡</button></div>
      </div>
      <div class="gift-reveal" hidden>
        <span class="reveal-label">✦ &nbsp; ЧИ НУУЦЫГ ТАЙЛЛАА! &nbsp; ✦</span>
        ${photoMarkup(gift.photo, 'Бэлгийн зураг', 'gift-reveal-photo')}
        <h4>${escapeHtml(gift.revealTitle)}</h4><p>${escapeHtml(gift.revealText)}</p>
        <span class="reveal-heart" aria-hidden="true">♡</span>
      </div>
    </article>`).join('');

  bindPhotos();

  // Бэлгийн хайрцаг дээр дарвал зурагтай богино мэндчилгээ гарна.
  const memoryDialog = $('#memory-dialog');
  let lastOpenButton = null;
  $$('.memory-card').forEach(button => button.addEventListener('click', () => {
    const memory = content.memories[Number(button.dataset.memory)];
    lastOpenButton = button;
    $('#modal-title').textContent = memory.title;
    $('#modal-message').textContent = memory.wish;
    const slot = $('#modal-photo');
    slot.classList.remove('has-photo');
    slot.setAttribute('data-photo', memory.photo);
    bindPhotos(slot.parentElement);
    memoryDialog.showModal();
  }));
  function closeModal() { memoryDialog.close(); lastOpenButton?.focus(); }
  $('#modal-close').addEventListener('click', closeModal);
  memoryDialog.addEventListener('click', event => { if (event.target === memoryDialog) closeModal(); });
  memoryDialog.addEventListener('close', () => lastOpenButton?.focus());

  let unlocked = new Set();
  function normalize(answer) {
    return String(answer).trim().toLowerCase().replace(/ё/g, 'е').replace(/[«»“”'".,!?()\[\]{}:;–—-]/g,' ').replace(/\s+/g,' ').trim();
  }
  function celebrate(count = 20) {
    const layer = $('#confetti-layer');
    const glyphs = ['♥', '♡', '✦', '✧', '✳'];
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('span');
      particle.className = 'confetti-heart';
      particle.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.fontSize = (10 + Math.random() * 19) + 'px';
      particle.style.color = ['#f4b1be','#e7c8a5','#d8a0bf','#fff1dd'][i%4];
      particle.style.setProperty('--fall-time', (3 + Math.random() * 2.7) + 's');
      particle.style.setProperty('--drift', ((Math.random() - .5) * 210) + 'px');
      particle.style.animationDelay = (Math.random() * .6) + 's';
      layer.appendChild(particle);
      particle.addEventListener('animationend', () => particle.remove(), {once: true});
    }
  }
  function unlockGift(index) {
    if (unlocked.has(index)) return;
    unlocked.add(index);
    const card = $(`.secret-card[data-gift="${index}"]`);
    $('.guess-panel',card).hidden = true;
    $('.guess-toggle',card).hidden = true;
    $('.gift-reveal',card).hidden = false;
    $('#unlock-counter span:last-child').textContent = `${unlocked.size} / ${content.gifts.length} нууц тайлагдлаа`;
    celebrate(25);
    if (unlocked.size === content.gifts.length) {
      $('#secret-final').hidden = false;
      setTimeout(() => { celebrate(42); $('#secret-final').scrollIntoView({behavior:'smooth', block:'center'}); }, 750);
    }
  }

  $$('.secret-card').forEach(card => {
    const index = Number(card.dataset.gift);
    const gift = content.gifts[index];
    const open = $('.guess-toggle', card);
    const panel = $('.guess-panel', card);
    const feedback = $('.feedback',card);
    const input = $('.guess-input',card);
    const list = $('.hint-list',card);
    const hintButton = $('.hint-button',card);
    const skipButton = $('.skip-button',card);
    let hintsSeen = 0;
    open.addEventListener('click', () => {
      panel.hidden = false; open.hidden = true; open.setAttribute('aria-expanded','true'); input.focus();
    });
    $('.guess-form',card).addEventListener('submit', e => {
      e.preventDefault();
      const answer = normalize(input.value);
      if (!answer) { feedback.textContent = 'Эхлээд юу гэж бодож байгаагаа бичээрэй ♡'; feedback.hidden = false; return; }
      const matched = gift.answers.some(accepted => {
        const candidate = normalize(accepted);
        return answer === candidate || (candidate.length >= 5 && answer.includes(candidate));
      });
      if (matched) { unlockGift(index); return; }
      feedback.hidden = false;
      feedback.classList.remove('success');
      feedback.textContent = index === 1 && answer.includes('цэцэг') ? 'Цэцэг зөв байна! Харин тэр цэцэг юун дээр байгаа бол? 🌸' : 'Хөөрхөн таамаг байна! Гэхдээ дахиад нэг бодоод үзээрэй ♡';
    });
    hintButton.addEventListener('click', () => {
      if (hintsSeen >= gift.hints.length) return;
      const li = document.createElement('li');
      li.textContent = gift.hints[hintsSeen++];
      list.appendChild(li); list.hidden = false;
      if (hintsSeen === gift.hints.length) {
        hintButton.hidden = true; skipButton.hidden = false;
      }
    });
    skipButton.addEventListener('click', () => unlockGift(index));
  });

  $('#start-story').addEventListener('click', () => {
    $('#our-story').scrollIntoView({behavior: 'smooth'});
    celebrate(12);
  });
  $('#celebrate-again').addEventListener('click', () => celebrate(50));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('shown'); observer.unobserve(entry.target); } });
    }, {rootMargin:'0px 0px -55px 0px', threshold:.08});
    $$('.reveal:not(.shown)').forEach(node => observer.observe(node));
  } else { $$('.reveal').forEach(node => node.classList.add('shown')); }
})();
