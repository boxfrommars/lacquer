Lacquer.module('HeaderApp.List', function(List, App, Backbone, Marionette, $, _){
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
});