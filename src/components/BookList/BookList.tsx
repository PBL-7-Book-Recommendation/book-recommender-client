import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
	desktop: {
		breakpoint: { max: 5000, min: 1024 },
		items: 4,
		slidesToSlide: 3, // optional, default to 1.
	},
	tablet: {
		breakpoint: { max: 1024, min: 464 },
		items: 2,
		slidesToSlide: 2, // optional, default to 1.
	},
	mobile: {
		breakpoint: { max: 464, min: 0 },
		items: 1,
		slidesToSlide: 1, // optional, default to 1.
	},
};

interface Book {
	title: string;
	author: string;
	imageUrl: string;
}

const books: Book[] = [
	{
		title: "The Hitchhiker's Guide",
		author: "Douglas Adams",
		imageUrl:
			"https://images.unsplash.com/photo-1612969308146-066d55f37ccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "To Kill a Mockingbird",
		author: "Harper Lee",
		imageUrl:
			"https://images.unsplash.com/photo-1612969308146-066d55f37ccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Pride and Prejudice",
		author: "Jane Austen",
		imageUrl:
			"https://images.unsplash.com/photo-1612969308146-066d55f37ccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Pride and Prejudice 2",
		author: "Jane Austen",
		imageUrl:
			"https://images.unsplash.com/photo-1612969308146-066d55f37ccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		title: "Pride and Prejudice 2",
		author: "Jane Austen",
		imageUrl:
			"https://images.unsplash.com/photo-1612969308146-066d55f37ccb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];

const BookList = ({ title }: any) => {
	return (
		<>
			<Box marginY={"2rem"}>
				<Typography
					variant="h5"
					fontWeight={"500"}
					paddingLeft={1}
					paddingBottom={3}
				>
					{title}
				</Typography>
				<Carousel responsive={responsive}>
					{books.map((book) => (
						<Card sx={{ px: 1 }}>
							<Link to={`/books/${book.title}`} style={{ color: "black" }}>
								<CardMedia
									component="img"
									image={book.imageUrl}
									alt={book.title}
									height="200"
								/>
								<CardContent>
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
									<Typography variant="body2" color="text.secondary">
										{book.author}
									</Typography>
								</CardContent>
							</Link>
						</Card>
					))}
				</Carousel>
			</Box>
			<Divider />
		</>
	);
};

export default BookList;
