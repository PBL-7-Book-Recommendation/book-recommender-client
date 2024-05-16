import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { createBrowserRouter, Navigate, useParams } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Login } from "../pages/Login";
import BaseTemplate from "../templates/base.template";
import Homepage from "../layouts/Homepage";
import BookDetail from "../layouts/BookDetail";
import { useEffect, useState } from "react";
import { BookApi } from "../services";
import { IBook } from "../types";
import { Box, CircularProgress } from "@mui/material";
import AboutUs from "../layouts/AboutUs";
import BookShelves from "../layouts/BookShelves";

const LoginWrapper = () => {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken);
	if (accessToken) {
		return <Navigate to={"/home-page"} replace={true} />;
	}
	return <Login />;
};

const BookDetailWrapper = () => {
	const { bookId } = useParams();
	const [book, setBook] = useState<IBook | null>(null);

	useEffect(() => {
		const getBook = async () => {
			try {
				const response = await BookApi.getBookById(bookId || "");
				if (response?.data) setBook(response?.data);
			} catch (err) {
				console.log(err);
				setBook({
					id: "1",
					title: "The Lord of the Rings",
					author: "J. R. R. Tolkien",
					description:
						"An epic high-fantasy trilogy recounting the quest to destroy the One Ring, forged by the Dark Lord Sauron, which threatens to engulf Middle-earth in darkness.",
					price: 24.99,
					imageUrl:
						"https://images.unsplash.com/photo-1612969308146-066d55f37ccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					rating: 4.8,
					reviews: 1287,
				});
			}
		};
		getBook();
	}, [bookId]);

	if (!book) {
		return (
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return <BookDetail book={book} />;
};

export const router = createBrowserRouter([
	{
		element: <BaseTemplate />,
		children: [
			{
				index: true,
				path: "/",
				element: <Navigate to={"/home-page"} replace={true} />,
			},
			{
				path: "home-page",
				element: <Homepage />,
			},
			{
				path: "books/:bookId",
				element: <BookDetailWrapper />,
			},
			{
				path: "bookshelves",
				element: <BookShelves />,
			},
			{
				path: "about-us",
				element: <AboutUs />,
			},
		],
	},
	{
		path: "login",
		element: <LoginWrapper />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
]);
