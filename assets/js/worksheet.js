// Printable worksheet: prints only the worksheet or only the answer key.
(function () {
  function printPart(sel) {
    var src = document.querySelector(sel);
    if (!src) return;
    var old = document.getElementById('ws-print-root');
    if (old) old.parentNode.removeChild(old);
    var root = document.createElement('div');
    root.id = 'ws-print-root';
    var copy = src.cloneNode(true);
    copy.querySelectorAll('details').forEach(function (d) { d.open = true; });
    if (copy.tagName === 'DETAILS') copy.open = true;
    root.appendChild(copy);
    document.body.appendChild(root);
    document.body.classList.add('ws-printing');
    var done = function () {
      document.body.classList.remove('ws-printing');
      if (root.parentNode) root.parentNode.removeChild(root);
      window.removeEventListener('afterprint', done);
    };
    window.addEventListener('afterprint', done);
    window.print();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ws-print]');
    if (b) { e.preventDefault(); printPart(b.getAttribute('data-ws-print')); }
  });
})();
