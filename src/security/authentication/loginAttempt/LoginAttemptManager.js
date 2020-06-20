import { LoginAttemptDenied } from "../../../exception/system/authentication/LoginAttemptDenied.js";
export class LoginAttemptManager {
    /**
     * Login Attempt Manager
     * ---------------------
     *
     * A security layer that prevents brute force
     *
     * Every login attempt should first verify if the
     * request has not exceeded the max amount of times allowed
     * to be failed
     */
    constructor() {
        this.allLoginAttempts = [];
        this.attemptsPerIdentification = new Map();
        this.attemptsPerUsername = new Map();
    }
    /**
     * Request Login Attempt
     * ----------------------
     *
     * Will request to the manager a new LoginAttempt object,
     * will throw an Error in case the request cannot be done!
     *
     * @param request
     */
    requestLoginAttempt(request) {
        let reqId = request.referer;
        let username = request.parameters['username'];
        if (this.verifyAttemptIdentification(reqId)
            && this.verifyAttemptUsername(username)) {
            return this.createLoginAttempt(request);
        }
        else {
            throw new LoginAttemptDenied("Failed to login, you exceeded the amount of tries! Please wait for a bit and try again!", { cooldown: LoginAttemptManager.LOGIN_ATTEMPT_COOLDOWN });
        }
    }
    /**
     * Clear login attempts
     * ---------------------
     *
     * Used when a user successfully logs in, all the previous attempts are erased
     *
     * @todo warn the user of the amount of attemps before loggin in?
     *
     * @param request
     */
    clearLoginAttempts(request) {
        let username = request.parameters['username'];
        let id = this.getStringFromIdentification(request.referer);
        let usernameAttempts = this.attemptsPerUsername.get(username);
        let idAttempts = this.attemptsPerIdentification.get(id);
        this.attemptsPerIdentification.delete(id);
        this.attemptsPerUsername.delete(username);
        let allAttempts = [].concat(usernameAttempts, idAttempts);
        //Delete from allLoginAttempts
        allAttempts.forEach((attempt) => {
            this.destroyLoginAttempt(attempt);
        });
        return {
            perIdentification: idAttempts,
            perUsername: usernameAttempts
        };
    }
    /**
     * Verify Attempt by Identification
     * ---------------------------------
     *
     * Check if the request IP + UserAgent exceeded the maximun amount of times
     * allowed to try and login
     *
     * @param id Object containing IP + UserAgent
     */
    verifyAttemptIdentification(id) {
        /*
            @todo study the necessity of UserAgent, for now it seems... bleh

            Should i botter with User Agent ??
            This was supposed to block multiple login requests from the same client
            with different usernames, if the invader tries to change its own Ip + UserAgent
            to brute force a password from a user it should be stopped by the "verifyAttemptUsername"
        */
        // Is there any other attempts from the same Ip + " | " + UserAgent
        let idString = this.getStringFromIdentification(id);
        if (this.attemptsPerIdentification.has(idString)) {
            let attempts = this.attemptsPerIdentification.get(idString);
            return this.verifyAttempts(attempts);
        }
        // Old request from same identification does not exists, OK
        else {
            return true;
        }
    }
    /**
     * Verify Attempt by Username
     * ---------------------------------
     *
     * Check if the request username exceeded the maximun amount of times
     * allowed to try and login
     *
     * @param username
     */
    verifyAttemptUsername(username) {
        if (this.attemptsPerUsername.has(username)) {
            let attempts = this.attemptsPerUsername.get(username);
            return this.verifyAttempts(attempts);
        }
        // No request for curent username, OK
        else {
            return true;
        }
    }
    /**
     * Verify if an array of LoginAttempts is suited to perform a new LoginRequest
     *
     * @param attempts
     */
    verifyAttempts(attempts) {
        // Clear old attempts, defined by the LOGIN_ATTEMPT_EXPIRE_TIME
        this.clearAttempts(attempts);
        // number of attempts lesser than the permitted ? OK
        if (attempts.length <= LoginAttemptManager.LOGIN_ATTEMPT_MAX_TRIES) {
            return true;
        }
        //Max tries reached but cooldown since last attempt is exceeded? OK
        let lastAttempt = attempts[attempts.length - 1];
        let timeDifferenceInSeconds = Math.abs(Date.now() - lastAttempt.timestamp.getTime()) / 1000;
        if (timeDifferenceInSeconds > LoginAttemptManager.LOGIN_ATTEMPT_COOLDOWN) {
            return true;
        }
        return false;
    }
    /**
     * Clear Attempts
     * ---------------
     *
     * Clear attempts older than LOGIN_ATTEMPT_EXPIRE_TIME
      */
    clearAttempts(attempts) {
        for (const [index, attempt] of attempts.entries()) {
            let timeDiffInSeconds = (Date.now() - attempt.timestamp.getTime()) / 1000;
            // If the login attempt is older than the defined expire time, destroy it
            if (timeDiffInSeconds > LoginAttemptManager.LOGIN_ATTEMPT_EXPIRE_TIME) {
                let allAttemptsIndex = this.allLoginAttempts.indexOf(attempt);
                this.allLoginAttempts.splice(allAttemptsIndex, 1);
                attempts.splice(index, 1);
            }
            // All LoginAttempts are placed ordered by timestamp (somewhat), so if one is not older than expire time, break the loop;
            else {
                break;
            }
        }
    }
    /**
     * Create Login Attempt
     * --------------------
     *
     * Create a LoginAttempt based on the HTTP request made
     *
     * This function does not veerif if the request CAN be done, please
     * to be sure that the request has permission to attempt to login use
     * *requestLoginAttempt";
     *
     * @param request
     */
    createLoginAttempt(request) {
        let attempt = {
            attemptIdentification: request.referer,
            timestamp: new Date(),
            username: request.parameters["username"],
            success: false
        };
        // Put it on AllLoginAttempts array
        this.allLoginAttempts.push(attempt);
        // Put it on UsernameAttempts array
        if (this.attemptsPerUsername.has(attempt.username)) {
            this.attemptsPerUsername.get(attempt.username).push(attempt);
        }
        else {
            this.attemptsPerUsername.set(attempt.username, [attempt]);
        }
        // Put it on AttemptIdentification array
        let idString = this.getStringFromIdentification(attempt.attemptIdentification);
        if (this.attemptsPerIdentification.has(idString)) {
            this.attemptsPerIdentification.get(idString).push(attempt);
        }
        else {
            this.attemptsPerIdentification.set(idString, [attempt]);
        }
        return attempt;
    }
    /**
     * Destroy Login Attempt
     * ----------------------
     *
     * Remove attempt from allLoginAttempt
     *
     * @param attempt
     */
    destroyLoginAttempt(attempt) {
        let allAttemptsIndex = this.allLoginAttempts.indexOf(attempt);
        this.allLoginAttempts.splice(allAttemptsIndex, 1);
    }
    /**
     * Get String from Identification
     * ------------------------------
     *
     * Return the concatened string of the user IP + " | " + UserAgent
     * @param id
     */
    getStringFromIdentification(id) {
        return id;
    }
}
/**
 * Maximun amount of times that the user may request to login
 * without succeding
 *
 */
LoginAttemptManager.LOGIN_ATTEMPT_MAX_TRIES = 5;
/**
 *
 */
LoginAttemptManager.LOGIN_ATTEMPT_COOLDOWN = 60 * 2;
LoginAttemptManager.LOGIN_ATTEMPT_EXPIRE_TIME = 60 * 60 * 2;
//# sourceMappingURL=LoginAttemptManager.js.map