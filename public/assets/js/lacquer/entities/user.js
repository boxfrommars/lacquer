Lacquer.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.User = Entities.Model.extend({});

    Entities.UserCollection = Entities.Collection.extend({
        url: '/api/v1/users',
        model: Entities.User
    });

    var API = {
        setCurrentUser: function(user){
            return new Entities.User(user);
        },
        getUsers: function(){
            var users = new Entities.UserCollection();
            users.fetch();
            return users;
        }
    };

    App.reqres.setHandler('set:current:user', function(user){
        return API.setCurrentUser(user);
    });

    App.reqres.setHandler('user:entities', function(){
        return API.getUsers();
    });

});