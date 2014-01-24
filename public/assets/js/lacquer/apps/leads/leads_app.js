Lacquer.module('LeadsApp', function(LeadsApp, App, Backbone, Marionette, $, _){
    LeadsApp.Router = Marionette.AppRouter.extend({
        appRoutes: {
            "leads": "listLeads"
        }
    });

    var API = {
        listLeads: function(){
            LeadsApp.List.Controller.listLeads();
        }
    };

    App.addInitializer(function(){
        new LeadsApp.Router({
            controller: API
        });
    });
});