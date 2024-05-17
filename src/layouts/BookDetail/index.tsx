import React from "react";
import {
	Box,
	Typography,
	Paper,
	Grid,
	Button,
	Rating,
	Divider,
} from "@mui/material";
import BookList from "../../components/BookList/BookList";
import { IBook } from "../../types";
import dayjs from "dayjs";

interface BookDetailProps {
	book: IBook;
}

const BookDetail = ({ book }: BookDetailProps) => {
	return (
		<Box padding={3}>
			<Box padding={3}>
				<Paper elevation={3}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<img
								src={book.imageUrl}
								alt={book.title}
								style={{ width: "100%", height: "auto", padding: "1rem" }}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant="h4">{book.title}</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								by {book.authors}
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
							<Button variant="contained" color="primary">
								Vote
							</Button>
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
