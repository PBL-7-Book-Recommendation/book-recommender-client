import instance from "./../config";
import contentBasedInstance from "./../config/content-based-config";

type BookSearchType = {
	page: number;
	perPage: number;
	search?: string;
	languages?: string;
	price?: string;
	averageRating?: string;
	order?: string;
};

const getBooks = (params: BookSearchType) => {
	return instance.get("/books", {
		params: params,
	});
};

const getContentBasedRecommendedBooks = (id: string) => {
	return contentBasedInstance.get(`/content-based-recommend/${id}`);
};

const getBookById = (id: string) => {
	return instance.get(`/books/${id}`);
};

const deleteBookById = (id: string) => {
	return instance.delete(`/books/${id}`);
};

export const BookApi = {
	getBooks,
	getContentBasedRecommendedBooks,
	getBookById,
	deleteBookById,
};
