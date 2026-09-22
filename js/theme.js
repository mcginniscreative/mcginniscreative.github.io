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
  window.mcTheme = {set:function(night, persist){
    document.documentElement.classList.add('theme-anim'); apply(night);
    if(persist){ try { localStorage.setItem(KEY, night ? 'night' : 'day'); } catch(e){} }
    setTimeout(function(){ root.classList.remove('theme-anim'); }, 700);
  }};
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

  /* On phones/tablets, hide the nav (and any bar marked .mc-autohide, like the
     Interactives breadcrumb) while scrolling down, and bring it right back on
     the first upward scroll, so a sticky bar doesn't eat the screen. */
  (function(){
    var lastY = window.pageYOffset, ticking = false;
    function onScroll(){
      ticking = false;
      if (window.innerWidth > 820) { root.classList.remove('mc-scrolled-down'); lastY = window.pageYOffset; return; }
      var y = window.pageYOffset, delta = y - lastY;
      if (y < 60) root.classList.remove('mc-scrolled-down');
      else if (delta > 6) root.classList.add('mc-scrolled-down');
      else if (delta < -6) root.classList.remove('mc-scrolled-down');
      lastY = y;
    }
    window.addEventListener('scroll', function(){
      if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
    }, {passive:true});
    window.addEventListener('resize', onScroll);
  })();
})();
