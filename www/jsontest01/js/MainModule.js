var app = angular.module( 'app', ['app.ctrl'])


        .run ( function ( $rootScope, $log ) {

            $log.log ("run app")

        })

    ;
