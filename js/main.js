// Clipboard logic
        const clipboard = new ClipboardJS('.copy-btn');
        clipboard.on('success', function (e) {
            const btn = e.trigger;
            btn.classList.add('copied');
            btn.querySelector('span').textContent = 'Copied!';
            setTimeout(() => {
                btn.classList.remove('copied');
                btn.querySelector('span').textContent = 'Copy';
            }, 1500);
            e.clearSelection();
        });
        clipboard.on('error', () => alert('Copy failed. Please select and copy manually.'));

        // Auto resize iframe
        const iframe = document.getElementById('demoIframe');
        function resizeIframe() {
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                if (!doc) return;
                const html = doc.documentElement, body = doc.body;
                const h = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
                iframe.style.height = h + 'px';
            } catch (err) {
                iframe.style.height = '100%';
            }
        }

        iframe.addEventListener('load', function () {
            resizeIframe();
            try {
                const doc = iframe.contentDocument || iframe.contentWindow.document;
                const mo = new MutationObserver(() => resizeIframe());
                mo.observe(doc.documentElement || doc.body, { childList: true, subtree: true, characterData: true });
            } catch (e) { }
        });

        window.addEventListener('resize', () => setTimeout(resizeIframe, 160));