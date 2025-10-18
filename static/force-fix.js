// static/force-fix.js
(function() {
    // 强制暗色模式
    document.documentElement.setAttribute('data-scheme', 'dark');
    localStorage.setItem('theme', 'dark');
    
    // 强制背景图片
    const style = document.createElement('style');
    style.textContent = `
        body::before {
            content: '' !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background-image: url('/img/bj.jpg') !important;
            background-size: cover !important;
            background-position: center !important;
            background-attachment: fixed !important;
            background-repeat: no-repeat !important;
            z-index: -9999 !important;
        }
        :root {
            --body-background: transparent !important;
        }
        body {
            background: transparent !important;
        }
    `;
    document.head.appendChild(style);
    console.log('强制修复已应用');
})();