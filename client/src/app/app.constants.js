(function() {
    'use strict';

    var remoteHoodie = 'http://127.0.0.1:6004';
    var remoteCouch = 'http://127.0.0.1:6006';

    angular
        .module('app')
        .constant('HOODIE', remoteHoodie)
        .constant('COUCH', remoteCouch);

})();