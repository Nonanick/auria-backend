export interface LoginAttempt {
    attemptIdentification: LoginAttempIdentification;
    timestamp: Date;
    username: string;
    success: boolean;

}

export type LoginAttempIdentification = string;