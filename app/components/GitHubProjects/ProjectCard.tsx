import { Box, Text, Link, GridItem, ScaleFade, Fade, useBoolean } from "@chakra-ui/react";
import { GoMarkGithub } from "react-icons/go";
import { BiLinkExternal } from "react-icons/bi";

const ProjectCard = ({ repo }: { repo: any }) => {
  const [flag, setFlag] = useBoolean();
  return (
    <GridItem
      key={repo.id}
      maxWidth="310px"
      m="1rem 0"
      p="0.8rem 0.5rem"
      borderRadius="8px"
      transition="0.15s ease-in-out"
      onMouseEnter={setFlag.on}
      onMouseLeave={setFlag.off}
      h="fit-content"
      _hover={{ bg: "gray.50", transform: "scale(1.03)", boxShadow: "0.5px 0.5px 6px rgba(0, 0, 0, 0.1)" }}
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
          <Fade in={flag}>
            <Link
              href={repo.html_url}
              display="flex"
              alignItems="flex-start"
              justifyContent="center"
              fontSize="1.3rem"
              m="0"
              p="0"
              _hover={{
                color: "blue.500",
              }}
            >
              <BiLinkExternal />
            </Link>
          </Fade>
        </Box>
        <Box>
          <Text textAlign="left">{repo.description}.</Text>
        </Box>
      </ScaleFade>
    </GridItem>
  );
};

export default ProjectCard;
