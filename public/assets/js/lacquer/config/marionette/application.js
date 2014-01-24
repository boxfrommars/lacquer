(function(Backbone) {
    return _.extend(Backbone.Marionette.Application.prototype, {
        navigate: function(route, options) {
            return Backbone.history.navigate(route, options);
        },
        getCurrentRoute: function() {
            return Backbone.history.fragment;
        }
    });
})(Backbone);