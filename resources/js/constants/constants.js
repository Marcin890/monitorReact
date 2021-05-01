// export const URL = "http://localhost:8000";
// export const URL = "http://monitornews.pl";

const prod = {
    url: {
        API_URL: "http://monitornews.pl",
    },
};
const dev = {
    url: {
        API_URL: "http://localhost:8000",
    },
};
export const config = process.env.NODE_ENV === "development" ? dev : prod;
