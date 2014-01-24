Lacquer.module('Entities', function(Entities, App, Backbone, Marionette, $, _){
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

});