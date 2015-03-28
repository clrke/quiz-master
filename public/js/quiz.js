/**
* QuizApp Module
*/
angular.module('QuizApp', [])

.controller('QuestionController', ['$http', '$interval',
		function($http, $interval){
	Question = this;
	Question.value = "What are the needed ingredients for Buriza?";
	Question.iteration = 0;

	Question.type = function () {
		Question.iteration++;

		// todo: stop iteration
	}
	Question.typer = $interval(Question.type, 50);

	Question.getValue = function () {
		return Question.value.substring(0, Question.iteration);
	}
}]);
