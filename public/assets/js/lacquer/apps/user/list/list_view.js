Lacquer.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _){

    List.Layout = App.Views.Layout.extend({
        template: 'user/list/templates/list_layout',
        regions: {
            panelRegion: '#panel-region',
            usersRegion: '#users-region'
        }
    });

    List.Panel = Marionette.ItemView.extend({
        template: 'user/list/templates/panel',
        collectionEvents: {
            sync: 'render'
        }
    });

    List.User = App.Views.ItemView.extend({
        template: 'user/list/templates/user',
        tagName: 'tr'
    });

    List.Empty = App.Views.ItemView.extend({
        template: 'user/list/templates/empty_user',
        tagName: 'tr'
    });

    List.Users = App.Views.CompositeView.extend({
        template: 'user/list/templates/users',
        itemView: List.User,
        emptyView: List.Empty,
        itemViewContainer: 'tbody'
    });
});