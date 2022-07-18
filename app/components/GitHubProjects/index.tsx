import { Box, Text, Grid } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ProjectCard from "./ProjectCard";
import SkeletonCard from "./SkeletonCard";

export default function GitHubProjects({ ghUserData }: { ghUserData: any }) {
  const [expandRepos, setExpandRepos] = useState<boolean>(false);
  const [s, setS] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setS(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!ghUserData || s) {
    const defaultSkeletonArr: number[] = [...Array(10)];

    return (
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="masonry"
        justifyContent="center"
        w="100%"
        position="relative"
        id="projects"
        gap="0 0.5rem"
      >
        {defaultSkeletonArr.map((u, i) => (
          <SkeletonCard key={`${u}_${i}`} />
        ))}
      </Grid>
    );
  }

  // console.log(ghUserData);
  const repositories = ghUserData;
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      templateRows="masonry"
      justifyContent="center"
      w="100%"
      position="relative"
      id="projects"
      gap="0 0.5rem"
    >
      {repositories.slice(0, expandRepos ? repositories?.length : 10).map((repo: any) => (
        <ProjectCard repo={repo} key={repo.id} />
      ))}

      <Box
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
        transition="0.15s ease-in-out"
        _hover={{
          opacity: "0.8",
        }}
      >
        <Box
          as="button"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridGap="0.5rem"
          color="gray.500"
          transition="0.15s ease-in-out"
          cursor="default"
          _hover={{ color: "gray.800" }}
          onClick={() => setExpandRepos((prevState) => !prevState)}
        >
          {expandRepos ? "Collapse" : "Expand"}
          <Text fontSize="1.5rem">{expandRepos ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</Text>
        </Box>
      </Box>
    </Grid>
  );
}
