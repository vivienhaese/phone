import { Skeleton, Spacer } from "@aircall/tractor";

type LoadingCallListProps = {
  callNumber: number;
};

export const ARCHIVED_OPACITY = 0.35;

function LoadingCallList({ callNumber }: LoadingCallListProps) {
  return (
    <Spacer direction="vertical" space="s" justifyContent="flex-start">
      <Skeleton width={128} height={24} />
      {Array.from(Array(callNumber).keys()).map((value, index) => (
        <Skeleton key={`callListSkeleton_${index}`} width={250} height={50} />
      ))}
    </Spacer>
  );
}

export default LoadingCallList;
