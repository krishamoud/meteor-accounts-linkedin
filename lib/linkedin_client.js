Linkedin = {};

Linkedin.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === "function") {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({ service: "linkedin" });
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var credentialToken = Random.secret();
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var display = mobile ? "touch" : "popup";
    var scope = "";

    if (options && options.requestPermissions) {
        scope = options.requestPermissions.join(",");
    }

    var loginUrl =
        'https://www.linkedin.com/uas/oauth2/authorization' +
            '?response_type=code' +
            '&client_id=' + config.appId +
            '&scope=' + config.scope +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/linkedin?close=close') +
            '&state=' + OAuth._stateParam(display, credentialToken);

    var dimensions = { width: 650, height: 560 };
    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback, dimensions);

};
