import { Box, Text, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";

const defaultSkeletonArr: number[] = [...Array(10)];

export default function GitHubProjects({ repositories }: { repositories: any }) {
  const [expandRepos, setExpandRepos] = useState<boolean>(false);
  const [s, setS] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setS(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!repositories || s) {
    return (
      <GridContainer>
        {defaultSkeletonArr.map((u, i) => (
          <SkeletonCard key={`${u}_${i}`} />
        ))}
      </GridContainer>
    );
  }

  return (
    <GridContainer>
      {repositories.slice(0, expandRepos ? repositories?.length : 10).map((repo: any) => (
        <ProjectCard repo={repo} key={repo.id} />
      ))}
      <Box
        as="button"
        position="absolute"
        w="300px"
        bg="gray.100"
        left="0"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="0px 0px 10px 5px #EDF2F7"
        h="50px"
        bottom="0"
        opacity="0.5"
        borderRadius="15px"
        right="0"
        margin="0 auto"
        color="gray.500"
        transition="0.15s ease"
        _hover={{
          opacity: "1",
          bg: "black",
          color: "white",
        }}
        _active={{ transform: "scale(0.95)" }}
        onClick={() => setExpandRepos((prevState) => !prevState)}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridGap="0.5rem"
          cursor="inherit"
          fontWeight="semibold"
        >
          {expandRepos ? "Show less" : "Show more..."}
          <Text fontSize="1.5rem">{expandRepos ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</Text>
        </Box>
      </Box>
    </GridContainer>
  );
}

function GridContainer({children}: {children: JSX.Element | any}) {
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="masonry"
      justifyContent="center"
      w="100%"
      position="relative"
      gap="0 0.5rem"
    >
      {children}
    </Grid>
  )
}
