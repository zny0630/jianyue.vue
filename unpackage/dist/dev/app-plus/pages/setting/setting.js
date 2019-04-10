
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"list-item{ -webkit-align-content: center; -ms-flex-line-pack: center; align-content: center; padding-top: 20px; }\n",],undefined,{path:"./pages/setting/setting.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/setting/setting.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      