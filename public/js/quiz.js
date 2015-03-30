/**
* QuizApp Module
*/
angular.module('QuizApp', [])

.controller('QuestionController', ['$http', '$interval',
		function($http, $interval){
	Question = this;

	(function getQuestionDescription () {
		$http.get('description.json').success(function (data) {
			Question.value = data.questions.easy[0].question;

			Question.iteration = 0;

			Question.type = function () {
				Question.iteration++;
			}
			Question.typer = $interval(Question.type, 100,
				Question.value.length);

			Question.time = 30;
			Question.timeMinus = function () {
				Question.time--;
			}
			Question.startTimer = function () {
				if( ! Question.timer) {
					Question.time = 30;
					Question.timer = $interval(Question.timeMinus,
						1000, Question.time);
				}
			}

			Question.getValue = function () {
				value = Question.value.substring(0, Question.iteration);
				return value.split('\n');

			}

			Question.getFormattedTime = function () {
				return (Question.time < 10? '0':'')+Question.time;
			}
		});
	})();
}]);
