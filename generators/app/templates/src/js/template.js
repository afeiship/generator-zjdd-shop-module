require(['ModalView', 'UrlHash', 'DataView'], function (ModalView, UrlHash, DataView) {
  var self,
    urlHash = new UrlHash().getHash();

  self = new ModalView('<%= module_name %>', $(document.body), function () {
    self.initComponents();
    self.initPage();
  }, {
    viewList: null
  });

  self.addModalEvent({
    initComponents: function () {
      this._container = self.$container;
    },
    initPage: function () {
      var dataView = new DataView("<%= moduleName %>Tmpl", globalData);
      this._container.html(dataView.getDataModal());
    },
    compile: function (inSelector, inData) {
      var $tmpl = $(inSelector);
      var template = Handlebars.compile($tmpl.html());
      return template(inData);
    }
  }).addViewEvent({}).init();

  return self;
});
