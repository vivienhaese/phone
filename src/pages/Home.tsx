import React, { useCallback, useState } from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

import Details from "./Details";
import { Call, ID } from "../model/models";
import { Button, Flex, Grid, Spacer, Typography } from "@aircall/tractor";
import GroupedCallList from "../components/GroupedCallList";
import { ARCHIVE_CALL, PAGINATED_CALLS } from "../model/gql";
import LoadingCallList from "../components/LoadingCallList";

export type SelectedCalls = {
  [key: ID]: boolean;
};

const LIMIT = 10;

function Home() {
  const { path } = useRouteMatch();
  const [offset, setOffset] = useState(0);
  const [isSelectionActive, setSelectionActive] = useState(false);
  const [selectedCalls, setSelectedCalls] = useState<SelectedCalls>({});

  // Load calls
  const { loading, data } = useQuery(PAGINATED_CALLS, {
    variables: { offset, limit: LIMIT },
  });

  // grouped Calls
  const calls: Call[] = data?.paginatedCalls?.nodes || [];

  // Pagination
  const hasNextPage: boolean = data?.paginatedCalls?.hasNextPage || false;
  const onNextCallsClicked = useCallback(() => {
    setOffset(offset + LIMIT);
  }, [offset]);
  const onPreviousCallsClicked = useCallback(() => {
    setOffset(offset - LIMIT);
  }, [offset]);

  // Selection status
  const itemSelectedCount = Object.keys(selectedCalls).reduce((count, key) => {
    return count + (selectedCalls[key] ? 1 : 0);
  }, 0);

  // Archive multiple calls
  const [archiveCall] = useMutation(ARCHIVE_CALL, {
    onCompleted({ archiveCall }) {
      console.log(`${archiveCall} call archived`);
    },
  });

  // Component events
  const onArchiveClicked = useCallback(() => {
    Object.keys(selectedCalls).forEach((id) => {
      if (selectedCalls[id]) {
        archiveCall({
          variables: { id },
        });
      }
    });
    // Clean selection
    setSelectedCalls({});
    setSelectionActive(false);
  }, [archiveCall, selectedCalls]);

  return (
    <Grid gridTemplateColumns="max-content auto" gridGap={3}>
      <Flex
        bg="base.white"
        alignItems="center"
        justifyContent="center"
        width="300px"
        p={3}
      >
        <Spacer direction="vertical" space="s" justifyContent="center">
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="displayM">Calls</Typography>
            <Button
              size="xSmall"
              onClick={() => {
                if (isSelectionActive) {
                  setSelectedCalls({});
                }
                setSelectionActive(!isSelectionActive);
              }}
            >
              {isSelectionActive ? "Cancel" : "Select calls"}
            </Button>
          </Flex>

          <Flex justifyContent="center">
            {isSelectionActive ? (
              itemSelectedCount ? (
                <Button
                  variant="warning"
                  size="xSmall"
                  onClick={onArchiveClicked}
                >
                  Archive {itemSelectedCount + " "}
                  {itemSelectedCount === 1 ? "call" : "calls"}
                </Button>
              ) : (
                <Typography>Select at least one call to archive</Typography>
              )
            ) : null}
          </Flex>

          {loading ? (
            // Calls not loaded yet, display a date and X skeletons while user waits
            <LoadingCallList callNumber={10}></LoadingCallList>
          ) : (
            // Calls loaded, display calls by dates
            <GroupedCallList
              calls={calls}
              isSelectionActive={isSelectionActive}
              selectedCalls={selectedCalls}
              onCallSelected={(selectedCalls) =>
                setSelectedCalls(selectedCalls)
              }
            ></GroupedCallList>
          )}

          <Flex flexDirection="row" justifyContent="space-between">
            {offset !== 0 ? (
              <Button onClick={onPreviousCallsClicked}>Previous</Button>
            ) : (
              <Flex></Flex>
            )}
            {hasNextPage ? (
              <Button onClick={onNextCallsClicked}>Next</Button>
            ) : (
              <Flex></Flex>
            )}
          </Flex>
        </Spacer>
      </Flex>

      <Flex alignItems="center" justifyContent="center" p={3}>
        <Switch>
          <Route exact path={path}>
            <h4>Select a call to view details.</h4>
          </Route>
          <Route path={`${path}/:callId`}>
            <Details></Details>
          </Route>
        </Switch>
      </Flex>
    </Grid>
  );
}

export default Home;
