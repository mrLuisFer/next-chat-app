import { Box, Skeleton, SkeletonCircle, SkeletonText, Text, Link, Grid, GridItem, ScaleFade } from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";
import { BiLinkExternal } from "react-icons/bi";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

export default function GitHubProjects({ ghUserData }: { ghUserData: any }) {
  const [expandRepos, setExpandRepos] = useState<boolean>(false);

  if (!ghUserData) return <ProjectsCarrouselSkeleton />;

  // console.log(ghUserData);
  const repositories = ghUserData;
  return (
    <>
      <Grid
        templateColumns="repeat(4, 1fr)"
        templateRows="masonry"
        justifyContent="center"
        w="100%"
        position="relative"
      >
        {repositories.slice(0, expandRepos ? repositories?.length : 10).map((repo: any) => (
          <GridItem
            key={repo.id}
            maxWidth="310px"
            m="1rem 0"
            _hover={{ bg: "gray.50" }}
            p="0.8rem 0.5rem"
            borderRadius="8px"
            transition="0.15s ease-in-out"
            h="fit-content"
          >
            <ScaleFade key={`${repo.id}_${repo.name}`} in={true}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" gridGap="0.5rem" mb="0.7rem">
                  <Box fontSize="1.7rem">
                    <GoMarkGithub />
                  </Box>
                  <Text maxWidth="250px" noOfLines={1} textTransform="capitalize">
                    {repo.name}
                  </Text>
                </Box>
                <Link
                  href={repo.html_url}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontSize="1.3rem"
                  m="0"
                  p="0"
                >
                  <BiLinkExternal />
                </Link>
              </Box>
              <Box>
                <Text textAlign="left">{repo.description}.</Text>
              </Box>
            </ScaleFade>
          </GridItem>
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
            _hover={{ color: "gray.800" }}
            onClick={() => setExpandRepos((prevState) => !prevState)}
          >
            {expandRepos ? "Collapse" : "Expand"}
            <Text fontSize="1.5rem">{expandRepos ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</Text>
          </Box>
        </Box>
      </Grid>
    </>
  );
}

function ProjectsCarrouselSkeleton() {
  return (
    <Box
      maxWidth="320px"
      m="1rem 0"
      _hover={{ bg: "gray.50" }}
      p="0.8rem 0.5rem"
      borderRadius="8px"
      transition="0.15 ease-in-out"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box display="flex" alignItems="center" gridGap="1rem">
          <SkeletonCircle size="10" />
          <Skeleton height="10px" w="120px">
            Lorem ipsuaas dolor
          </Skeleton>
        </Box>
        <SkeletonCircle size="5" />
      </Box>
      <SkeletonText noOfLines={3} mt="1rem" />
    </Box>
  );
}
