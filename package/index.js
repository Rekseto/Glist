const glist = (function() {
  function getBrowser() {
    if (!!window.chrome && navigator.appVersion.indexOf("OPR") === -1) {
      return "Google Chrome";
    } else if (typeof InstallTrigger !== "undefined") {
      return "Firefox";
    } else if (
      (!!window.opr && !!opr.addons) ||
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0
    ) {
      return "Opera";
    } else if (
      /constructor/i.test(window.HTMLElement) ||
      (function(p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(!window["safari"] || safari.pushNotification)
    ) {
      return "Safari";
    } else if (!!window.StyleMedia) {
      return "Edge";
    } else {
      return "Unknown";
    }
  }

  function getSystem() {
    if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";
    return "Unknown";
  }

  function baseInformations() {
    return {
      browser: getBrowser(),
      system: getSystem(),
      language: navigator.language,
      userAgent: navigator.userAgent,
      languages: navigator.languages
    };
  }

  return {
    start: function({ server }) {
      window.addEventListener("DOMContentLoaded", function() {
        fetch(server, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(baseInformations())
        });
      });
    }
  };
})();
