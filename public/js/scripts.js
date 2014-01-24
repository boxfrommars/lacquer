/*! lacquer - v0.1.0 - 2014-01-24 */Handlebars.logger.log = function(data) {
    console.log.apply(console, [].concat(["Handlebars: "], data));
};
// DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3,
Handlebars.registerHelper('log', Handlebars.logger.log);;(function(Backbone) {
    return _.extend(Backbone.Marionette.Application.prototype, {
        navigate: function(route, options) {
            return Backbone.history.navigate(route, options);
        },
        getCurrentRoute: function() {
            return Backbone.history.fragment;
        }
    });
})(Backbone);;Backbone.Marionette.Renderer.render = function(template, data){
    if (!JST[template]) {
        throw "Template '" + template + "' not found!";
    }
    return JST[template](data);
};;(function(){
    this.Lacquer = (function(Backbone, Marionette){
        var App = new Marionette.Application();

        App.mainRoute = 'users';

        App.on('initialize:before', function(options){
            this.currentUser = App.request('set:current:user', options.currentUser);
        });

        App.reqres.setHandler('get:current:user', function(){
            return App.currentUser;
        });

        App.addRegions({
            headerRegion: '#header-region',
            mainRegion: '#main-region',
            footerRegion: '#footer-region'
        });

        App.addInitializer(function(){
            App.module('FooterApp').start();
            App.module('HeaderApp').start();
        });

        App.on('initialize:after', function(){
            if (Backbone.history) {
                Backbone.history.start();
                if (this.getCurrentRoute() === '') {
                    this.navigate(this.mainRoute, {trigger: true});
                }
            }
        });

        App.on('all', function(){
            console.log(arguments);
        });

        return App;
    })(Backbone, Marionette);
}).call(window);;Lacquer.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.Collection = Backbone.Collection.extend({});
});;Lacquer.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.Model = Backbone.Model.extend({});
});;Lacquer.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
    Entities.Header = Entities.Model.extend({});

    Entities.HeaderCollection = Entities.Collection.extend({
        model: Entities.Header
    });

    var API = {
        getHeaders: function(){
            return new Entities.HeaderCollection([
                {name: 'Users', url: '#users'},
                {name: 'Leads', url: '#leads'},
                {name: 'Appointments', url: '#appointments'}
            ]);
        }
    };

    App.reqres.setHandler('header:entities', function(){
        return API.getHeaders();
    });

});;Lacquer.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
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

});;Lacquer.module('Views', function(Views, App, Backbone, Marionette, $, _){
    Views.CollectionView = Marionette.CollectionView.extend({
        itemViewEventPrefix: 'childview'
    });
});;Lacquer.module('Views', function(Views, App, Backbone, Marionette, $, _){
    Views.CompositeView = Marionette.CompositeView.extend({});
});;Lacquer.module('Views', function(Views, App, Backbone, Marionette, $, _){
    Views.ItemView = Marionette.ItemView.extend({});
});;Lacquer.module('Views', function(Views, App, Backbone, Marionette, $, _){
    Views.Layout = Marionette.Layout.extend({});
});;Lacquer.module("Views", function(Views, App, Backbone, Marionette, $, _) {
    return _.extend(Marionette.View.prototype, {
        templateHelpers: function() {
            return {
                currentUser: App.request("get:current:user").toJSON(),
                linkTo: function(url, name, options) {
                    console.log.apply(console, arguments);
                    return  _.template('<a href="<%= url %>"><%= name %></a>', {url: url, name: name});
                }
            };
        }
    });
});;Lacquer.module('FooterApp', function(FooterApp, App, Backbone, Marionette, $, _){

    this.startWithParent = false; // не стартует автоматически, стартуем его вручную, на старт вешаем рендер футера

    var API = {
        showFooter: function(){
            FooterApp.Show.Controller.showFooter();
        }
    };

    FooterApp.on('start', function(){
        API.showFooter();
    });
});;Lacquer.module('FooterApp.Show', function(Show, App, Backbone, Marionette, $, _){
    Show.Controller = {

        showFooter: function(){
            var footerView = this.getFooterView();
            App.footerRegion.show(footerView);
        },

        getFooterView: function(){
            return new Show.Footer();
        }
    };
});;Lacquer.module('FooterApp.Show', function(Show, App, Backbone, Marionette, $, _){

    Show.Footer = App.Views.ItemView.extend({
        template: 'footer/show/templates/show_footer',
        modelEvents: {
            'change': 'render'
        }
    });
});;Lacquer.module('HeaderApp', function(HeaderApp, App, Backbone, Marionette, $, _){

    this.startWithParent = false;

    var API =  {
        listHeader: function(){
            HeaderApp.List.Controller.listHeader();
        }
    };


    HeaderApp.on('start', function(){
        API.listHeader();
    });
});;Lacquer.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _){
    List.Controller = {
        listHeader: function(){
            var links = App.request('header:entities');

            var headerView = this.getHeaderView(links);
            App.headerRegion.show(headerView);
        },

        getHeaderView: function(links){
            return new List.Headers({
                collection: links
            });
        }
    };
});;Lacquer.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _){

    List.Header = App.Views.ItemView.extend({
        template: 'header/list/templates/header',
        tagName: 'li'
    });

    List.Headers = App.Views.CompositeView.extend({
        template: 'header/list/templates/headers',
        itemView: List.Header,
        itemViewContainer: 'ul'
    });
});;Lacquer.module('LeadsApp', function(LeadsApp, App, Backbone, Marionette, $, _){
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
});;Lacquer.module('LeadsApp.List', function(List, App, Backbone, Marionette, $, _){

    List.Controller = {
        listLeads: function(){
            var leadsView = this.getLeadsView();
            App.mainRegion.show(leadsView);
        },

        getLeadsView: function(){
            return new List.Leads();
        }
    };

});;Lacquer.module('LeadsApp.List', function(List, App, Backbone, Marionette, $, _){
    List.Leads = App.Views.ItemView.extend({
        'template': 'leads/list/templates/list_leads'
    });
});;Lacquer.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _){

    List.Controller = {
        listUsers: function(){

            var _this = this;

            var users = App.request('user:entities');
            users.on('all', function(e){
                console.log(e);
            });
            this.layout = this.getLayout();

            this.layout.on('show', function(){
                _this.showPanel(users);
                _this.showUsers(users);
            });

            App.mainRegion.show(this.layout);
        },

        getLayout: function(){
            return new List.Layout();
        },

        showPanel: function(users){
            var panelView = this.getPanelView(users);
            this.layout.panelRegion.show(panelView);
        },

        showUsers: function(users){
            var usersView = this.getUsersView(users);
            this.layout.usersRegion.show(usersView);
        },

        getPanelView: function(users){
            return new List.Panel({
                collection: users
            });
        },

        getUsersView: function(users){
            return new List.Users({
                collection: users
            });
        }

    };
});;Lacquer.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _){

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
});;Lacquer.module('UsersApp', function(UsersApp, App, Backbone, Marionette, $, _){

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