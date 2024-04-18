import { Scheduler } from "./lib";
import { EVENTS } from "./events";
import { useRef } from "react";
import { SchedulerRef } from "./lib/types";

function App() {
  const calendarRef = useRef<SchedulerRef>(null);

  return (
    <Scheduler
      ref={calendarRef}
      month={null}
      agenda={false}
      day={null}
      disableViewer={true}
      draggable={false}
      onEventClick={(event) => {
        console.log("Event clicked", event);
      }}
      editable={false}
      week={{
        weekDays: [0, 1, 2, 3, 4, 5],
        weekStartOn: 6,
        startHour: 8,
        endHour: 20,
        step: 30,
      }}
      events={EVENTS}

      // events={generateRandomEvents(200)}
    />
  );
}

export default App;
