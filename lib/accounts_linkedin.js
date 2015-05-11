Accounts.oauth.registerService('linkedin');

if (Meteor.isClient) {
    Meteor.loginWithLinkedin = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Linkedin.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.linkedin'],
        forOtherUsers: [
            'services.stripe.id',
            'services.stripe.firstName',
            'services.stripe.lastName'
        ]
    });
}
