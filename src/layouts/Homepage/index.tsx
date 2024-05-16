import { Box, Typography } from "@mui/material";
import BookList from "../../components/BookList/BookList";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Homepage = () => {
	const accessToken = useSelector((state: RootState) => state.auth.accessToken);

	return (
		<Box maxWidth="lg" paddingY={"1rem"} margin={"auto"}>
			<Typography variant="h2" gutterBottom textAlign={"center"}>
				Welcome to BookHub
			</Typography>
			{accessToken && (
				<>
					<BookList title={"Recommended For You"}></BookList>
					<BookList title={"Because you liked Harry Potter"}></BookList>
				</>
			)}
			<BookList title={"Trending Books"}></BookList>
			<BookList title={"New Releases"}></BookList>
			<BookList title={"Top Rated"}></BookList>
			<BookList title={"Bestsellers"}></BookList>
		</Box>
	);
};

export default Homepage;
