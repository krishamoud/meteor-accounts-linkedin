Package.describe({
    summary: "Login service for linkedin accounts"
});

Package.on_use(function(api) {
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);

	api.use('oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'server');
    api.use('templating', 'client');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);

  	api.add_files(
    ['lib/linkedin_configure.html', 'lib/linkedin_configure.js',
    'lib/linkedin_login_button.css'],
    'client');

    api.add_files("lib/accounts_linkedin.js");
    api.add_files('lib/linkedin_client.js', 'client');
    api.add_files('lib/linkedin_server.js', 'server');
});


Package.on_test(function (api) {
  api.use(['accounts-linkedin', 'tinytest', 'test-helpers'], ['client', 'server']);
  api.add_files('accounts-linkedin-tests.js', ['client', 'server']);
});
