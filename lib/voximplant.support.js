window['VoxImplantSupport'] = new (function () {
  let voximplant = null;
  let vault = [];
  let reportPath;
  let button;
  this.init = (reportServer,library) => {
    if(!reportServer)
      throw new Error('Please, set reportServer.');
    reportPath = reportServer;
    if(library)
      voximplant = library;
    else if(window['VoxImplant'])
      voximplant = window['VoxImplant'];
    else
      throw new Error('Voximplant SDK not found.');
    const client = voximplant.getInstance();
    client.setLoggerCallback(record => vault.push(record));
  };
  this.onLogSent = void 0;
  this.onSendingError = void 0;
  this.sendLogs = (additionalInfo, asForm) => {
    if(!voximplant)
      throw new Error('Voximplant Support library hasn\'t been setup yet. Please, call init first.');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.addEventListener('load', this.onLogSent || (() => {alert('An issue report has been sent. Thank you!')}));
    xmlhttp.addEventListener('error', this.onSendingError || (() => {alert('An issue report can\'t be sent. Network problem!')}));
    xmlhttp.open("POST", reportPath);
    if(asForm){
      xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlhttp.send(`sdk_log=${JSON.stringify(vault)}&info=${additionalInfo||'none'}`);
    }else {
      xmlhttp.setRequestHeader("Content-Type", "application/json");
      xmlhttp.send(JSON.stringify({sdk_log:vault,info:additionalInfo||'none'}));
    }
  };
  this.renderButton = (parent, text, cssClass) => {
    button = document.createElement('button');
    button.classList.add(cssClass||'voximplant-support__button');
    button.textContent = text || 'Report voice/video issue';
    button.tabIndex = -1;
    if(!cssClass) {
      const css = document.createElement('style');
      const style ='.voximplant-support__button{z-index:9000;position:fixed;bottom: 8px;right:8px;justify-content:center;text-decoration:none;border-radius:4px;outline:0;box-sizing:border-box;padding:15px 21px;background-color:#662eff;border:1px solid #662eff;color:#fff;font-family:\'Roboto Mono\',monospace;font-size:12px;font-weight:500;line-height:1;text-transform:uppercase;cursor:pointer;letter-spacing:0.3px;transition:background 0.3s ease,border 0.3s ease;}' +
        '.voximplant-support__button:hover{color:#150633;background-color:#d2c2ff;border:1px solid #d2c2ff;}';
      css.type = "text/css";
      css.innerHTML = style;
      document.getElementsByTagName('head')[0].appendChild(css);
    }
    const rParrent = parent || document.body;
    rParrent.appendChild(button);
    button.addEventListener('click',(ev)=>{
      this.sendLogs();
    })
  }
})();