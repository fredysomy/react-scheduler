import { ProcessedEvent } from "./lib/types";

export const EVENTS: ProcessedEvent[] = [
  {
    event_id: 1,
    title: "Event 1 (Disabled)",
    room: "room2",
    start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    disabled: true,
    draggable: false,
  },
  {
    event_id: 2,
    title: "Event 2",
    room: "room2",
    start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
    end: new Date(new Date(new Date().setHours(10)).setMinutes(30)),
    admin_id: 2,
    color: "#50b500",
    draggable: false,
    agendaAvatar: "E",
  },

  {
    event_id: 5,
    title: "Event 5",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(new Date().getDate() - 2)
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(new Date().getDate() - 2)
    ),
    admin_id: 2,
    room: "room2",
    draggable: false,
    editable: true,
  },
  {
    event_id: 6,
    title: "Event 6",
    room: "room2",
    start: new Date(
      new Date(new Date(new Date().setHours(20)).setMinutes(30)).setDate(new Date().getDate() - 3)
    ),
    end: new Date(new Date(new Date().setHours(23)).setMinutes(0)),
    admin_id: 2,
    sx: { color: "purple" },
  },
  {
    event_id: 7,
    title: "Event 7 (Not draggable)",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(new Date().getDate() - 3)
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(30)).setDate(new Date().getDate() - 3)
    ),
    admin_id: 1,
    draggable: false,
    room: "room2",
  },
  {
    event_id: 8,
    title: "Event 8",
    start: new Date(
      new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(new Date().getDate() + 30)
    ),
    end: new Date(
      new Date(new Date(new Date().setHours(14)).setMinutes(30)).setDate(new Date().getDate() + 30)
    ),
    draggable: false,
    admin_id: 1,

    room: "room2",
  },
];

export const RESOURCES = [
  {
    admin_id: 1,
    title: "One",
    mobile: "555666777",
    avatar: "",
    color: "#ab2d2d",
  },
  {
    admin_id: 2,
    title: "Two is very long name",
    mobile: "555666777",
    avatar: "https://picsum.photos/200/300",
    color: "#58ab2d",
  },
  {
    admin_id: 3,
    title: "Three",
    mobile: "555666777",
    avatar: "https://picsum.photos/200/300",
    color: "#a001a2",
  },
  {
    admin_id: 4,
    title: "Four",
    mobile: "555666777",
    avatar: "https://picsum.photos/200/300",
    color: "#08c5bd",
  },
];

export const generateRandomEvents = (total = 300) => {
  const events = [];
  for (let i = 0; i < total; i++) {
    const day = Math.round(i % 15);
    events.push({
      event_id: Math.random(),
      title: "Event " + (i + 1),
      start: new Date(
        new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
          new Date().getDate() + day
        )
      ),
      end: new Date(
        new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
          new Date().getDate() + day
        )
      ),
      // allDay: Math.random() > 0.5,
    });
  }

  return events;
};
