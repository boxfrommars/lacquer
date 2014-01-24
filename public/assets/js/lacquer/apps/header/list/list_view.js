Lacquer.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _){

    List.Header = App.Views.ItemView.extend({
        template: 'header/list/templates/header',
        tagName: 'li'
    });

    List.Headers = App.Views.CompositeView.extend({
        template: 'header/list/templates/headers',
        itemView: List.Header,
        itemViewContainer: 'ul'
    });
});