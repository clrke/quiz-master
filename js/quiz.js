/**
* QuizApp Module
*/
angular.module('QuizApp', [])

.controller('QuestionController', ['$http', '$interval', '$timeout',
		function($http, $interval, $timeout){
	Question = this;

	(function getQuestionDescription () {
		$http.get('description.json').success(function (data) {
			Question.values = data.questions;
			Question.difficulty = '1easy';
			Question.index = 0;

			Question.value = data.questions[Question.difficulty]
				[Question.index].info.value;

			Question.iteration = 0;

			Question.show = 'info';

			Question.setQuestion = function () {
				switch(Question.show) {
					case 'question':
						Question.value = data.questions[Question.difficulty]
							[Question.index].question.value;
						break;
					case 'info':
						Question.value = data.questions[Question.difficulty]
							[Question.index].info.value;
						break;
					case 'answer':
						Question.value = data.questions[Question.difficulty]
							[Question.index].answer.value;
						break;
				}
				switch(Question.show) {
					case 'question':
						Question.file = data.questions[Question.difficulty]
							[Question.index].question.file;
						break;
					case 'info':
						Question.file = data.questions[Question.difficulty]
							[Question.index].info.file;
						break;
					case 'answer':
						Question.file = data.questions[Question.difficulty]
							[Question.index].answer.file;
						break;
				}
			};

			Question.reset = function () {
				$interval.cancel(Question.timer);

				Question.timer = null;
				Question.time = 30;

				Question.value = null;
				Question.file = null;

				$timeout(Question.setQuestion, 1);
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
				if(Question.value) {
					return Question.value.split('\n');
				} else {
					return [];
				}
			}

			Question.getFormattedTime = function () {
				return (Question.time < 10? '0':'')+Question.time;
			}
		});
	})();
}])

.controller('TitleController', ['$http', '$interval',
		function($http, $interval){
	Title = this;

	(function getQuestionDescription () {
		$http.get('description.json').success(function (data) {
			Title.value = data.title;
		});
	})();
}]);
