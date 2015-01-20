
function PageController($scope, $localStorage, $timeout) {
	$scope.hello = "AngularJS caricato correttamente";
	$scope.floatNavClosed = true;
	
	$scope.daysFromAuroraBirth = 0;
	$scope.weeksFromAuroraBirth = 0;
	$scope.weekDaysFromAuroraBirth = 0;
	
	$scope.marryValueToDisplay = 0;
	$scope.marryLabelToDisplay = "giorni";
	$scope.daysFromMarry = 0;
	
	$scope.lastDate = new Date();
	
	$scope.calcolaDate = function() {
		//$scope.lastDate.setDate($scope.lastDate.getDate()+5);
		//var now = $scope.lastDate;//new Date();
		var now = new Date();
		var auroraBirth = new Date(2014, 10, 3, 22, 31);
		var marry = new Date(2013, 11, 4, 11, 0);
		$scope.daysFromAuroraBirth = parseInt((now - auroraBirth) / (1000 * 3600 * 24));
		$scope.weeksFromAuroraBirth = parseInt($scope.daysFromAuroraBirth / 7);
		$scope.weekDaysFromAuroraBirth = $scope.daysFromAuroraBirth % 7;
		
		$scope.daysFromMarry = parseInt((now - marry) / (1000 * 3600 * 24));
		$scope.marryValueToDisplay = $scope.daysFromMarry;
		
		if($scope.marryLabelToDisplay=="giorni") {
			$scope.marryValueToDisplay = $scope.daysFromMarry;
		} else {
			var marrymesi = $scope.daysFromMarry/30;
			$scope.marryValueToDisplay = parseInt(marrymesi);
		}
		
		$timeout(function() {
			$scope.calcolaDate();
		}, 4000);
	};
	$scope.calcolaDate();
	
	$scope.changeMarryTimer = function() {
		if($scope.marryLabelToDisplay=="giorni") {
			var marrymesi = $scope.daysFromMarry/30;
			$scope.marryValueToDisplay = parseInt(marrymesi);
			$scope.marryLabelToDisplay = "mesi";
		} else {
			$scope.marryValueToDisplay = $scope.daysFromMarry;
			$scope.marryLabelToDisplay = "giorni";
		}
		
		//$(window).trigger("resize");
	};
	
	
	$scope.floatNavToggle = function(state) {
		if(state===undefined) {
			$scope.floatNavClosed = !$scope.floatNavClosed;
			if(!$scope.floatNavClosed) {
				$scope.memo_tmp = {
					title: "",
					content: "",
					datetime: (new Date()).getTime()
				};
			}
		}
	};
	
	$scope.saveNewMemo = function() {
		$scope.storage.memos.push($scope.memo_tmp);
		$scope.floatNavToggle();
	};
	
	$scope.removeMemo = function(memo){
      $scope.storage.memos.splice($scope.storage.memos.indexOf(memo), 1);
    };
	
	$scope.storage = $localStorage.$default({
        memos: [{
        	title: "<3",
        	content: "Ti amo piccina!",
        	datetime: (new Date()).getTime()
        }]
    });
	    /*
	if($scope.storage.memos.length<7) {
	    //$scope.storage.memos = [];
	    for(var i=0; i<8; i++) {
	    	var iint = parseInt(Math.random()*i*100);
		    $scope.storage.memos.push({
		    	title: "Title "+iint,//+" molto molto molto molto lungo",
		    	content: randomString(0, 120),
		    	datetime: (new Date(2014, 11, 22-i)).getTime()
		    });
	    }
	}
	*/
}