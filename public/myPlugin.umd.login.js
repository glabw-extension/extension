((typeof self !== 'undefined' ? self : this)["webpackJsonpmyPlugin"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpmyPlugin"] || []).push([[0],{

/***/ "bd74":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"69ead2fe-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/login/sslLogin.vue?vue&type=template&id=7c8d313d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h1',[_vm._v("ssl-login")]),_c('el-button',{on:{"click":_vm.checkout}},[_vm._v("切换")]),_c('el-button',{attrs:{"loading":_vm.loading},on:{"click":_vm.handleLoginFake}},[_vm._v("登录")])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/login/sslLogin.vue?vue&type=template&id=7c8d313d&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./src/data/account.js
var account = __webpack_require__("72a7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/login/sslLogin.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var sslLoginvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loading: false
    };
  },
  methods: {
    checkout: function checkout() {
      this.$router.replace({
        name: "login"
      });
    },
    handleLoginFake: function handleLoginFake() {
      try {
        this.loading = true;
        this.$message.success("登录成功");
        this.$router.replace({
          name: "home"
        });
      } catch (error) {
        console.log("login failed >>>", error);
      } finally {
        this.loading = false;
      }
    },
    handleLogin: function handleLogin() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$api$getSSLConf, DC, _yield$api$getSSLToke, _yield$api$getSSLToke2, token, _yield$api$sslLogin, _yield$api$sslLogin$a, auth;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.loading = true;
                _context.next = 4;
                return account["a" /* default */].getSSLConfig();

              case 4:
                _yield$api$getSSLConf = _context.sent;
                DC = _yield$api$getSSLConf.DC;
                console.log("getSSLConfig >>>", DC);
                _context.next = 9;
                return account["a" /* default */].getSSLToken(DC);

              case 9:
                _yield$api$getSSLToke = _context.sent;
                _yield$api$getSSLToke2 = _yield$api$getSSLToke.token;
                token = _yield$api$getSSLToke2 === void 0 ? "" : _yield$api$getSSLToke2;
                console.log("getSSLToken >>>", token);

                if (!token) {
                  _context.next = 21;
                  break;
                }

                _context.next = 16;
                return account["a" /* default */].sslLogin();

              case 16:
                _yield$api$sslLogin = _context.sent;
                _yield$api$sslLogin$a = _yield$api$sslLogin.auth;
                auth = _yield$api$sslLogin$a === void 0 ? "" : _yield$api$sslLogin$a;
                console.log("sslLogin >>>", auth);

                if (auth) {
                  _this.$message.success("登录成功");

                  _this.$router.replace({
                    name: "home"
                  });
                }

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                console.log("login failed >>>", _context.t0);

              case 26:
                _context.prev = 26;
                _this.loading = false;
                return _context.finish(26);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23, 26, 29]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/views/login/sslLogin.vue?vue&type=script&lang=js&
 /* harmony default export */ var login_sslLoginvue_type_script_lang_js_ = (sslLoginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/login/sslLogin.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  login_sslLoginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "7c8d313d",
  null
  
)

/* harmony default export */ var sslLogin = __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "dc3f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"69ead2fe-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/login/login.vue?vue&type=template&id=19913a86&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',[_vm._v("login")]),_c('el-button',{on:{"click":_vm.checkout}},[_vm._v("切换")]),_c('el-button',{attrs:{"loading":_vm.loading},on:{"click":_vm.handleLogin}},[_vm._v("登录")])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/login/login.vue?vue&type=template&id=19913a86&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/regenerator-runtime/runtime.js
var runtime = __webpack_require__("96cf");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js
var asyncToGenerator = __webpack_require__("1da1");

// EXTERNAL MODULE: ./src/data/account.js
var account = __webpack_require__("72a7");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/login/login.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var loginvue_type_script_lang_js_ = ({
  data: function data() {
    return {
      loading: false
    };
  },
  methods: {
    checkout: function checkout() {
      this.$router.replace({
        name: "ssl-login"
      });
    },
    handleLogin: function handleLogin() {
      var _this = this;

      return Object(asyncToGenerator["a" /* default */])( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _yield$api$getSSLConf, DC, _yield$api$getSSLToke, _yield$api$getSSLToke2, token, _yield$api$sslLogin, _yield$api$sslLogin$a, auth;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _this.loading = true;
                _context.next = 4;
                return account["a" /* default */].getSSLConfig();

              case 4:
                _yield$api$getSSLConf = _context.sent;
                DC = _yield$api$getSSLConf.DC;
                console.log("getSSLConfig >>>", DC);
                _context.next = 9;
                return account["a" /* default */].getSSLToken(DC);

              case 9:
                _yield$api$getSSLToke = _context.sent;
                _yield$api$getSSLToke2 = _yield$api$getSSLToke.token;
                token = _yield$api$getSSLToke2 === void 0 ? "" : _yield$api$getSSLToke2;
                console.log("getSSLToken >>>", token);

                if (!token) {
                  _context.next = 21;
                  break;
                }

                _context.next = 16;
                return account["a" /* default */].sslLogin();

              case 16:
                _yield$api$sslLogin = _context.sent;
                _yield$api$sslLogin$a = _yield$api$sslLogin.auth;
                auth = _yield$api$sslLogin$a === void 0 ? "" : _yield$api$sslLogin$a;
                console.log("sslLogin >>>", auth);

                if (auth) {
                  _this.$message.success("登录成功");

                  _this.$router.replace({
                    name: "plugin"
                  });
                }

              case 21:
                _context.next = 26;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](0);
                console.log("login failed >>>", _context.t0);

              case 26:
                _context.prev = 26;
                _this.loading = false;
                return _context.finish(26);

              case 29:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 23, 26, 29]]);
      }))();
    }
  }
});
// CONCATENATED MODULE: ./src/views/login/login.vue?vue&type=script&lang=js&
 /* harmony default export */ var login_loginvue_type_script_lang_js_ = (loginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/login/login.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  login_loginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "19913a86",
  null
  
)

/* harmony default export */ var login = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=myPlugin.umd.login.js.map