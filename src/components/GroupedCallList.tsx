import { Checkbox, Spacer, Typography } from "@aircall/tractor";
import { Fragment } from "react";
import { NavLink, useRouteMatch } from "react-router-dom";
import { Call } from "../model/models";
import { SelectedCalls } from "../pages/Home";
import CallItem from "./CallItem";

type GroupedCalls = {
  [key: string]: Call[];
};

type GroupedCallListProps = {
  calls: Call[];
  isSelectionActive: boolean;
  selectedCalls: SelectedCalls;
  onCallSelected: (selectedCalls: SelectedCalls) => void;
};

function GroupedCallList({
  calls,
  isSelectionActive,
  selectedCalls,
  onCallSelected,
}: GroupedCallListProps) {
  const { path } = useRouteMatch();
  const groupedCalls = [...calls]
    .sort((a, b) => {
      return b.created_at.localeCompare(a.created_at);
    })
    .reduce((groups, call) => {
      const date = call.created_at.split("T")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(call);
      return groups;
    }, {} as GroupedCalls);

  const sortedDates = Object.keys(groupedCalls).sort((a, b) =>
    b.localeCompare(a)
  );

  return (
    <Fragment>
      {sortedDates.map((date) => (
        <Fragment key={`datesListItem_${date}`}>
          <Typography variant="caption" marginBottom="4px">
            {new Date(date).toLocaleDateString()}
          </Typography>
          <Spacer direction="vertical" space="xs">
            {groupedCalls[date].map((call) => (
              <Spacer
                direction="horizontal"
                key={`callListItem_${call.id}`}
                space="xs"
                alignItems="center"
              >
                {isSelectionActive ? (
                  <Checkbox
                    checked={!!selectedCalls[call.id]}
                    disabled={call.is_archived}
                    id={`selectCallCheckbox_${call.id}`}
                    onChange={(checked) => {
                      onCallSelected({
                        ...selectedCalls,
                        [call.id]: checked,
                      });
                    }}
                  ></Checkbox>
                ) : null}
                <NavLink to={`${path}/${call.id}`} activeClassName={"selected"}>
                  <CallItem call={call}></CallItem>
                </NavLink>
              </Spacer>
            ))}
          </Spacer>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default GroupedCallList;
