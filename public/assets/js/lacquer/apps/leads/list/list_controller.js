Lacquer.module('LeadsApp.List', function(List, App, Backbone, Marionette, $, _){

    List.Controller = {
        listLeads: function(){
            var leadsView = this.getLeadsView();
            App.mainRegion.show(leadsView);
        },

        getLeadsView: function(){
            return new List.Leads();
        }
    };

});