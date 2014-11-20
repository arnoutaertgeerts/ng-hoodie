(function() {
    'use strict';

    angular
        .module('authorization',  [
            'ngCookies',
            'model.user',
            'hoodie',
            'toaster'
        ]);
})();