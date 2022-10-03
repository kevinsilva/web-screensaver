export default class UserActivityManager {
        // constructor({ absentTime = 3000, onOverLimit, onUserActive }) {
        constructor(onOverLimit, onUserActive, absentTime = 3000) {
            this.absentTimeLimit = absentTime;
            this.isOverLimit = false;
    
            let absentTimer;
            let activities = ['keypress', 'mousemove', 'click', 'scroll', 'touchstart'];
    
            const startTimer = () => {
                return setTimeout(() => {
                    this.isOverLimit = true
                    onOverLimit()
                }, this.absentTimeLimit);
            }

            const userActivity = () => {
                this.isOverLimit = false;
                clearTimeout(absentTimer);
                absentTimer = startTimer();
                onUserActive();
            };

            absentTimer = startTimer();

            for(let i = 0; i <= activities.length; i++) {
                document.addEventListener(activities[i], userActivity);
            }
        }
}

// export default class UserActivityManager {
//     constructor(ifUserActive, ifUserInactive, absentTime = 3000) {
//         this.ifUserActive = ifUserActive;
//         this.ifUserInactive = ifUserInactive;
//         this.absentTime = absentTime;
//         this.activities = ['keypress', 'mousemove', 'click', 'scroll', 'touchstart'];
//         this.userActivity;
         
//         const startTimer = () => {
//              return setTimeout(userIsInactive, this.absentTime); 
//         }

//         const userIsInactive = () => {
//             this.userActivity = false;
//             ifUserInactive();
//         }  

//         const userIsActive = () => {
//             this.userActivity = true;
//             clearTimeout(isUserActive);
//             isUserActive = startTimer();
//             ifUserActive();
//         }

//         let isUserActive = startTimer();

//         for(let i = 0; i <= this.activities.length; i++) {
//             document.addEventListener(this.activities[i], userIsActive);
//         }
//     }
// }

