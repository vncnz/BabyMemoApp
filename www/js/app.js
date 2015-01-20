
isIOS = (navigator.userAgent.indexOf('iPhone') != -1) || (navigator.userAgent.indexOf('iPod') != -1) || (navigator.userAgent.indexOf('iPad') != -1);
isAndroid = (navigator.userAgent.indexOf('android') != -1 || navigator.userAgent.indexOf('Android') != -1);
isMobile = isIOS || isAndroid;


var babymemoapp = angular.module('BabyMemoApp', ['ngTouch', 'ngStorage', 'ngAnimate', 'ngFitText']);

function onDeviceReady() {
	
}

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
    }
};
document.addEventListener('deviceready', onDeviceReady);




function randomString(minLength, maxLength)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789                _.";

	var length = parseInt(Math.random()*(maxLength-minLength)) + minLength;

    for( var i=0; i < length; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}































// http://weblogs.asp.net/dwahlin/creating-custom-angularjs-directives-part-3-isolate-scope-and-function-parameters
babymemoapp.directive('myItemActions', ['$swipe', '$timeout',
        function($swipe, $timeout) {

        return {
          restrict: 'EA',
          transclude: true,
          template: '<div class="item-swipe-wrapper" style="position: relative">' +
                    '<div class="delete-div" ng-style="deleteStyle" ng-click="proceed = true">Delete</div>' +
                    '<div class="swiper" ng-style="swiperStyle" ng-transclude style="position: relative"></div>' +
                  '</div>',
          link: function(scope, iElement, iAttrs, ctrl) {
          	
          	scope.$watch('proceed', function(val){
              	if(val){
              		//$swiper.css("max-height", 0+"px");
              		$wrapper.css("max-height", 0+"px");
              		$swiper.css("padding", 0+"px");
              		$delete.css("padding", 0+"px");
					scope.eliminateItem = $timeout(function() {
						scope.proceed = false;
						return scope.$eval(iAttrs.onDelete);
					}, 500);
              	}else{
                	// nada
              	}
            });
          	
          	var $swiper = angular.element('.swiper', iElement);
          	var $delete = angular.element('.delete-div', iElement);
          	var $wrapper = angular.element('.item-swipe-wrapper', iElement);
          	$wrapper.css("transition", "all .5s ease");
          	$wrapper.css("-webkit-transition", "all .5s ease");
          	setTimeout(function(){
          		//$swiper.css("max-height", $swiper.outerHeight()+"px");
          		$delete.css("line-height", $delete.outerHeight()+"px");
          		$wrapper.css("max-height", $swiper.outerHeight()+2+"px");
          		$wrapper.css("overflow", "hidden");
          	},1000);
          	angular.element('.delete-div', iElement).css("line-height", $swiper.outerHeight()+"px");
            var startX;
            var initialPos;

            var currentPosition = 0;

            $swipe.bind($swiper, {
              'start': function(coords) {
                //console.log("start swiping "+coords.x);
                startX = coords.x;
                initialPos = parseInt($swiper.css("left"));
                currentPosition = initialPos;
              },
              'move': function(coords) {
                //console.log("move swiping: "+initialPos+" -> "+coords.x);
                var delta = coords.x - startX;
                var pos = initialPos+delta;
                pos = Math.max(pos, 0);
                pos = Math.min(pos, 100);
                $swiper.css("left", pos+"px");
                currentPosition = pos;
                //$("#menu_button").css("left", (pos+10)+"px");
              },
              'end': function(coords) {
                //console.log("end swiping"+coords.x);
                //var delta = coords.x - startX;
                if(Math.abs(currentPosition)<50)
                	$swiper.css("left", 0+"px");
                else
                	$swiper.css("left", 100+"px");
                //console.log("currentPosition: "+currentPosition);
                //alert(currentPosition);
              },
              'cancel': function(coords) {
                //console.log("cancel swiping");
                //MenuService.close();
                return true;
              }
            });
          }
        }
    }]);