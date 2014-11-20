(function () {
    'use strict';

    angular
        .module('authorization')
        .factory('Auth', Auth);

    Auth.$inject = [
        '$http',
        '$cookieStore',
        'hoodieAccount',
        'Access',
        'User',
        'toaster'
    ];

    function Auth($http, $cookieStore, hoodieAccount, Access, User) {

        var currentUser = $cookieStore.get('user') || { name: '', roles: ['anon']};

        $cookieStore.remove('user');

        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        var factory = {
            authorize: authorize,
            isLoggedIn: isLoggedIn,
            register: register,
            login: login,
            logout: logout,
            changePassword: changePassword,
            user: currentUser
        };

        return factory;

        function authorize(accessLevel, roles) {
            if (roles === undefined) {
                roles = currentUser.roles;
            }

            var authorizedRoles = Access[accessLevel];
            return _.intersection(authorizedRoles, currentUser.roles).length > 0;

        }

        function isLoggedIn(user) {
            if (user === undefined) {
                user = currentUser;
            }

            return user.roles.indexOf('anon') === -1;
        }

        function register(username, password) {
            return hoodieAccount.signUp(username, password);
        }

        function login(username, password) {
            return hoodieAccount.logIn(username, password);
        }

        function logout() {
            return hoodieAccount.logOut.then(function () {
                changeUser({
                    name: '',
                    email: '',
                    roles: [
                        'anon'
                    ]
                });
            });
        }

        function changePassword(oldPassword, newPassword) {
            //Check the old password of the current user by logging in again
            var name = currentUser.name;

            //Change the password to the new password
            factory.login(name, oldPassword).then(function () {
                currentUser.password = newPassword;
                currentUser.$save().then(function () {
                    factory.getUser(name);
                });
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

})();