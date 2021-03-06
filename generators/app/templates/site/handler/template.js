/**
 * <%= module_name %>
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
  cmdDispatch: function * () {
    var query = this.getQuery();
    var command = query.command;
    return yield this[command](query.data);
  },
  doPOST: function * () {
    return yield this.cmdDispatch();
  }
});
