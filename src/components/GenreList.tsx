import useGenres from "@/hooks/useGenres";
import {
  Button,
  Heading,
  HStack,
  Image,
  List,
  Spinner,
} from "@chakra-ui/react";
import getCroppedImageUrl from "../services/image-url";
import useGameQueryStore from "@/store";

const GenreList = () => {
  const { data, isLoading, error } = useGenres();
  const selectedGenreId = useGameQueryStore((s) => s.gameQuery.genreId);
  const setSelectedGenreId = useGameQueryStore((s) => s.setGenreId);

  if (error) return null;

  if (isLoading) return <Spinner />;

  return (
    <>
      <Heading fontSize="2xl" marginBottom={3}>
        Genres
      </Heading>
      <Button
        onClick={() => setSelectedGenreId(undefined)}
        fontSize="sm"
        size="xl"
        variant="outline"
        width="156px"
        textWrap={"wrap"}
        marginBottom={1}
      >
        All Genres
      </Button>
      <List.Root variant="plain">
        {data?.results.map((genre) => (
          <List.Item key={genre.id} paddingY={1}>
            <HStack>
              <Image
                boxSize="48px"
                borderRadius={8}
                objectFit="cover"
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                onClick={() => setSelectedGenreId(genre.id)}
                fontSize="sm"
                size="xl"
                variant="outline"
                fontWeight={selectedGenreId === genre.id ? "bold" : "normal"}
                width={100}
                textWrap={"wrap"}
              >
                {genre.name}
              </Button>
            </HStack>
          </List.Item>
        ))}
      </List.Root>
    </>
  );
};

export default GenreList;
