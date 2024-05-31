import axios, { AxiosResponse } from "axios";

const baseURL = `https://pbl7-book-recommender-content-base.onrender.com`;

const contentBasedInstance = axios.create({
	baseURL: baseURL,
	headers: {
		"Content-Type": "application/json",
		"Access-Control-Allow-Origin": "*",
		"ngrok-skip-browser-warning": "true",
	},
});

const handleSuccessResponse = (response: AxiosResponse<any, any>) => {
	return response;
};

const handleErrorResponse = (error: any) => {
	try {
		return Promise.reject(error.response.data);
	} catch (e) {
		return Promise.reject({ message: "Network Error" });
	}
};

export const setHeaderConfigAxios = (token?: string) => {
	if (token) {
		contentBasedInstance.defaults.headers.common["Authorization"] = token
			? "Bearer " + token
			: "";
	} else {
		delete contentBasedInstance.defaults.headers.common["Authorization"];
	}
};

contentBasedInstance.interceptors.response.use(
	handleSuccessResponse,
	handleErrorResponse
);

export default contentBasedInstance;
