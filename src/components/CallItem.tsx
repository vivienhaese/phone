import React from "react";
import {
  Box,
  CallInboundFilled,
  CallOutboundFilled,
  Flex,
  Icon,
  Typography,
} from "@aircall/tractor";
import { Call } from "../model/models";

type CallItemProps = {
  call: Call;
};

export const ARCHIVED_OPACITY = 0.35;

function CallItem({ call }: CallItemProps) {
  const inboundCall = call.direction === "inbound";
  return (
    <Box
      boxShadow={1}
      borderRadius={8}
      height="50px"
      width="250px"
      paddingX="12px"
      paddingY="6px"
      cursor="pointer"
      className="call-item"
      opacity={call.is_archived ? ARCHIVED_OPACITY : 1}
    >
      <Flex flexDirection="row" alignItems="center" justifyContent="flex-start">
        <Icon
          component={inboundCall ? CallInboundFilled : CallOutboundFilled}
          color="primary.base"
          marginRight="12px"
          size={36}
        />
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Typography textAlign="left">
            {inboundCall ? call.from : call.to}
          </Typography>
          <Typography textAlign="left" color="secondary.base" fontSize=".85em">
            {new Date(call.created_at).toLocaleTimeString()}
          </Typography>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CallItem;
