function ContentCtrl ( $scope, $log, $timeout, DataService )
{

    $scope.formPersonModel = {};

    DataService.getUserByID( 222, { result: function ( data ) {
            $scope.loadedData = data;
        },
        fault : function (data, status, headers, config)
        {
            $scope.loadedData = data;
            $scope.logObj( "loading error" );
        }
    });

    $scope.log = "";
    $scope.logCounter = 0;
    $scope.$root.logRelatedMargin = 120;

    $scope.showingLogs = function () {
        return $scope.log != "";
    }

    $scope.textClass = "text-left";
    $scope.loadingPercent = 0;

    $scope.logObj = function ( obj )
    {

        var output = '<dl class="dl-horizontal">';

        if ( angular.isObject (obj) )
        {
            angular.forEach( obj, function(value, key){
                output +=   '<dt>'+key+': </dt>';
                output +=   '<dd>'+value+'</dd>';
            });
        }
        else
        {
                output +=   '<dd>'+obj+'</dd>';
        }


        output +=   '</dl>';

        ++$scope.logCounter;
        $scope.log = output;

        $scope.$root.logRelatedMargin = 220;
    };
    $scope.delLog = function ()
    {
        $scope.log = "";
        $scope.logCounter = 0;
        $scope.$root.logRelatedMargin = 120;
    };

}

var ctrl = angular.module('app.ctrl', ['app.service'])
        .controller ( 'ContentCtrl', ContentCtrl )
    ;
