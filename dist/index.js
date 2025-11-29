!function(){var e=function(e){o.onKeyDown(String(e),function(){var i=s.getNumber("duration");return i&&t.seekTo(e/10*i),!0})},i=iina.console,t=iina.core,n=iina.event,o=iina.input,s=iina.mpv,a=iina.overlay,r=0,l=null,u=null,c=!1;function d(e,i,t){if(c){var n=`
    <div id="seek-left" class="seek-indicator left ${"seek-left"===e&&t?"visible":""}">
      ${"seek-left"===e?`${i}s`:""}
    </div>
    <div id="seek-right" class="seek-indicator right ${"seek-right"===e&&t?"visible":""}">
      ${"seek-right"===e?`${i}s`:""}
    </div>
  `;a.setContent(n)}}n.on("iina.window-loaded",function(){i.log("YouTube Controls: Initializing overlay"),a.simpleMode(),a.setStyle(`
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
  `),a.setContent(`
    <div id="seek-left" class="seek-indicator left"></div>
    <div id="seek-right" class="seek-indicator right"></div>
  `),a.show(),a.setClickable(!1),c=!0,i.log("YouTube Controls: Overlay initialized")});for(var f=0;f<=9;f++)e(f);o.onKeyDown("j",function(){return -1!==u?(r=-10,u=-1):r-=10,d("seek-left",String(r),!0),l&&clearTimeout(l),l=setTimeout(function(){d("seek-left","",!1),0!==r&&(t.seek(r),r=0,u=null)},300),!0}),o.onKeyDown("k",function(){return s.getFlag("pause")?t.resume():t.pause(),!0}),o.onKeyDown("l",function(){return 1!==u?(r=10,u=1):r+=10,d("seek-right","+"+String(r),!0),l&&clearTimeout(l),l=setTimeout(function(){d("seek-right","",!1),0!==r&&(t.seek(r),r=0,u=null)},300),!0}),o.onKeyDown("<",function(){return!!s.getFlag("pause")&&(s.command("frame-back-step",[]),!0)}),o.onKeyDown(">",function(){return!!s.getFlag("pause")&&(s.command("frame-step",[]),!0)})}();
//# sourceMappingURL=index.js.map
