var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AuthenticationConfig } from "../../security/authentication/AuthenticationConfig.js";
import jwt from 'jsonwebtoken';
import { nanoid } from "nanoid";
import { HeaderAuthenticationName } from "../../security/authentication/interfaces/HeaderAuthenticationName.js";
export class UserAuthentication {
    constructor(user) {
        /**
         * Valid Tokens
         * ------------
         *
         * Hold all the viable JWT access tokens
         */
        this.validTokens = [];
        this.user = user;
    }
    newAuthentication(referer) {
        return __awaiter(this, void 0, void 0, function* () {
            let refreshTokenPayload = {
                _id: yield this.user.getId(),
                username: this.user.username,
                referer_identification: referer
            };
            const refreshToken = jwt.sign(refreshTokenPayload, AuthenticationConfig.jwt_secret.refresh);
            this.setRefreshToken(refreshToken);
            const accessToken = this.generateAccessToken();
            return {
                refreshToken,
                accessToken
            };
        });
    }
    setRefreshToken(refresh) {
        let refInfo = jwt.verify(refresh, AuthenticationConfig.jwt_secret.refresh);
        if (refInfo.username == this.user.username) {
            this.refreshTokenInfo = refInfo;
        }
        this.refreshToken = refresh;
        this.emptyAccessTokens();
    }
    getRefreshToken() {
        return this.refreshToken;
    }
    generateAccessToken() {
        if (this.refreshTokenInfo == null) {
            throw new Error("[UserAuthentication] Cannot generate an access token, refresh token not defined!");
        }
        let info = {
            _id: nanoid(),
            username: this.refreshTokenInfo.username,
            referer_identification: this.refreshTokenInfo.referer_identification,
        };
        const token = jwt.sign(info, AuthenticationConfig.jwt_secret.token, {
            expiresIn: "5 minutes"
        });
        this.validTokens.push(token);
        setTimeout(() => {
            this.validTokens = this.validTokens.filter((v) => v != token);
        }, (1000 * 60 * 5) + 50 // After 5 minutes and 50 milisseconds, cause why not...
        );
        return token;
    }
    emptyAccessTokens() {
        this.validTokens = [];
        return this;
    }
    validateRequestAuthentication(request) {
        var _a;
        let headerToken = (_a = request.headers[HeaderAuthenticationName]) !== null && _a !== void 0 ? _a : "";
        if (!this.validTokens.includes(headerToken)) {
            console.error("[UserAuthentication] Token REFUSED! It is NOT included in the valid tokens!");
            return false;
        }
        try {
            let info = jwt.verify(headerToken, AuthenticationConfig.jwt_secret.token);
            if (request.referer !== info.referer_identification) {
                console.error("[UserAuthentication] Token REFUSED! Referer identification mismatch!");
                return false;
            }
        }
        catch (err) {
            console.error("[UserAuthentication] Token signature failed!", err);
            return false;
        }
        return true;
    }
}
//# sourceMappingURL=UserAuthentication.js.map