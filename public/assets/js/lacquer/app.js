(function(){
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
}).call(window);