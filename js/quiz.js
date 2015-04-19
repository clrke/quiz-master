/**
* QuizApp Module
*/
angular.module('QuizApp', [])

.controller('QuestionController', ['$http', '$interval', '$timeout',
		function($http, $interval, $timeout){
	Question = this;

	(function getQuestionDescription () {
		Question.values = data.questions;
		Question.difficulty = '1easy';
		Question.index = 0;

		Question.value = data.questions[Question.difficulty]
			[Question.index].info.value;

		Question.iteration = 0;

		Question.show = 'info';

		Question.setQuestion = function () {
			Question.link = null;

			switch(Question.show) {
				case 'question':
					var display = data.questions[Question.difficulty]
						[Question.index].question
					break;
				case 'info':
					var display = data.questions[Question.difficulty]
						[Question.index].info
					break;
				case 'answer':
					var display = data.questions[Question.difficulty]
						[Question.index].answer
					break;
			}

			Question.value = display.value;
			Question.file = display.file;
			Question.link = display.link;

			Question.fadeOut = false;

			Question.timer = null;
			Question.time = data.questions[Question.difficulty]
				[Question.index].question.timer || 30;
			Question.maxTime = Question.time;
		};

		Question.timerOneThird = function () {
			return Question.maxTime/3;
		}

		Question.timerTwoThird = function () {
			return Question.maxTime*2/3;
		}

		Question.reset = function () {
			$interval.cancel(Question.timer);

			Question.fadeOut = true;
			$timeout(Question.setQuestion, 1000);
		}

		Question.setDifficulty = function (difficulty) {
			Question.difficulty = difficulty;
			Question.index = 0;
			Question.show = 'info';
			Question.reset();
		}
		Question.setIndex = function (index) {
			Question.index = index;
			Question.show = 'info';
			Question.reset();
		}

		Question.timeMinus = function () {
			Question.time--;
		}
		Question.startTimer = function () {
			if( ! Question.timer) {
				Question.timer = $interval(Question.timeMinus,
					1000, Question.time);
			}
		}

		Question.getValue = function () {
			if(Question.value) {
				return Question.value.split('\n');
			} else {
				return [];
			}
		}

		Question.getFormattedTime = function () {
			return (Question.time < 10? '0':'')+Question.time;
		}
	})();
}])

.controller('TitleController', ['$http', '$interval',
		function($http, $interval){
	Title = this;

	(function getQuestionDescription () {
		Title.value = data.title;
	})();
}]);
