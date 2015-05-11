// Write your tests here!
// Here is an example.
Tinytest.add('Accounts Linkedin - Simple Test', function (test) {

});


Tinytest.add('Accounts Linkedin - Server Account Creation Test', function(test){
    if(Meteor.isServer) {
        var linkedinId = Random.id();

        // create an account with linkedin
        var uid1 = Accounts.updateOrCreateUserFromExternalService(
        'linkedin', {id: linkedinId, monkey: 42}, {profile: {foo: 1}}).id;
        var users = Meteor.users.find({"services.linkedin.id": linkedinId}).fetch();
        test.length(users, 1);
        test.equal(users[0].profile.foo, 1);
        test.equal(users[0].services.linkedin.monkey, 42);

        // create again with the same id, see that we get the same user.
        // it should update services.linkedin but not profile.
        var uid2 = Accounts.updateOrCreateUserFromExternalService(
        'linkedin', {id: linkedinId, llama: 50},
        {profile: {foo: 1000, bar: 2}}).id;
        test.equal(uid1, uid2);
        users = Meteor.users.find({"services.linkedin.id": linkedinId}).fetch();
        test.length(users, 1);
        test.equal(users[0].profile.foo, 1);
        test.equal(users[0].profile.bar, undefined);
        test.equal(users[0].services.linkedin.llama, 50);
        // make sure we *don't* lose values not passed this call to
        // updateOrCreateUserFromExternalService
        test.equal(users[0].services.linkedin.monkey, 42);

        // cleanup
        Meteor.users.remove(uid1);
    }
})

Tinytest.add('Accounts Linkedin - config validates keys', function (test) {
  test.throws(function () {
    Accounts.config({foo: "bar"});
  });
});
