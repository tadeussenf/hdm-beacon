var service = angular.module('app.service', [])
        .service('DataService', function ( $log, $http ) {

            return {

                getUserByID : function ( id, responder ) {
                    var config = {
                        url: "http://gg-dev.de/usage1/demo/jsontest01/data/data.json",
                        method: "POST",
                    };

                    $http ( config )
                        .success(function(data, status, headers, config) {
                            if ( responder && responder.result && typeof responder.result == "function" )
                                responder.result (data);
                        })
                        .error(function(data, status, headers, config) {
                            if ( responder && responder.fault && typeof responder.fault == "function" )
                                responder.fault(data, status, headers, config);
                        });


                }

            }
        })
    ;
