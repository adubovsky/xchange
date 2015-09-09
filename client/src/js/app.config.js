var app = require('./app');
/*Material design Icons config*/
app.config(function($mdIconProvider) {
    // Configure URLs for icons specified by [set:]id.
    $mdIconProvider
        .iconSet('navigation', '/img/icons/navigation.svg')
        .iconSet('content', '/img/icons/content.svg')
        .iconSet('image', '/img/icons/image.svg')
        .iconSet('action', '/img/icons/action.svg');
});