import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Tooltip,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IBook } from "../../types";
import { FALLBACK_IMAGE_URL } from "../../constants";

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
interface BookListProps {
	title: string;
	books: IBook[] | [];
}

const BookList = ({ title, books }: BookListProps) => {
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
						<Card sx={{ px: 1 }} key={book.id}>
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
									<Typography variant="body2" color="text.secondary">
										{book.authors}
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
