(function(){
  let gesturesEnabled = false; // 🚨 default OFF
  const toggleBtn = document.getElementById("gestureToggle");

  // Read saved state
  const savedState = localStorage.getItem("gestureEnabled");
  if(savedState !== null){
    gesturesEnabled = savedState === "true";
  }

  let gestureModule = null;

  function initGestures(){
    if(gestureModule) return;
    gestureModule = (function(){
      let touchStartX=null, touchStartY=null;
      let lastTap=0;
      let longPressTimeout=null;
      const bottomArea=0.2;
      const doubleTapDelay=300;

      const nextBtn=document.getElementById("nextbutto");
      const prevBtn=document.getElementById("pichhe");
      const playBtn=document.getElementById("play");
      const volLowBtn=document.getElementById("volume50");
      const volHighBtn=document.getElementById("volume100");
      if(!nextBtn||!prevBtn||!playBtn||!volLowBtn||!volHighBtn){
        console.warn("Check all required IDs");
        return;
      }

      const svgNS="http://www.w3.org/2000/svg";
      const overlay=document.createElementNS(svgNS,"svg");
      overlay.style.position="fixed";
      overlay.style.left=0; overlay.style.top=0;
      overlay.style.width="100%"; overlay.style.height="100%";
      overlay.style.pointerEvents="none";
      overlay.style.zIndex=999999;
      document.body.appendChild(overlay);

      let lastX=null,lastY=null;

      function createTrailLine(x1,y1,x2,y2,color="#00ffff"){
        const line=document.createElementNS(svgNS,"line");
        line.setAttribute("x1",x1); line.setAttribute("y1",y1);
        line.setAttribute("x2",x2); line.setAttribute("y2",y2);
        line.setAttribute("stroke",color);
        line.setAttribute("stroke-width",3);
        line.setAttribute("stroke-linecap","round");
        line.style.opacity=1;
        overlay.appendChild(line);
        const fade=setInterval(()=>{
          line.style.opacity-=0.03;
          if(line.style.opacity<=0){ line.remove(); clearInterval(fade);}
        },16);
      }

      function createDot(x,y,color="#ff00ff"){
        const dot=document.createElementNS(svgNS,"circle");
        dot.setAttribute("cx",x); dot.setAttribute("cy",y); dot.setAttribute("r",8);
        dot.setAttribute("fill",color);
        dot.style.opacity=1;
        overlay.appendChild(dot);
        const fade=setInterval(()=>{
          dot.style.opacity-=0.05;
          if(dot.style.opacity<=0){ dot.remove(); clearInterval(fade);}
        },16);
      }

      function touchStartHandler(e){
        const touch=e.changedTouches[0];
        const y=touch.clientY;
        const windowHeight=window.innerHeight;
        if(y<windowHeight*(1-bottomArea)) return;

        touchStartX=touch.clientX; touchStartY=touch.clientY;
        lastX=touchStartX; lastY=touchStartY;

        longPressTimeout=setTimeout(()=>{ volLowBtn.click(); },500);
      }

      function touchMoveHandler(e){
        const touch=e.changedTouches[0];
        const y=touch.clientY;
        const windowHeight=window.innerHeight;
        if(y<windowHeight*(1-bottomArea)) return;
        if(lastX!==null && lastY!==null){
          createTrailLine(lastX,lastY,touch.clientX,touch.clientY);
        }
        lastX=touch.clientX; lastY=touch.clientY;
      }

      function touchEndHandler(e){
        const touch=e.changedTouches[0];
        const y=touch.clientY;
        const windowHeight=window.innerHeight;
        if(y<windowHeight*(1-bottomArea)){
          lastX=lastY=null; clearTimeout(longPressTimeout); volHighBtn.click();
          return;
        }

        clearTimeout(longPressTimeout);
        volHighBtn.click();

        const diffX=touch.clientX-touchStartX;
        if(Math.abs(diffX)>50){
          if(diffX<0) nextBtn.click();
          else prevBtn.click();
        } else {
          const now=Date.now();
          if(now-lastTap<doubleTapDelay){
            playBtn.click();
            createDot(touch.clientX,touch.clientY);
            lastTap=0;
          } else lastTap=now;
        }
        lastX=lastY=touchStartX=null;
      }

      window.addEventListener("touchstart",touchStartHandler,{passive:true});
      window.addEventListener("touchmove",touchMoveHandler,{passive:true});
      window.addEventListener("touchend",touchEndHandler,{passive:true});

      return {
        destroy:function(){
          overlay.remove();
          window.removeEventListener("touchstart",touchStartHandler);
          window.removeEventListener("touchmove",touchMoveHandler);
          window.removeEventListener("touchend",touchEndHandler);
          gestureModule=null;
        }
      };
    })();
  }

  function updateToggleUI(){
    if(gesturesEnabled){
      toggleBtn.classList.add("active");
    } else {
      toggleBtn.classList.remove("active");
    }
  }

  // Load initial state
  if(gesturesEnabled) initGestures();
  updateToggleUI();

  toggleBtn.addEventListener("click",()=>{
    gesturesEnabled=!gesturesEnabled;
    localStorage.setItem("gestureEnabled",gesturesEnabled);
    if(gesturesEnabled) initGestures();
    else if(gestureModule) gestureModule.destroy();
    updateToggleUI();
  });

})();
