/**
* QuizApp Module
*/
angular.module('QuizApp', [])

.controller('QuestionController', ['$http', '$interval',
		function($http, $interval){
	Question = this;

	(function getQuestionDescription () {
		$http.get('description.json').success(function (data) {
			Question.values = data.questions;
			Question.difficulty = 'easy';
			Question.index = 0;

			Question.value = data.questions[Question.difficulty]
				[Question.index].question;

			Question.iteration = 0;

			Question.reset = function () {
				Question.value = data.questions[Question.difficulty]
					[Question.index].question;

				Question.iteration = 0;

				$interval.cancel(Question.typer);
				$interval.cancel(Question.timer);

				Question.typer = null;
				Question.timer = null;

				Question.typer = $interval(Question.type, 100,
					Question.value.length);

				Question.time = 30;
			}
			Question.setDifficulty = function (difficulty) {
				Question.difficulty = difficulty;
				Question.reset();
			}
			Question.setIndex = function (index) {
				Question.index = index;
				Question.reset();
			}
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
