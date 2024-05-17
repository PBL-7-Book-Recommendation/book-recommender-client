export interface IBook {
	id: string;
	title: string;
	authors?: string[];
	description: string;
	price: number;
	imageUrl: string;
	averageRating: number;
	numberOfReviews: number;
	bookCover?: string;
	createdAt?: string;
	interactions?: [];
	language?: null;
	numberOfPages?: number;
	numberOfRatings?: number;
	publisher?: string;
	releaseDate?: string;
	source?: { id: number; name: string };
}
