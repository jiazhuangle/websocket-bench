module.exports = {

  add: (function () {
    var counter = 0;
    return function () {return counter++;}
})()
  


};
