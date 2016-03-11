require(['ModalView', 'UrlHash', 'DataView'], function (ModalView, UrlHash, DataView) {
  var self,
    urlHash = new UrlHash().getHash();

  self = new ModalView('<%= module_name %>', $(document.body), function () {
    self.initComponents();
  });

  self.addModalEvent({
    initComponents:function(){
      self.initIScroll();
    },
    initIScroll: function () {
      self._iscroll = new IScroll(".wrapper", {
        scrollbars: true,
        mouseWheel: true,
        shrinkScrollbars: "scale",
        fadeScrollbars: true,
        interactiveScrollbars: true
      });
    },
    doAjax: function (inName, inData, inOptions) {
      $.ajax(
        $.extend({
          url: "./<%= module_name %>.php",
          type: "POST",
          dataType: "json",
          data: {
            command: inName,
            data: inData
          }
        }, inOptions)
      );
    },
    _nav_back_click: function () {
      history.go(-1);
    }
  }).addViewEvent({
    '.nav-title .back::click': '_nav_back_click'
  }).init();

  return self;
});
