
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"_input { height: 50px; border-bottom: 1px solid #eee; margin-bottom: 5px; }\n",],undefined,{path:"./pages/name_info/name_info.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/name_info/name_info.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      