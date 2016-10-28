var Rx = require("@reactivex/rxjs");

module.exports = function(selector, checkInterval, retryCnt) {
  checkInterval = +checkInterval || 200;
  retryCnt = +retryCnt || 5;
  return Rx.Observable
    .interval(checkInterval)
    .map(function() {
      return Rx.Observable.of(document.querySelectorAll(selector))
    })
    .mergeAll()
    .map(function(elemList) {
      return elemList.length > 0 ?
         Rx.Observable.of(elemList)
         : Rx.Observable.throw(new Error("DOM not exist"))
    })
    .mergeAll()
    .retry(retryCnt);
}
