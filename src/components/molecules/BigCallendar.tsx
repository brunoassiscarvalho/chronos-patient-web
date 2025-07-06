import { FC, useState } from 'react';
import { Calendar, dateFnsLocalizer, Event, momentLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import addHours from 'date-fns/addHours';
import startOfHour from 'date-fns/startOfHour';

// import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ptBR } from 'date-fns/locale';

interface IBigCalendar {
  events?: Event[];
  onSelectEvent?: (event: Event) => void;
}

const localizer = momentLocalizer(moment); // or globalizeLocalizer

const locales = {
  'en-US': enUS,
  'pt-BR': ptBR,
};
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1);
const now = new Date();
const start = endOfHour(now);
const end = addHours(start, 1);
console.log({ start: start.toISOString(), end: end.toISOString() });
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// });

export default function BigCalendar({
  events,
  onSelectEvent,
}: IBigCalendar): JSX.Element {
  // const mock: any = [
  //   {
  //     _id: '629faa874adfc89d4f9ef502',
  //     allDay: false,
  //     title: 'Consulta 2',
  //     start: new Date('2022-06-07T17:25:43.511Z'),
  //     end: new Date('2022-06-07T18:25:43.511Z') ,
  //     resource: {
  //       status: 'Open',
  //       professional: {
  //         _id: 'fsdjkfajeej',
  //         name: 'Scarlett Johansson',
  //         position: 'Nutricionista',
  //       },
  //     },
  //     createdAt: '2022-06-07T19:44:03.374Z',
  //     __v: 0,
  //   },
  // ];

  // const onEventResize: withDragAndDropProps['onEventResize'] = (data) => {
  //   const { start, end } = data;

  //   setEvents((currentEvents) => {
  //     const firstEvent = {
  //       start: new Date(start),
  //       end: new Date(end),
  //     };
  //     return [...currentEvents, firstEvent];
  //   });
  // };

  // const onEventDrop: withDragAndDropProps['onEventDrop'] = (data) => {
  //   console.log(data);
  // };

  // const handleSelectEvent = useCallback(
  //   (event: any) => window.alert(event.title),
  //   [],
  // );

  // const handleSelectSlot = useCallback(
  //   ({ start, end }:any) => {
  //     const title = window.prompt('New Event name');
  //     if (title) {
  //       setEvents((prev) => [...prev, { start, end, title }]);
  //     }
  //   },
  //   [setEvents],
  // );

  return (
    <Calendar
      defaultView="week"
      events={events}
      localizer={localizer}
      // onEventDrop={onEventDrop}
      onSelectEvent={onSelectEvent}
      // onEventResize={onEventResize}
      // onSelectSlot={handleSelectSlot}
      // resizable
      // selectable
      style={{ height: '100vh' }}
    />
  );
}
