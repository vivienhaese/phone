import React, { useCallback } from "react";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@apollo/client";
import { Call } from "../model/models";
import {
  Button,
  CallInboundFilled,
  CallOutboundFilled,
  Divider,
  Flex,
  Icon,
  Typography,
} from "@aircall/tractor";
import { ARCHIVE_CALL, CALL } from "../model/gql";

function Details() {
  let { callId }: { callId: string } = useParams();
  const { loading, data, error } = useQuery(CALL, {
    variables: { id: callId },
  });
  const [archiveCall] = useMutation(ARCHIVE_CALL, {
    onCompleted({ archiveCall }) {
      console.log(`${archiveCall} call archived`);
    },
  });

  const call: Call = data?.call;

  // Component events
  const onArchiveClicked = useCallback(() => {
    archiveCall({
      variables: { id: call.id },
    });
  }, [archiveCall, call]);

  if (error) console.log(loading, call, error);
  // Loading state
  if (loading || !call) return <h4>Loading call...</h4>;
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
    >
      <Icon
        component={
          call.direction === "inbound" ? CallInboundFilled : CallOutboundFilled
        }
        color="primary.base"
        size={60}
        marginBottom="12px"
      />
      <Typography variant="heading">From: {call.from}</Typography>
      <Typography variant="heading">To: {call.to}</Typography>
      <Typography variant="overline2">
        {new Date(call.created_at).toLocaleString()}
      </Typography>

      <Divider orientation="horizontal" size="small" marginY="20px"></Divider>

      <Typography variant="heading" marginBottom="6px">
        Notes
      </Typography>
      {call.notes.length ? (
        call.notes.map((note) => (
          <Typography key={`call_${call.id}_note_${note.id}`} variant="body">
            {note.content}
          </Typography>
        ))
      ) : (
        <Typography variant="overline2">Aucune note pour le moment</Typography>
      )}

      <Divider orientation="horizontal" size="small" marginY="20px"></Divider>

      {call.is_archived ? (
        <Typography variant="overline2">Call archived</Typography>
      ) : (
        <Button variant="warning" onClick={onArchiveClicked}>
          Archive call
        </Button>
      )}
    </Flex>
  );
}

export default Details;
