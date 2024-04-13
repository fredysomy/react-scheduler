import { Fragment, MouseEvent, useMemo, useState } from "react";
import { Typography, ButtonBase, useTheme } from "@mui/material";
import { format } from "date-fns";
import { ProcessedEvent } from "../../types";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import { EventItemPaper } from "../../styles/styles";
import { differenceInDaysOmitTime, getHourFormat } from "../../helpers/generals";
import useStore from "../../hooks/useStore";
import useDragAttributes from "../../hooks/useDragAttributes";
import EventItemPopover from "./EventItemPopover";
import useEventPermissions from "../../hooks/useEventPermissions";
import "../../styles/custom-styles.css";

import Button from "@mui/material/Button";
import { styled } from "@mui/system";

interface EventItemProps {
  event: ProcessedEvent;
  multiday?: boolean;
  hasPrev?: boolean;
  hasNext?: boolean;
  showdate?: boolean;
}

const EventItem = ({ event, multiday, hasPrev, hasNext, showdate = true }: EventItemProps) => {
  const { direction, locale, hourFormat, eventRenderer, onEventClick, view, disableViewer } =
    useStore();
  const dragProps = useDragAttributes(event);
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const theme = useTheme();
  const hFormat = getHourFormat(hourFormat);

  const NextArrow = direction === "rtl" ? ArrowLeftRoundedIcon : ArrowRightRoundedIcon;
  const PrevArrow = direction === "rtl" ? ArrowRightRoundedIcon : ArrowLeftRoundedIcon;
  const hideDates = differenceInDaysOmitTime(event.start, event.end) <= 0 && event.allDay;

  const { canDrag } = useEventPermissions(event);

  const triggerViewer = (el?: MouseEvent<Element>) => {
    if (!el?.currentTarget && deleteConfirm) {
      setDeleteConfirm(false);
    }
    setAnchorEl(el?.currentTarget || null);
  };
  const CustomTypography = styled(Typography)({
    fontFamily: "Baloo Chettan 2, sans-serif",
    color: "#333",
  });
  const CustomButton = styled(Button)({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    whiteSpace: "nowrap",
    fontSize: "12px", // 14px assuming 16px to be 1rem
    height: "22x", // 2.5rem equivalent assuming 1rem = 16px
    backgroundColor: "#00BFFF",
    color: "white",
    fontWeight: 500,
    padding: "8px 16px", // 0.5rem 1rem equivalent

    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    "&:hover": {
      backgroundColor: "#009ACD",
    },
    "&.Mui-disabled": {
      pointerEvents: "none",
      opacity: 0.5,
    },
    transition: "color 0.15s ease-in-out, background-color 0.15s ease-in-out",
  });
  const renderEvent = useMemo(() => {
    // Check if has custom render event method
    // only applicable to non-multiday events and not in month-view
    if (typeof eventRenderer === "function" && view !== "month") {
      const custom = eventRenderer({ event, onClick: triggerViewer, ...dragProps });
      if (custom) {
        return (
          <EventItemPaper key={`${event.start.getTime()}_${event.end.getTime()}_${event.event_id}`}>
            {custom}
          </EventItemPaper>
        );
      }
    }

    let item = (
      <>
        <div style={{ padding: "3px 6px" }}>
          <CustomTypography
            variant="subtitle2"
            style={{ fontSize: 25, fontFamily: " Baloo Chettan 2, sans-serif" }}
            noWrap
          >
            {event.title}
          </CustomTypography>
          <CustomTypography variant="subtitle2" style={{ fontSize: 12 }} noWrap>
            {new Date(event.start).getDate().toString() ===
              new Date(event.end).getDate().toString() &&
            new Date(event.start).toLocaleString("en-us", { month: "short" }) ===
              new Date(event.end).toLocaleString("en-us", { month: "short" })
              ? `${new Date(event.start).toLocaleString("en-us", { month: "short" })}-${new Date(
                  event.start
                )
                  .getDate()
                  .toString()}`
              : `${new Date(event.start).toLocaleString("en-us", { month: "short" })} - ${new Date(
                  event.start
                )
                  .getDate()
                  .toString()}`}
          </CustomTypography>
          {showdate && (
            <CustomTypography style={{ fontSize: 11 }} noWrap>
              {`${format(event.start, hFormat, {
                locale,
              })} - ${format(event.end, hFormat, { locale })}`}
            </CustomTypography>
          )}
        </div>
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 5,
            left: 5,
          }}
        >
          <CustomButton variant="contained" size="small">
            View Meeting
          </CustomButton>
        </div>
      </>
    );
    if (multiday) {
      item = (
        <div
          style={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ fontSize: 11 }} noWrap>
            {hasPrev ? (
              <PrevArrow fontSize="small" sx={{ display: "flex" }} />
            ) : (
              showdate && !hideDates && format(event.start, hFormat, { locale })
            )}
          </Typography>
          <Typography variant="subtitle2" align="center" sx={{ fontSize: 12 }} noWrap>
            {event.title}
          </Typography>
          <Typography sx={{ fontSize: 11 }} noWrap>
            {hasNext ? (
              <NextArrow fontSize="small" sx={{ display: "flex" }} />
            ) : (
              showdate && !hideDates && format(event.end, hFormat, { locale })
            )}
          </Typography>
        </div>
      );
    }
    return (
      <EventItemPaper
        key={`${event.start.getTime()}_${event.end.getTime()}_${event.event_id}`}
        disabled={event.disabled}
        sx={{
          bgcolor: "#DBF3FB",
          color: "black",
          ...(event.sx || {}),
        }}
      >
        <ButtonBase
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!disableViewer) {
              triggerViewer(e);
            }
            if (typeof onEventClick === "function") {
              onEventClick(event);
            }
          }}
          focusRipple
          tabIndex={disableViewer ? -1 : 0}
          disableRipple={disableViewer}
          disabled={event.disabled}
        >
          <div {...dragProps} draggable={canDrag}>
            {item}
          </div>
        </ButtonBase>
      </EventItemPaper>
    );
    // eslint-disable-next-line
  }, [hasPrev, hasNext, event, canDrag, locale, theme.palette]);

  return (
    <Fragment>
      {renderEvent}

      {/* Viewer */}
      <EventItemPopover anchorEl={anchorEl} event={event} onTriggerViewer={triggerViewer} />
    </Fragment>
  );
};

export default EventItem;
