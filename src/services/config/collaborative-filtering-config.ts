import axios, { AxiosResponse } from "axios";

const baseURL = `https://9fe5-2402-9d80-439-d18d-891b-25c5-b280-8b63.ngrok-free.app`;

const collaborativeFilteringInstance = axios.create({
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

export const setCFHeaderConfigAxios = (token?: string) => {
	if (token) {
		collaborativeFilteringInstance.defaults.headers.common["Authorization"] =
			token ? "Bearer " + token : "";
	} else {
		delete collaborativeFilteringInstance.defaults.headers.common[
			"Authorization"
		];
	}
};

collaborativeFilteringInstance.interceptors.response.use(
	handleSuccessResponse,
	handleErrorResponse
);

export default collaborativeFilteringInstance;
