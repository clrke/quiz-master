/**
* QuizApp Module
*/
angular.module('QuizApp', [])

.controller('QuestionController', ['$http', '$interval',
		function($http, $interval){
	Question = this;
	Question.value = "Anong buong pangalan ng Buriza?";
	Question.iteration = 0;

	Question.type = function () {
		Question.iteration++;

		// todo: stop iteration
	}
	Question.typer = $interval(Question.type, 100);

	Question.time = 30;
	Question.timeMinus = function () {
		Question.time--;

		// todo: stop iteration
	}
	Question.startTimer = function () {
		Question.time = 30;
		if( ! Question.timer)
			Question.timer = $interval(Question.timeMinus, 1000);
	}

	Question.getValue = function () {
		return Question.value.substring(0, Question.iteration);
	}

	Question.getFormattedTime = function () {
		return ("%2d", Question.time);
	}
}]);
