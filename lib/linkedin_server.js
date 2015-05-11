Linkedin = {};

Oauth.registerService('linkedin', 2, null, function(query) {

    var response    = getTokenResponse(query);
    var accessToken = response.accessToken;
    var identity = getIdentity(accessToken);


    var serviceData = {
        accessToken: accessToken,
        firstName: identity.firstName,
        headline: identity.headline,
        id: identity.id,
        lastName: identity.lastName,
        siteStandardProfileRequest: {
            url: identity.siteStandardProfileRequest.url
        }

    };

    var whiteListed = ['firstName', 'lastName', 'id', 'headline', 'siteStandardProfileRequest'];

    var fields = _.pick(whiteListed);
    _.extend(serviceData, fields);

    return {
        serviceData: serviceData,
        options: {
            profile: serviceData
        }
    };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'linkedin'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }

    var responseContent;
    try {
        // Request an access token
        responseContent = HTTP.post(
            "https://www.linkedin.com/uas/oauth2/accessToken", {
                params: {
                    client_id:     config.appId,
                    client_secret: OAuth.openSecret(config.secret),
                    code:          query.code,
                    grant_type: 	'authorization_code',
                    redirect_uri: Meteor.absoluteUrl("_oauth/linkedin?close=close"),
                    state: query.state
                }
            }).content;

    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with linkedin. " + err.message),
            {response: err.response});
    }
    // Success!  Extract the linkedin access token and key
    // from the response
    var parsedResponse = JSON.parse(responseContent);
    var linkedinAccessToken = parsedResponse.access_token;
    var linkedin_id = parsedResponse.linkedin_user_id;
    var linkedin_publishable_key = parsedResponse.linkedin_publishable_key;

    if (!linkedinAccessToken) {
        throw new Error("Failed to complete OAuth handshake with linkedin " +
           "-- can't find access token in HTTP response. " + responseContent);
    }
    return {
        accessToken: linkedinAccessToken,
        linkedin_user_id: linkedin_id,
        linkedin_publishable_key: linkedin_publishable_key
    };
};

var getIdentity = function (accessToken) {
  try {
    return Meteor.http.get("https://www.linkedin.com/v1/people/~", {
      params: {oauth2_access_token: accessToken, format: 'json'}}).data;
  } catch (err) {
    throw new Error("Failed to fetch identity from LinkedIn. " + err.message);
  }
};


Linkedin.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};
