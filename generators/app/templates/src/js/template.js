require(['ModalView', 'UrlHash', 'DataView'], function (ModalView, UrlHash, DataView) {
  var self,
    urlHash = new UrlHash();

  self = new ModalView('<%= module_name %>', $(document.body), function () {
    self.initComponents();
  });

  self.addModalEvent({
    initComponents: function () {
      self._$toast = $('.zjdd-toast');
      self.initMethods();
      self.initFilters();
      self.initVm();
      setTimeout(function () {
        //self.initIScroll();
      }, 0);
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
    showToast: function (inText,inCallback) {
      var self = this;
      this._$toast.text(inText);
      this._$toast.data('visible', true);
      setTimeout(function () {
        self._$toast.data('visible', false);
        inCallback && inCallback();
      }, 3000);
    },
    getSMGCode: function (inData) {
      return self.doAjax('getSMGCode', inData, {
        success: function (inResp) {
          var msg = inResp.msg;
          if (!inResp.code) {
            msg = 'Test!'
          }
          self.showToast(msg);
        }
      });
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
