/*
 * Use this to turn on logging: (in your local extensions file)
 */
Handlebars.logger.log = function(data) {
    console.log.apply(console, [].concat(["Handlebars: "], data));
};
// DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3,
Handlebars.registerHelper('log', Handlebars.logger.log);