/**
 * @version 1.1.0
 * @license MIT
 */

; (function () {
    'use strict';

    const savedTheme = localStorage.getItem('cm-theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        _syncThemeIcon(savedTheme === 'dark');
    }

    /**
     * Toggle aria-expanded on a button element.
     * @param {Element|null} btn
     * @param {boolean} state  true = expanded / open
     */
    function _setExpanded(btn, state) {
        if (btn) btn.setAttribute('aria-expanded', state ? 'true' : 'false');
    }

    /**
     * Sync the moon/sun icon inside a theme-toggle button.
     * @param {boolean} isDark  true when the current theme is dark
     * @param {Element} [btn]   the toggle button (searches DOM if omitted)
     */
    function _syncThemeIcon(isDark, btn) {
        const toggle = btn || document.querySelector('[data-cm="theme-toggle"]');
        if (!toggle) return;
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
        }
        const label = isDark ? 'Activer le thème clair' : 'Activer le thème sombre';
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
    }

    /**
     * Trap Tab / Shift+Tab focus within a container element.
     * Attaches a single keydown listener on the container.
     * @param {Element} container
     */
    function _trapFocus(container) {
        const FOCUSABLE = [
            'a[href]',
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(', ');

        container.addEventListener('keydown', function (e) {
            if (e.key !== 'Tab') return;

            const nodes = Array.from(container.querySelectorAll(FOCUSABLE))
                .filter(function (el) { return el.offsetParent !== null; }); // visible only

            if (!nodes.length) return;

            const first = nodes[0];
            const last = nodes[nodes.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        });
    }

    document.addEventListener('click', function (e) {
        const target = e.target.closest('[data-cm]');
        if (!target) return;

        const action = target.getAttribute('data-cm');

        if (action === 'sidebar-collapse') {
            const sidebar = document.getElementById('sidebar');
            if (!sidebar) return;
            const isCollapsed = sidebar.classList.toggle('sidebar--collapsed');
            _setExpanded(target, !isCollapsed);
        }

        if (action === 'sidebar-open' || action === 'sidebar-close') {
            const sb = document.getElementById('sidebar');
            if (!sb) return;
            const isOpen = sb.classList.toggle('sidebar--open');
            const backdrop = document.getElementById('sidebarBackdrop');
            if (backdrop) {
                backdrop.classList.toggle('sidebar__backdrop--visible', isOpen);
            }
            const openTrigger = document.querySelector('[data-cm="sidebar-open"]');
            _setExpanded(openTrigger, isOpen);
            if (isOpen) {
                const firstLink = sb.querySelector('a, button');
                if (firstLink) firstLink.focus();
            }
        }

        if (action === 'theme-toggle') {
            const html = document.documentElement;
            const isDark = html.getAttribute('data-theme') === 'dark';
            const next = isDark ? 'light' : 'dark';
            const _apply = function () {
                html.setAttribute('data-theme', next);
                localStorage.setItem('cm-theme', next);
                _syncThemeIcon(!isDark, target);
            };
            if (document.startViewTransition) {
                document.startViewTransition(_apply);
            } else {
                _apply();
            }
        }

        if (action === 'docs-toggle') {
            const ds = document.getElementById('sidebar');
            const ov = document.getElementById('overlay');
            const ham = document.getElementById('hamburger');

            if (ds) ds.classList.toggle('open');
            if (ov) ov.classList.toggle('active');

            const isOpen = ds ? ds.classList.contains('open') : false;
            _setExpanded(ham, isOpen);

            if (isOpen && ds) {
                const firstFocusable = ds.querySelector('a, button');
                if (firstFocusable) firstFocusable.focus();
            } else if (!isOpen && ham) {
                ham.focus();
            }
        }

        if (action === 'tab') {
            e.preventDefault();
            const container = target.closest('.topbar__subnav');
            if (!container) return;
            container.querySelectorAll('.topbar__subnav-link').forEach(function (link) {
                link.classList.remove('topbar__subnav-link--active');
                link.removeAttribute('aria-current');
            });
            target.classList.add('topbar__subnav-link--active');
            target.setAttribute('aria-current', 'page');
        }

        if (action === 'copy') {
            const codeBlock = target.closest('.docs-code');
            if (!codeBlock) return;
            const code = codeBlock.querySelector('code');
            if (!code) return;
            const text = code.textContent;

            const _onSuccess = function () {
                target.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copié !';
                target.classList.add('docs-code__copy--copied');
                setTimeout(function () {
                    target.innerHTML = '<i class="fa-regular fa-clipboard" aria-hidden="true"></i> Copier';
                    target.classList.remove('docs-code__copy--copied');
                }, 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(_onSuccess).catch(function () {
                    _copyFallback(code, _onSuccess);
                });
            } else {
                _copyFallback(code, _onSuccess);
            }
        }
    });

    /**
     * Legacy clipboard copy using Selection + execCommand.
     * @param {Element} node     DOM node whose text to copy
     * @param {Function} onDone  called after copy attempt
     */
    function _copyFallback(node, onDone) {
        try {
            const range = document.createRange();
            range.selectNode(node);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            document.execCommand('copy');
            sel.removeAllRanges();
            onDone();
        } catch (_) {
        }
    }

    document.addEventListener('keydown', function (e) {
        if (e.key !== 'Escape') return;

        const docsSidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const hamburger = document.getElementById('hamburger');

        if (docsSidebar && docsSidebar.classList.contains('open')) {
            docsSidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            _setExpanded(hamburger, false);
            if (hamburger) hamburger.focus();
        }

        if (docsSidebar && docsSidebar.classList.contains('sidebar--open')) {
            docsSidebar.classList.remove('sidebar--open');
            const backdrop = document.getElementById('sidebarBackdrop');
            if (backdrop) backdrop.classList.remove('sidebar__backdrop--visible');
            const openTrigger = document.querySelector('[data-cm="sidebar-open"]');
            _setExpanded(openTrigger, false);
            if (openTrigger) openTrigger.focus();
        }
    });


    document.querySelectorAll('[role="dialog"]').forEach(function (modal) {
        _trapFocus(modal);
    });

    // ── Scrollable region keyboard access (WCAG 2.1 SC 2.1.1) ───────────────
    // Inject tabindex="0" on <pre> and .table-responsive so keyboard users
    // can scroll them without a pointing device.
    document.querySelectorAll('pre, .table-responsive').forEach(function (el) {
        if (!el.hasAttribute('tabindex')) {
            el.setAttribute('tabindex', '0');
        }
    });

})();
