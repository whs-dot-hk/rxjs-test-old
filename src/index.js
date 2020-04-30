import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

const r = document.getElementById('red');
const y = document.getElementById('yellow');
const g = document.getElementById('green');

const r$ = fromEvent(r, 'change').pipe(mapTo('red'));
const y$ = fromEvent(y, 'change').pipe(mapTo('yellow'));
const g$ = fromEvent(g, 'change').pipe(mapTo('green'));

const i = function initialBackgroundColor() {
  const rc = r.checked;
  const yc = y.checked;
  const gc = g.checked;

  switch (true) {
    case rc:
      return of('red');
    case yc:
      return of('yellow');
    case gc:
      return of('green');
    default:
      return of();
  }
}

const i$ = i();

const c = function changeBackgroundColor(color) {
  document.body.style.background = color;
}

merge(i$, r$, y$, g$).subscribe(x => c(x));
