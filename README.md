meteor-accounts-linkedin
==============

### Getting Started

Add `khamoud:accounts-linkedin` to your application's `.meteor/packages` file

Alternatively:
```
meteor add khamoud:accounts-linkedin
```

### Use
If you add `accounts-ui` there will be a GUI to set yourself up.  Otherwise you will have to instantiate it yourself with the following. **ON THE SERVER**

```
Accounts.loginServiceConfiguration.remove({
	service:"linkedin"
});
Accounts.loginServiceConfiguration.insert({
	service:"linkedin",
	clientId: "someClientString",
	secret: "someSecretString",
    scope: "your_scope"
});
```

To find all available scope please refer to: [https://developer.linkedin.com/docs/oauth2#authorize](here)
