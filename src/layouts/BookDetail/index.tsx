import React from "react";
import { Box, Typography, Paper, Grid, Button, Rating } from "@mui/material";
import BookList from "../../components/BookList/BookList";
import { IBook } from "../../types";

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
								by {book.author}
							</Typography>
							<Box display="flex" alignItems="center" marginY={1}>
								<Rating value={book.rating} readOnly />
								<Typography
									variant="body2"
									color="textSecondary"
									marginLeft={1}
								>
									({book.reviews} reviews)
								</Typography>
							</Box>
							<Typography variant="h5" color="primary">
								${book.price.toFixed(2)}
							</Typography>
							<Typography variant="body1" marginY={2}>
								{book.description}
							</Typography>
							<Button variant="contained" color="primary">
								Add to Cart
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Box>
			<BookList title={"Related books"}></BookList>
		</Box>
	);
};

export default BookDetail;
