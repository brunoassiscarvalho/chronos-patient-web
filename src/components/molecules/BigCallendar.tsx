

import {Calendar, Event, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface IBigCalendar {
  events?: Event[];
  onSelectEvent?: (event: Event) => void;
}

const localizer = momentLocalizer(moment); 


export default function BigCalendar({
  events,
  onSelectEvent,
}: IBigCalendar): JSX.Element {

  return (
    <div>Calendario</div>
    // <Calendar
    //   defaultView="week"
    //   events={events}
    //   localizer={localizer}
    //   onSelectEvent={onSelectEvent}
    //   startAccessor="start"
    //   style={{ height: '100vh' }}
    // />
  );
}

