import type { Meta, StoryObj } from "@storybook/react-vite";
import MovieDetails from "../features/movies/components/MovieDetails";
import type { Movie } from "../features/movies/schemas";


const meta: Meta<typeof MovieDetails> = {
  title: "Movies/MovieDetails",
  component: MovieDetails
};
export default meta;

type Story = StoryObj<typeof MovieDetails>;

const defaultMovie: Movie = {
  id: "123",
  title: "Inception",
  year: 2010,
  genre: "Sci-Fi",
  category: "Hollywood",
  description:
    "A thief who steals corporate secrets through dream-sharing technology.",
  distribution: "Warner Bros",
  coverPhoto: "https://fzmovies.live/imdb_images/Inception.jpg",
  url: "https://fzmovies.live/movie-Inception--hmp4.htm",
};


export const Default: Story = {
  args: {
    movie: defaultMovie
  }
}