Lacquer.module('LeadsApp.List', function(List, App, Backbone, Marionette, $, _){
    List.Leads = App.Views.ItemView.extend({
        'template': 'leads/list/templates/list_leads'
    });
});