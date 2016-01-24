'use strict';

module.exports = ['$window', function($window) {
	var scope = {
		ngConfirm: '&',
	};

	function linker(scope, el, attr) {
		var confirmMessage = attr.ngConfirmMessage || '';

		el.on('click', function() {
			if ($window.confirm(confirmMessage)) {
				scope.ngConfirm();
			}
		});
	}

	return {
		restrict: 'A',
		scope: scope,
		link: linker,
	};
}];