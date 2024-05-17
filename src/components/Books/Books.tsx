import React from "react";
import { IBook } from "../../types";
import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	Tooltip,
	Typography,
} from "@mui/material";
import { FALLBACK_IMAGE_URL } from "../../constants";
import { Link } from "react-router-dom";

interface BooksProps {
	books: IBook[];
}

const Books = ({ books }: BooksProps) => {
	return (
		<Grid container spacing={2}>
			{books.map((book) => (
				<Grid item xs={12} md={3} key={book.id}>
					<Card>
						<Link to={`/books/${book.id}`} style={{ color: "black" }}>
							<CardMedia
								component="img"
								image={book.imageUrl}
								alt={book.title}
								height="200"
								onError={(e: any) => {
									/**
									 * Any code. For instance, changing the `src` prop with a fallback url.
									 * In our code, I've added `e.target.className = fallback_className` for instance.
									 */
									e.target.src = FALLBACK_IMAGE_URL;
								}}
							/>
							<CardContent>
								<Tooltip title={book.title} placement="top">
									<Typography
										variant="h5"
										sx={{
											width: "250px",
											whiteSpace: "nowrap",
											overflow: "hidden",
											textOverflow: "ellipsis",
										}}
									>
										{book.title}
									</Typography>
								</Tooltip>
								<Typography variant="subtitle1">{book.authors}</Typography>
							</CardContent>
						</Link>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};

export default Books;
