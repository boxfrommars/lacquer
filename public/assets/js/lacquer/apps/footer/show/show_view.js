Lacquer.module('FooterApp.Show', function(Show, App, Backbone, Marionette, $, _){

    Show.Footer = App.Views.ItemView.extend({
        template: 'footer/show/templates/show_footer',
        modelEvents: {
            'change': 'render'
        }
    });
});