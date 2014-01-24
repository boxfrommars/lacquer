Lacquer.module('UsersApp.List', function(List, App, Backbone, Marionette, $, _){

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
});