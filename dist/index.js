!function(){var e=function(e){i.onKeyDown(String(e),function(){var i=n.getNumber("duration");return i&&t.seekTo(e/10*i),!0})};iina.console;var t=iina.core,i=iina.input,n=iina.mpv,o=iina.overlay;o.simpleMode(),o.setStyle(`
  .seek-indicator {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    padding: 20px 30px;
    border-radius: 20px;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    font-family: --apple-system, BlinkMacSystemFont, "Inter V";
    font-size: 48px;
    font-weight: bold;
    color: white;
    font-variant-numeric: tabular-nums;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }
  .seek-indicator.left {
    left: 40px;
  }
  .seek-indicator.right {
    right: 40px;
  }
  .seek-indicator.visible {
    opacity: 1;
  }
`),o.setContent(`
  <div id="seek-left" class="seek-indicator left"></div>
  <div id="seek-right" class="seek-indicator right"></div>
`),o.show(),o.setClickable(!1);var s=0,r=null,a=null;function l(e,t,i){var n=`
    <div id="seek-left" class="seek-indicator left ${"seek-left"===e&&i?"visible":""}">
      ${"seek-left"===e?`${t}s`:""}
    </div>
    <div id="seek-right" class="seek-indicator right ${"seek-right"===e&&i?"visible":""}">
      ${"seek-right"===e?`${t}s`:""}
    </div>
  `;o.setContent(n)}o.loadFile=null;for(var u=0;u<=9;u++)e(u);i.onKeyDown("j",function(){return -1!==a?(s=-10,a=-1):s-=10,l("seek-left",String(s),!0),r&&clearTimeout(r),r=setTimeout(function(){l("seek-left","",!1),0!==s&&(t.seek(s),s=0,a=null)},300),!0}),i.onKeyDown("k",function(){return n.getFlag("pause")?t.resume():t.pause(),!0}),i.onKeyDown("l",function(){return 1!==a?(s=10,a=1):s+=10,l("seek-right","+"+String(s),!0),r&&clearTimeout(r),r=setTimeout(function(){l("seek-right","",!1),0!==s&&(t.seek(s),s=0,a=null)},300),!0}),i.onKeyDown("<",function(){return!!n.getFlag("pause")&&(n.command("frame-back-step",[]),!0)}),i.onKeyDown(">",function(){return!!n.getFlag("pause")&&(n.command("frame-step",[]),!0)})}();
//# sourceMappingURL=index.js.map
