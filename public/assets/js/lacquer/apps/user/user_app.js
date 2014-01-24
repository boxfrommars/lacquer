Lacquer.module('UsersApp', function(UsersApp, App, Backbone, Marionette, $, _){

    UsersApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "users": 'listUsers'
        }
    });

    var API = {
        listUsers: function(){
            UsersApp.List.Controller.listUsers();
        }
    };

    App.addInitializer(function(){
        new UsersApp.Router({
            controller: API
        });
    });

});