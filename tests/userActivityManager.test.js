import UserActivityManager from "../userActivityManager";

describe("UserActivityManager", () => {
    let uam;
    let handleOverLimit;
    let handleUserActive;

    beforeEach(() => {
        jest.useFakeTimers();
        handleOverLimit = jest.fn();
        handleUserActive = jest.fn();
        uam = new UserActivityManager(handleOverLimit, handleUserActive);
        
    });

    afterEach(()=> {
        jest.useRealTimers();
    });

    it("can be initialised with the absent time in ms", () => {
        expect(uam.absentTimeLimit).toEqual(3000);
    });
    

    it("is under the absent time limit", () => {
        expect(uam.isOverLimit).toEqual(false);
    });


    it("is over the limit after the absent time limit has passed and calls the given callback", () => {

        expect(uam.isOverLimit).toEqual(false);
        jest.advanceTimersByTime(4000); //avançar no tempo 4s
        expect(uam.isOverLimit).toEqual(true);
        expect(handleOverLimit).toHaveBeenCalled();  

    });

    it("stops being over the limit when an user event triggers and then calls the given active user callback", () => {
        // const uam = new UserActivityManager({ onUserActive: handleUserActive, onOverLimit: handleOverLimit });
        
        jest.advanceTimersByTime(4000); //avançar no tempo 4s
        expect(uam.isOverLimit).toEqual(true);

        let event = new KeyboardEvent("keypress", {"keycode": 37});

        document.dispatchEvent(event);

        expect(handleUserActive).toHaveBeenCalled();
        expect(uam.isOverLimit).toEqual(false);
    });   
    
});