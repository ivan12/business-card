 (function(){
        const wrapper = document.querySelector('.card-wrapper');
        const card = wrapper.querySelector('.editor-card');
        const red = document.querySelector('.traffic-light.red');
        const yellow = document.querySelector('.traffic-light.yellow');
        const green = document.querySelector('.traffic-light.green');
        const openBtn = document.getElementById('openBtn');

        let dragging = false;
        let startX = 0, startY = 0, offsetX = 0, offsetY = 0;

        function toPxPosition() {
          const rect = wrapper.getBoundingClientRect();
          wrapper.style.left = rect.left + 'px';
          wrapper.style.top = rect.top + 'px';
          wrapper.style.transform = 'none';
        }

        wrapper.addEventListener('pointerdown', (e) => {
          if (e.target.closest('.traffic-lights') || e.target.closest('.toolbar') || e.target.closest('a') || e.target.closest('.gear-btn')) return;
          e.preventDefault();
          const computed = getComputedStyle(wrapper).transform;
          if (computed !== 'none') toPxPosition();

          const rect = wrapper.getBoundingClientRect();
          startX = e.clientX;
          startY = e.clientY;
          offsetX = startX - rect.left;
          offsetY = startY - rect.top;
          dragging = true;
          wrapper.style.cursor = 'grabbing';
          document.body.style.userSelect = 'none';
          try { wrapper.setPointerCapture(e.pointerId); } catch (err) {}
        });

        window.addEventListener('pointermove', (e) => {
          if (!dragging) return;
          e.preventDefault();
          const x = e.clientX - offsetX;
          const y = e.clientY - offsetY;
          
          const winW = window.innerWidth;
          const winH = window.innerHeight;
          const w = wrapper.offsetWidth;
          const h = wrapper.offsetHeight;
          const clampedX = Math.min(Math.max(0, x), winW - w);
          const clampedY = Math.min(Math.max(0, y), winH - h);
          wrapper.style.left = clampedX + 'px';
          wrapper.style.top = clampedY + 'px';
        });

        window.addEventListener('pointerup', (e) => {
          if (!dragging) return;
          dragging = false;
          wrapper.style.cursor = 'grab';
          document.body.style.userSelect = '';
          try { wrapper.releasePointerCapture(e.pointerId); } catch (err) {}
        });

        wrapper.setAttribute('tabindex','0');
        wrapper.addEventListener('keydown', (e) => {
          const step = e.shiftKey ? 10 : 4;
          const left = parseFloat(wrapper.style.left || wrapper.getBoundingClientRect().left);
          const top = parseFloat(wrapper.style.top || wrapper.getBoundingClientRect().top);
          if (e.key === 'ArrowLeft') { wrapper.style.left = (left - step) + 'px'; e.preventDefault(); }
          if (e.key === 'ArrowRight') { wrapper.style.left = (left + step) + 'px'; e.preventDefault(); }
          if (e.key === 'ArrowUp') { wrapper.style.top = (top - step) + 'px'; e.preventDefault(); }
          if (e.key === 'ArrowDown') { wrapper.style.top = (top + step) + 'px'; e.preventDefault(); }
        });

        function setOpenVisible(visible){
          openBtn.hidden = !visible;
          openBtn.setAttribute('aria-hidden', String(!visible));
          if (visible) openBtn.focus();
        }

        // Editor modal
        const gearBtn = document.getElementById('gearBtn');
        const modal = document.getElementById('editorModal');
        const inpName = document.getElementById('inpName');
        const inpTitle = document.getElementById('inpTitle');
        const inpEmail = document.getElementById('inpEmail');
        const inpLinkedin = document.getElementById('inpLinkedin');
        const btnSave = document.getElementById('btnSave');
        const btnCancel = document.getElementById('btnCancel');

        function readValues(){
          const nameAnchor = document.querySelector('.json-link');
          const nameText = nameAnchor ? nameAnchor.textContent.replace(/"/g,'') : '';
          let linkedinUrl = '';
          if (nameAnchor) {
            linkedinUrl = nameAnchor.getAttribute('href') || '';
          }
          const titleToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('title'));
          const emailToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('email'));
          const linkToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('link'));
          const title = titleToken ? titleToken.querySelector('.token-string').textContent.replace(/"/g,'') : '';
          const email = emailToken ? emailToken.querySelector('.token-string').textContent.replace(/"/g,'') : '';
          let linkVal = '';
          if (linkToken) {
            const innerAnchor = linkToken.querySelector('.token-string a');
            if (innerAnchor) linkVal = innerAnchor.getAttribute('href') || innerAnchor.textContent || '';
            else linkVal = linkToken.querySelector('.token-string').textContent.replace(/"/g,'');
          }
          return { name: nameText, title, email, linkedin: linkedinUrl || linkVal };
        }

        function openEditor(){
          const vals = readValues();
          inpName.value = vals.name;
          inpTitle.value = vals.title;
          inpEmail.value = vals.email;
          inpLinkedin.value = vals.linkedin || '';
          modal.classList.remove('hidden');
          const content = document.getElementById('editorModal');
          if (content) content.classList.remove('hidden');
          const display = document.getElementById('modalDisplayName');
          if (display) display.textContent = vals.name || '';
          inpName.focus();
        }

        function closeEditor() {
          console.log('closeEditor called, adding hidden class');
          const content = document.getElementById('editorModal');
          content.style.display = 'none';
          gearBtn.focus();
        }

        gearBtn.addEventListener('click', () => { modal.classList.remove('hidden'); openEditor(); });
        btnCancel.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); console.log('Cancelar clicked'); closeEditor(); });
        modal.addEventListener('click', (e) => { if (e.target === modal) { console.log('modal bg clicked'); closeEditor(); } });
        window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) { console.log('Esc pressed'); closeEditor(); } });

        btnSave.addEventListener('click', () => {
          const nameAnchor = document.querySelector('.json-link');
          if (nameAnchor){
            nameAnchor.querySelector('.token-string').textContent = '"' + inpName.value + '"';
            nameAnchor.setAttribute('href', inpLinkedin.value || '#');
          }
          // update title
          const titleToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('title'));
          if (titleToken) titleToken.querySelector('.token-string').textContent = '"' + inpTitle.value + '"';
          // update email
          const emailToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('email'));
          if (emailToken) emailToken.querySelector('.token-string').textContent = '"' + inpEmail.value + '"';
          // update link token (json link property)
          const linkToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('link'));
          if (linkToken) {
            const linkAnchor = linkToken.querySelector('.token-string a');
            if (linkAnchor) {
              linkAnchor.setAttribute('href', inpLinkedin.value || '#');
            } else {
              linkToken.querySelector('.token-string').textContent = '"' + (inpLinkedin.value || '') + '"';
            }
          }

          // persist to localStorage
          const data = { name: inpName.value, title: inpTitle.value, email: inpEmail.value, linkedin: inpLinkedin.value };
          try { localStorage.setItem('businessCardData', JSON.stringify(data)); } catch (err) {}

          const display = document.getElementById('modalDisplayName');
          if (display) display.textContent = inpName.value || '';

          closeEditor();
        });

        try {
          const saved = JSON.parse(localStorage.getItem('businessCardData') || 'null');
          if (saved) {
            const nameAnchor = document.querySelector('.json-link');
            if (nameAnchor) {
              nameAnchor.querySelector('.token-string').textContent = '"' + (saved.name || '') + '"';
              nameAnchor.setAttribute('href', saved.linkedin || '#');
            }
            const titleToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('title'));
            if (titleToken) titleToken.querySelector('.token-string').textContent = '"' + (saved.title || '') + '"';
            const emailToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('email'));
            if (emailToken) emailToken.querySelector('.token-string').textContent = '"' + (saved.email || '') + '"';
            const linkToken = Array.from(document.querySelectorAll('.editor-line')).find(line => line.querySelector('.token-key') && line.querySelector('.token-key').textContent.includes('link'));
            if (linkToken) linkToken.querySelector('.token-string').textContent = '"' + (saved.linkedin || '') + '"';
          }
        } catch (err) {}

        // Actions
        function closeCard(){
          card.classList.remove('minimized');
          wrapper.classList.add('closed');
          setOpenVisible(true);
        }

        function minimizeCard(){
          card.classList.add('minimized');
          wrapper.classList.remove('closed');
          card.style.maxHeight = '139px';
          setOpenVisible(false);
        }

        function restoreCard(){
          card.classList.remove('minimized');
          wrapper.classList.remove('closed');
          const full = card.scrollHeight;
          card.style.maxHeight = full + 'px';
          setOpenVisible(false);
          setTimeout(() => { card.style.maxHeight = ''; }, 300);
        }

        red.addEventListener('click', closeCard);
        yellow.addEventListener('click', minimizeCard);
        green.addEventListener('click', restoreCard);

        [red,yellow,green].forEach(btn => {
          btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
          });
        });

        openBtn.addEventListener('click', () => { restoreCard(); wrapper.focus(); });

        })();