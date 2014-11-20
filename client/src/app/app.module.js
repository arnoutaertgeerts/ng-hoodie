(function () {
    'use strict';

    angular
        .module('app', [
            //Pages
            'home',
            'admin',
            'about',
            'register',
            'login',
            //Plugins
            'hoodie',
            'formFor',
            'formFor.bootstrapTemplates',
            'authorization',
            'toaster',
            'ui.router',
            'ngSanitize',
            'cfp.loadingBar'
        ]);



})();
