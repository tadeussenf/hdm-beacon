var intervalID;

intervalID = setInterval( function () {
    if (/loaded|complete/i.test(document.readyState)) {
        angular.bootstrap ( document, ['app'] );
        clearInterval( intervalID );
    }
}, 10 );


