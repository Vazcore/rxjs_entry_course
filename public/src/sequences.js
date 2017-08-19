// Classic way

document.body.addEventListener('mousemove', function(event) {
  //console.log(event.clientX, event.clientY);
});


// Side effect -> external state variable
var clicks = 0;
document.addEventListener('click', function registerClicks(event) {
  // if (clicks < 3) {
  //   clicks++;
  //   console.log(event.clientX, event.clientY);
  // } else {
  //   document.removeEventListener('click', registerClicks);
  // }
});


// Using RxJS
var clicks$ = Rx.Observable.fromEvent(document, 'click')
.filter(event => {
  return event.clientX < (window.innerWidth / 2);
})
.take(3);

//clicks$.subscribe(e => console.log(e));


/**
 * Definition of a Stream
 *   (left)  (right) (left)  (left)  (left)
 * ---click---click---click---click---click--->
 * ___________filter left__________________
 * ---click-----------click---click---click--->
 * ______________take 3_______________________
 * ---click-----------click---click----||--->
 * 
*/



/**
 * Observable and Observer
*/

// Observerable
var observable = Rx.Observable.create(function (observer) {
  observer.onNext({name: 'Alexey'});
  observer.onNext({name: 'Victoria'});
  observer.onNext({name: 'Genadiy'});
  observer.onCompleted();  // end of stream
});

// observable.subscribe(person => {
//   console.table([person]);
// });

// Observer

var observer = Rx.Observer.create(
  function onNext(val) { console.log('Next person is: ' + val.name) },
  function onError(err) { console.log('Error: ' + err) },
  function onCompleted() { console.log('Completed') }
);

//observable.subscribe(observer);

/**
 * Ajax call via Observable
*/

function get(url) {
  return Rx.Observable.create(observer => {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = () => {
      if (req.status === 200) {
        observer.onNext(req.response);
        observer.onCompleted();
      } else {
        observer.onError(new Error(req.status));
      }
    };

    req.onerror = () => {
      observer.onError(new Error("Uknown Error"));
    };

    req.send();
  });
}

var request$ = get('/json/contents.json');

// request$.subscribe(
//   response => console.log(response),
//   err => console.log('Custom: ' + err)
// );

/**
 * RxJS operator to work with requests
*/

// Rx.DOM.get('/json/contents.json').subscribe(
//   function onNext(data) { console.log(data.response) },
//   function onError(err) { console.log(err) },
// );


/**
 * Creating Observables from Array
*/

// Rx.Observable.from(
//   ['Alex', 'Nina', 'Sveta']
// ).subscribe(
//   name => console.log(name),
//   err => console.log(err),
//   () => console.log('----Completed----')
// );

/**
 * Creating Observables from Events
*/

var clicks$ = Rx.Observable.fromEvent(document, 'click');
//clicks$.subscribe();