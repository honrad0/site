// ============================================
// PROTEÇÃO ANTI-CÓPIA E ANTI-DEVTOOLS
// ============================================

(function() {
    'use strict';
    
    // Desabilita clique direito
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Desabilita seleção de texto
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Desabilita copiar
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });
    
    // Desabilita atalhos de teclado perigosos
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
        if (e.keyCode === 123 || // F12
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
            (e.ctrlKey && e.keyCode === 85) || // Ctrl+U (view source)
            (e.ctrlKey && e.keyCode === 83)) { // Ctrl+S (save)
            e.preventDefault();
            return false;
        }
    });
    
    // Detecta DevTools aberto (método mais agressivo)
    let devtoolsOpen = false;
    const element = new Image();
    
    Object.defineProperty(element, 'id', {
        get: function() {
            devtoolsOpen = true;
            document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#ff0000;font-size:2rem;font-family:monospace;text-align:center;padding:2rem;">⚠️ Developer Tools Detected<br><span style="font-size:1rem;color:#888;margin-top:1rem;">Please close DevTools to continue</span></div>';
        }
    });
    
    setInterval(function() {
        console.log(element);
        console.clear();
    }, 1000);
    
    // Detecta tamanho da janela (DevTools aberto)
    const threshold = 160;
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#ff0000;font-size:2rem;font-family:monospace;text-align:center;padding:2rem;">⚠️ Developer Tools Detected<br><span style="font-size:1rem;color:#888;margin-top:1rem;">Please close DevTools to continue</span></div>';
            }
        }
    }, 500);
    
    // Protege contra console
    if (window.console) {
        const noop = function() {};
        console.log = noop;
        console.warn = noop;
        console.error = noop;
        console.info = noop;
        console.debug = noop;
    }
    
    // Mensagem de aviso no console (antes de desabilitar)
    console.log('%c⚠️ ATENÇÃO', 'color: red; font-size: 40px; font-weight: bold;');
    console.log('%cEste site está protegido contra cópia de código.', 'color: red; font-size: 20px;');
    
})();
