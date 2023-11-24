import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GetDetailMovie from "../../utils/networks/GetDetailMovie";

export default function SplitWithImage(props) {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);

  const url_image = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;

  const getDetail = async (id) => {
    const data = await GetDetailMovie(id);
    await setMovie(data);
    await setGenres(data.genres);
  };

  useEffect(() => {
    getDetail(id);
  }, [id]);

  console.log(movie);

  return (
    <Container maxW={"5xl"} py={12} marginTop={'75px'} marginBottom={'85px'}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            color={"blue.400"}
            fontWeight={600}
            fontSize={"sm"}
            bg={useColorModeValue("blue.50", "blue.900")}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Deskripsi
          </Text>
          <Heading fontSize={"45px"}>{movie.title}</Heading>
          <Text color={"gray.500"} fontSize={"30px"}>
            {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}
          </Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            Duration: {movie.runtime} min
          </Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            Release: {movie.release_date}
          </Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            Popularity: {movie.popularity}
          </Text>
          <Text color={"gray.500"} fontSize={"lg"}>
            {movie.overview}
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          ></Stack>
        </Stack>
        <Flex>
          <Image
            rounded={"md"}
            alt={"feature image"}
            src={url_image}
            objectFit={"cover"}
          />
        </Flex>
      </SimpleGrid>
    </Container>
  );
}
