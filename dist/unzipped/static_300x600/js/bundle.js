(function() {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function(r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function(require, module, exports) {
        "use strict";

        module.exports = function() {
          if (document.getElementsByClassName("piLink").length) {
            var links = document.getElementsByClassName("piLink");
            for (var i = 0; i < links.length; i += 1) {
              links[i].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("Prescribing Information");
              });
            }
          }
          if (document.getElementsByClassName("seeMore").length) {
            var _links = document.getElementsByClassName("seeMore");
            for (var _i = 0; _i < _links.length; _i += 1) {
              _links[_i].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("See more");
              });
            }
          }
          if (document.getElementsByClassName("seeTheResults").length) {
            var _links2 = document.getElementsByClassName("seeTheResults");
            for (var _i2 = 0; _i2 < _links2.length; _i2 += 1) {
              _links2[_i2].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("See the results");
              });
            }
          }
          if (document.getElementsByClassName("linkToLanding").length) {
            var _links3 = document.getElementsByClassName("linkToLanding");
            for (var _i3 = 0; _i3 < _links3.length; _i3 += 1) {
              _links3[_i3].addEventListener("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                Enabler.exit("Link to landing page");
              });
            }
          }
        };
      },
      {}
    ],
    2: [
      function(require, module, exports) {
        "use strict";

        var _createClass = (function() {
          function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
              var descriptor = props[i];
              descriptor.enumerable = descriptor.enumerable || false;
              descriptor.configurable = true;
              if ("value" in descriptor) descriptor.writable = true;
              Object.defineProperty(target, descriptor.key, descriptor);
            }
          }
          return function(Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
          };
        })();

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var exitLinks = require("../components/exit-links.js");

        module.exports = (function() {
          function SetupStandardBanner() {
            _classCallCheck(this, SetupStandardBanner);

            this.enablerInitHandler = this.enablerInitHandler.bind(this);
          }

          _createClass(SetupStandardBanner, [
            {
              key: "enablerInitHandler",
              value: function enablerInitHandler() {
                exitLinks();
              }
            },
            {
              key: "init",
              value: function init() {
                if (
                  document
                    .getElementById("main-panel")
                    .classList.contains("studio")
                ) {
                  if (Enabler.isInitialized()) {
                    this.enablerInitHandler();
                  } else {
                    Enabler.addEventListener(
                      studio.events.StudioEvent.INIT,
                      this.enablerInitHandler
                    );
                  }
                }
              }
            }
          ]);

          return SetupStandardBanner;
        })();
      },
      { "../components/exit-links.js": 1 }
    ],
    3: [
      function(require, module, exports) {
        "use strict";

        var SetupStaticBanner = require("../components/setup-static");

        window.addEventListener("load", function() {
          var staticBanner = new SetupStaticBanner();
          staticBanner.init();
        });
      },
      { "../components/setup-static": 2 }
    ]
  },
  {},
  [3]
);
