angular.module('contactMsg')

.filter("paragraph", function () {
  return function (input) {
      return (input) ? input.replace(/\n/g, "<br />") : input;
  };
})

.filter('truncate', function () {
  return function (input, limit) {
      return (input.length > limit) ? input.substr(0, limit) + '-' : input;
  };
})
