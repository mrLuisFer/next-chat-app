import { Box, Skeleton, SkeletonCircle, SkeletonText, Text, Grid } from "@chakra-ui/react";

export default function SkeletonCard() {
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
