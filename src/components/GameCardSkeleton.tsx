import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

// we are using gamecard skelleton to render some ui during our mouinting phase.
const GameCardSkeleton = () => {
  return (
    <Card>
      <Skeleton height="200px" />
      <CardBody>
        <SkeletonText />
      </CardBody>
    </Card>
  );
};

export default GameCardSkeleton;
