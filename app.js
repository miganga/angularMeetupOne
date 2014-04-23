var firstApp = angular.module('firstApp', ['ngRoute','ngResource']);firstApp.config(function($routeProvider) {	$routeProvider		.when('/',		{			templateUrl:'views/first.html',			controller: 'secondController'		})		.when('/second',		{			templateUrl: 'views/second.html',			controller: 'secondController'		}		)});firstApp.controller('firstController', function($scope, firstData) {	$scope.datalist = firstData;});firstApp.controller('secondController', function($scope, secondFactory) {	$scope.Search = function() {		$scope.weatherData = secondFactory.Search($scope.searchInput);		$scope.searchInput = "";	}});firstApp.factory('firstData', function () {	return [		{count: 0, name: 'Christi', country: 'Tajikistan'},		{count: 1, name: 'Bernadine', country: 'Cameroon'},		{count: 2, name: 'Doyle', country: 'St Kitta & Nevis'},		{count: 3, name: 'Samantha', country: 'Morocco'},		{count: 4, name: 'Watts', country: 'Ethiopia'},		{count: 5, name: 'Bertie', country: 'Anguilla'},		{count: 6, name: 'Coffey', country: 'Mongolia'},		{count: 7, name: 'Velma', country: 'French West Indies'},		{count: 8, name: 'Gretchen', country: 'China'},		{count: 9, name: 'Cooper', country: 'Togo'}	];});firstApp.directive('navBar', function($location) {	return {		templateUrl: 'directives/navbar.html',		restrict: 'AEC',		replace: true,		scope: {			var : '@'		},		link: function postLink(scope, element, attrs) {			var d = new Date();			scope.time = d.getTime();			scope.activate = function(route) {				return route === $location.path();			};		},		controller: function() {		}	}});firstApp.factory('secondFactory', function($resource) {	var weatherizer = $resource(		'http://api.openweathermap.org/data/2.5/forecast/:action',		{cnt:'7', mode:'json',units:'metric'},		{			daily:{				method: 'GET',				params:{					action: 'daily', q: 'Cologne'				}			}		}	);	var factory = {};	factory.Search = function (cityText) {		return weatherizer.daily({q:cityText});	};	return factory;});firstApp.filter('dateFilter', function() {		return function(input, dateType){			var date = new Date(input*1000);			if (dateType === 'day' || typeof dateType === 'undefined') {				var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];				return days[date.getDay()];			}		}});firstApp.directive('cityTitle', function() {	return {		templateUrl: 'directives/title.html',		restrict: 'E',		replace: true,		scope: {			city: '='		},		link: function postLink(scope, element, attrs) {			scope.title = "Please enter a city name";			console.log(scope.city);			scope.$watch('city', function(value) {				if (typeof value == 'string') {					scope.title = value;				}			});		}	}});