Lacquer.module("Views", function(Views, App, Backbone, Marionette, $, _) {
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
});