Lacquer.module('Views', function(Views, App, Backbone, Marionette, $, _){
    Views.CollectionView = Marionette.CollectionView.extend({
        itemViewEventPrefix: 'childview'
    });
});