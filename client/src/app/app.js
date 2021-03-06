(function() {
    'use strict';


    angular
        .module('app')
        .controller('AppCtrl', AppCtrl);


    AppCtrl.$inject = [
        '$rootScope',
        '$scope',
        '$location',
        'Auth',
        'cfpLoadingBar',
        'HOODIE'
    ];


    function AppCtrl($rootScope, $scope, $location, Auth, cfpLoadingBar, HOODIE) {
        var vm = this;

        vm.logout = logout;
        vm.clearError = clearError;
        vm.hoodieRemote = HOODIE;

        //Catch request start end stop events for the loading bar
        $rootScope.$on('req:start', cfpLoadingBar.start);
        $rootScope.$on('req:end', cfpLoadingBar.complete);

        $scope.$on('$stateChangeSuccess', function (event, toState) {
            if (angular.isDefined(toState.data.pageTitle)) {
                vm.pageTitle = toState.data.pageTitle + ' | ng-hoodie';
            }
        });

        function logout() {
            Auth.logout(function () {
                $location.path('/');
            });
        }

        function clearError() {
            $rootScope.error = null;
        }
    }



})();
