  $( document ).bind( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    
    $.mobile.pushStateEnabled=false;
    $.mobile.page.prototype.options.domCache = true;
  });
 
  
  
  
  $.mobile.loadPage( 'sukatsearch/index.html', { showLoadMsg: true } );

  
  function openChildBrowser(url) {
    window.plugins.childBrowser.showWebPage(url, { showLocationBar: true });
    /*
     try {
     var childBrowser;
     childBrowser = new ChildBrowser();
     childBrowser.showWebPage(url);

     }
     catch (err)
     {
     alert(err);
     }
     */
  }

  window.plugins.childBrowser.onClose = function () {
    window.plugins.childBrowser.close();
  };
  