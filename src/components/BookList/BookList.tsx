import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Divider,
	Grid,
	Skeleton,
	Tooltip,
	Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { IBook } from "../../types";
import { FALLBACK_IMAGE_URL } from "../../constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { InteractionApi } from "../../services";
import { useCallback } from "react";

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
	const userId = useSelector((state: RootState) => state.auth.userInfo?.id);

	const handleBookClick = useCallback(
		(bookId: string) => {
			const clickBook = async (type: string) => {
				try {
					await InteractionApi.updateCurrentUserInteractionsByBookId({
						bookId,
						type,
					});
				} catch (err) {
					console.log(err);
				}
			};
			if (title === "Recommended For You" && userId) {
				clickBook("VIEW_COLLABORATIVE");
			}
			if (title === "Related books" && userId) {
				clickBook("VIEW_CONTENT_BASED");
			}
		},
		[title, userId]
	);

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
				{books.length === 0 ? (
					<Grid container spacing={2}>
						{[...Array(4)].map((_, index) => (
							<Grid item xs={12} md={3} key={index}>
								<Card style={{ padding: "0.25rem" }}>
									<Skeleton variant="rectangular" height={200} />
									<Skeleton />
									<Skeleton width="60%" />
								</Card>
							</Grid>
						))}
					</Grid>
				) : (
					<Carousel responsive={responsive}>
						{books.map((book) => (
							<Card
								sx={{ px: 1 }}
								key={book.id}
								onClick={() => handleBookClick(book.id)}
							>
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
										<Typography
											variant="body2"
											color="text.secondary"
											sx={{
												width: "250px",
												whiteSpace: "nowrap",
												overflow: "hidden",
												textOverflow: "ellipsis",
											}}
										>
											{book.authors?.map((item, index) => (
												<span key={item.author.id}>
													{item.author.name}
													{book.authors && index < book.authors?.length - 1
														? ", "
														: ""}
												</span>
											))}
										</Typography>
									</CardContent>
								</Link>
							</Card>
						))}
					</Carousel>
				)}
			</Box>
			<Divider />
		</>
	);
};

export default BookList;
