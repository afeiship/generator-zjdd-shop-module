require(['ModalView', 'UrlHash', 'DataView'], function (ModalView, UrlHash, DataView) {
  var self,
    urlHash = new UrlHash();

  self = new ModalView('<%= module_name %>', $(document.body), function () {
    self.initComponents();
  });

  self.addModalEvent({
    initComponents: function () {
      self.initMethods();
      self.initFilters();
      self.initVm();
    },
    initIScroll: function () {
      self._iscroll = new IScroll('.wrapper', {
        scrollbars: true,
        mouseWheel: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        interactiveScrollbars: true
      });
    },
    initVm: function () {
      self._vm = new Vue({
        el: 'body',
        data: globalData,
        filters: self._vueFilters,
        methods: self._vueMethods
      });
    },
    initMethods: function () {
      self._vueMethods = {
        _item_click: self._item_click.bind(self)
      };
    },
    initFilters: function () {
      self._vueFilters = {
        state2Tex: function (value) {
          return 'demo-text';
        }
      };
    },
    doAjax: function (inName, inData, inOptions) {
      $.ajax(
        $.extend({
          url: './<%= module_name %>.php',
          type: 'POST',
          dataType: 'json',
          data: {
            command: inName,
            data: $.extend(urlHash.getUrlHash(), inData)
          }
        }, inOptions)
      );
    },
    _item_click: function () {
      console.log('item click!');
    }
  }).addViewEvent({
    '.nav-title .back::click': '_nav_back_click'
  }).init();

  return self;
});
