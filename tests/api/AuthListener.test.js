import { describe, it } from "mocha";
import { TestConfiguration } from "./TestConfiguration.js";
import chaiHttp from 'chai-http';
import { expect } from "chai";
chai.use(chaiHttp);
describe("AuthListener", () => {
    it('successfully login with correct credentials', () => {
        return chai.request(TestConfiguration.server)
            .post("/auth/login")
            .send({
            username: "nich",
            password: "nich"
        })
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.have.param("exitCode", "SYS.REQUEST.DONE");
            expect(res).header("x-auria-access-token").to.be.not.empty;
        });
    });
    it('refuses login with incorrect credentials', () => {
        return chai.request(TestConfiguration.server)
            .post("/auth/login")
            .send({
            username: "nich",
            password: "nich1"
        })
            .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).header("x-auria-access-token").to.be.not.empty;
        });
    });
    it('refreshes token when logged in', () => {
    });
    it('fails to refresh token when user is not logged in', () => {
    });
    4;
});
//# sourceMappingURL=AuthListener.test.js.map