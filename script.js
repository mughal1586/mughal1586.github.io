(function () {
  'use strict';

  // ═══ Data ═══
  const typewriterText = '$ ./linux --skills && ./pentest --learn';

  // ═══ Tab Switching ═══
  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');

  function switchTab(tabId) {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    const content = document.getElementById('tab-' + tabId);

    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', function () {
      switchTab(this.dataset.tab);
    });
  });

  // ═══ Typewriter ═══
  const typeEl = document.querySelector('.typing-line');
  typeEl.textContent = typewriterText;

  // ═══ Skill Tags ═══
  const skillGroups = [
    { label: 'Languages', items: ['C++', 'C', 'Bash'] },
    { label: 'Tools', items: ['Linux', 'Networking', 'Git/GitHub'] },
  ];

  const grid = document.getElementById('skillsGrid');

  skillGroups.forEach(group => {
    const groupEl = document.createElement('div');
    groupEl.className = 'skill-group';

    const label = document.createElement('div');
    label.className = 'skill-group-label';
    label.textContent = group.label;
    groupEl.appendChild(label);

    group.items.forEach((name, i) => {
      const tag = document.createElement('span');
      tag.className = 'skill-tag';
      tag.textContent = name;
      tag.style.marginLeft = `${(i + 1) * 1.2}rem`;
      groupEl.appendChild(tag);
    });

    grid.appendChild(groupEl);
  });

  // ═══ Cursor Glow ═══
  const glow = document.getElementById('cursorGlow');
  let glowX = -500, glowY = -500;
  let targetX = -500, targetY = -500;

  document.addEventListener('mousemove', function (e) {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  function animateGlow() {
    glowX += (targetX - glowX) * 0.08;
    glowY += (targetY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ═══ Matrix Rain (subtle) ═══
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');

  let cols, drops;

  function resizeMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / 20);
    drops = Array(cols).fill(1);
  }

  resizeMatrix();
  window.addEventListener('resize', resizeMatrix);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]<>/\\|!@#$%^&*()';

  function drawMatrix() {
    ctx.fillStyle = 'rgba(8, 8, 8, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = '12px monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(char, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    requestAnimationFrame(drawMatrix);
  }

  drawMatrix();

})();
