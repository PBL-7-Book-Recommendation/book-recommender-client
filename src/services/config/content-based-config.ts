import axios, { AxiosResponse } from "axios";

const baseURL = `https://59bf-2405-4802-60b9-f8a0-e563-4a93-b239-8b69.ngrok-free.app`;

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
