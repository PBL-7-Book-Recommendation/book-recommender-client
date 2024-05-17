import React, { useEffect, useState } from "react";
import {
	Box,
	Typography,
	Paper,
	Grid,
	Button,
	Rating,
	Divider,
	CardMedia,
} from "@mui/material";
import BookList from "../../components/BookList/BookList";
import { IBook } from "../../types";
import dayjs from "dayjs";
import { FALLBACK_IMAGE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { InteractionApi } from "../../services";

interface BookDetailProps {
	book: IBook;
}

const BookDetail = ({ book }: BookDetailProps) => {
	const [userRating, setUserRating] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const userInfo = useSelector((state: RootState) => state.auth.userInfo);

	useEffect(() => {
		const getCurrentUserInteractions = async () => {
			try {
				setLoading(true);
				const response =
					await InteractionApi.getCurrentUserInteractionsByBookId(
						book.id,
						userInfo.id
					);
				if (response.data?.data?.length > 0) {
					setUserRating(response.data.data[0].value);
				}
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
		};
		if (userInfo) {
			getCurrentUserInteractions();
		}
	}, [userInfo, book.id]);

	const handleRatingChange = (
		event: React.ChangeEvent<{}>,
		newValue: number | null
	) => {
		if (newValue !== null) {
			setUserRating(newValue);
		}
	};

	const handleRateBook = () => {
		const rateBook = async () => {
			try {
				setLoading(true);
				await InteractionApi.updateCurrentUserInteractionsByBookId({
					bookId: book.id,
					type: "RATING",
					value: userRating,
				});
			} catch (err) {
				console.log(err);
			} finally {
				setLoading(false);
			}
			console.log("hello");
		};
		if (userInfo && userRating > 0) {
			rateBook();
		}
	};

	return (
		<Box padding={3}>
			<Box padding={3}>
				<Paper elevation={3}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<CardMedia
								component="img"
								image={book.imageUrl}
								alt={book.title}
								style={{ width: "100%", height: "auto", padding: "1rem" }}
								onError={(e: any) => {
									/**
									 * Any code. For instance, changing the `src` prop with a fallback url.
									 * In our code, I've added `e.target.className = fallback_className` for instance.
									 */
									e.target.src = FALLBACK_IMAGE_URL;
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="h4">{book.title}</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								by{" "}
								{book.authors?.map((item, index) => (
									<span key={item.author.id}>
										{item.author.name}
										{book.authors && index < book.authors?.length - 1
											? ", "
											: ""}
									</span>
								))}
							</Typography>
							<Box display="flex" alignItems="center" marginY={1}>
								<Rating value={book.averageRating} readOnly precision={0.1} />
								<Typography
									variant="body2"
									color="textSecondary"
									marginLeft={1}
								>
									({book.averageRating}/5) ({book.numberOfRatings} rates) (
									{book.numberOfReviews} reviews)
								</Typography>
							</Box>
							<Typography variant="h5" color="primary">
								${book.price.toFixed(2)}
							</Typography>
							<Typography variant="body1" marginY={2}>
								{book.description}
							</Typography>
							<Box display={"flex"} alignItems={"center"} gap={"1rem"}>
								<Rating
									value={userRating ?? 0}
									onChange={handleRatingChange}
									precision={1}
								/>
								<Button
									variant="contained"
									color="primary"
									onClick={handleRateBook}
									disabled={loading}
								>
									Vote
								</Button>
							</Box>
							<Divider sx={{ padding: "1rem" }} />
							<Typography variant="h5" paddingY={2}>
								Additional information
							</Typography>
							{book.publisher && (
								<Typography variant="subtitle1" color="textSecondary">
									Published by: {book.publisher}
								</Typography>
							)}
							{book.releaseDate && (
								<Typography variant="subtitle1" color="textSecondary">
									Release date: {dayjs(book.releaseDate).format("DD/MM/YYYY")}
								</Typography>
							)}
							{book.bookCover && (
								<Typography variant="subtitle1" color="textSecondary">
									Book cover: {book.bookCover}
								</Typography>
							)}
							{book.numberOfPages && (
								<Typography variant="subtitle1" color="textSecondary">
									Number of pages: {book.numberOfPages}
								</Typography>
							)}
						</Grid>
					</Grid>
				</Paper>
			</Box>
			<BookList title={"Related books"} books={[]}></BookList>
		</Box>
	);
};

export default BookDetail;
