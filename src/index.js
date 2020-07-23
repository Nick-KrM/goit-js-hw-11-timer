import Timer from './Timer.js';
import TimerSecond from './TimerSecond.js';
import './styles.css';

new Timer({
  selector: '#timer',
});

new TimerSecond({
  selector: '#timer-1',
});