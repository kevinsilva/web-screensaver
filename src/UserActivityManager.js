export default class UserActivityManager {
  constructor(onOverLimit, onUserActive, absentTime = 3000) {
    this.absentTimeLimit = absentTime;
    this.isOverLimit = false;

    let absentTimer;
    let activities = ['keypress', 'mousemove', 'click', 'scroll', 'touchstart'];

    const startTimer = () => {
      return setTimeout(() => {
        this.isOverLimit = true;
        onOverLimit();
      }, this.absentTimeLimit);
    };

    const userActivity = () => {
      this.isOverLimit = false;
      clearTimeout(absentTimer);
      absentTimer = startTimer();
      onUserActive();
    };

    absentTimer = startTimer();

    for (let i = 0; i <= activities.length; i++) {
      document.addEventListener(activities[i], userActivity);
    }
  }
}
