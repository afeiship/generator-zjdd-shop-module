/**
 * <%= module_cn_name %>
 * 商家版通用token test`test`1
 * URL： http://shop.zaijiadd.com/<%= module_name %>.php?zjtoken=test`test`1
 * WiKi：<%= wiki_url %>
 */
var Base = require('../common/base'),
  HandlerBase = require('../common/handlerBase'),
  _ = require('underscore');

module.exports = Base.extend(function () {
}, {
  extend: HandlerBase,
  handlerName: '<%= module_name %>',
  doJob: function *() {
    var method = this.koa.req.method;
    return yield this['do' + method]();
  },
  doGET: function * () {
    return yield this.jade.getHTML(
      {
        dataString: JSON.stringify({})
      },
      '<%= module_name %>'
    );
  },
  doPOST: function * () {
    var query = this.getQuery();
    return yield function () {
      return 1;
    }
  }
});
