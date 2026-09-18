/* Site-wide Day / Night theme. Starts light; choice is remembered. */
(function(){
  var root = document.documentElement, KEY = 'mc-theme';
  function saved(){ try { return localStorage.getItem(KEY); } catch(e){ return null; } }
  function apply(night){
    root.classList.toggle('night', night);
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].setAttribute('aria-pressed', night ? 'true' : 'false');
      btns[i].setAttribute('aria-label', night ? 'Switch to day mode' : 'Switch to night mode');
    }
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', night ? '#0f1020' : '#fbfbfd');
  }
  apply(saved() === 'night');
  document.addEventListener('DOMContentLoaded', function(){
    apply(root.classList.contains('night'));
    var btns = document.querySelectorAll('.theme-toggle');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function(){
        var night = !root.classList.contains('night');
        root.classList.add('theme-anim');
        apply(night);
        try { localStorage.setItem(KEY, night ? 'night' : 'day'); } catch(e){}
        window.dispatchEvent(new CustomEvent('mc-theme', {detail:{night:night}}));
        setTimeout(function(){ root.classList.remove('theme-anim'); }, 700);
      });
    }
  });
})();
