Template.configureLoginServiceDialogForLinkedin.siteUrl = function () {
	return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForLinkedin.fields = function () {
  return [
      {property: 'appId', label: 'Client id '},
      {property: 'secret', label: 'Secret Key'},
      {property: 'scope', label: 'Scope. (e.g. r_basicprofile)'}
  ];
};
