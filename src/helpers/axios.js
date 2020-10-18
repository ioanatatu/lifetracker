import axios from "axios";

const instance = axios.create({
    xsrfCookieName: "mytoken",
    xsrfHeaderName: "csrf-token", // this middleware checks for this header to validate the token information
});

export default instance;
