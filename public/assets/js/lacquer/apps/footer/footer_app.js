Lacquer.module('FooterApp', function(FooterApp, App, Backbone, Marionette, $, _){

    this.startWithParent = false; // не стартует автоматически, стартуем его вручную, на старт вешаем рендер футера

    var API = {
        showFooter: function(){
            FooterApp.Show.Controller.showFooter();
        }
    };

    FooterApp.on('start', function(){
        API.showFooter();
    });
});