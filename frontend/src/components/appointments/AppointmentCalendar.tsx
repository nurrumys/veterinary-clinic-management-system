import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import type {
  EventClickArg,
  EventDropArg,
} from "@fullcalendar/core";

import type { Visit } from "../../types/visit";
import type { Pet } from "../../types/pet";
import type { Veterinarian } from "../../types/veterinarian";


type AppointmentCalendarProps = {
  appointments: Visit[];
  pets: Pet[];
  veterinarians: Veterinarian[];

  onUpdate?: (
    appointment: Visit,
    newDate: string
  ) => void;
};


function AppointmentCalendar({
  appointments,
  pets,
  veterinarians,
  onUpdate,
}: AppointmentCalendarProps) {


  const events = appointments.map((appointment) => {

    const pet =
      pets.find(
        (p) => p.id === appointment.petId
      )?.name ?? `Pet #${appointment.petId}`;


    const vet =
      veterinarians.find(
        (v) => v.id === appointment.vetId
      )?.name ?? `Vet #${appointment.vetId}`;


    return {

      id: String(appointment.id),

      title: pet,

      start: appointment.scheduledAt,

      end: new Date(
        new Date(
          appointment.scheduledAt
        ).getTime() + 30 * 60 * 1000
      ),

      extendedProps: {
        appointment,
        pet,
        vet,
      },

      classNames: [
        appointment.status === "COMPLETED"
          ? "event-completed"
          : appointment.status === "CANCELLED"
          ? "event-cancelled"
          : appointment.status === "IN_EXAM"
          ? "event-exam"
          : "event-scheduled",
      ],

    };

  });



  const handleEventDrop = (
    info: EventDropArg
  ) => {

    if (!onUpdate) return;


    const appointment =
      info.event.extendedProps.appointment;


    if (!appointment) return;


    onUpdate(
      appointment,
      info.event.start!.toISOString()
    );

  };



  const handleEventClick = (
    info: EventClickArg
  ) => {

    const appointment =
      info.event.extendedProps.appointment;


    console.log(
      "Selected appointment:",
      appointment
    );

  };



  return (

    <div
      className="
        rounded-xl
        border
        border-slate-200
        bg-white
        p-6
      "
    >

      <h2
        className="
          mb-5
          text-xl
          font-semibold
          text-slate-900
        "
      >
        Appointment Calendar
      </h2>


      <FullCalendar

        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin,
        ]}


        initialView="dayGridMonth"


        headerToolbar={{
          left: "prev,next today",

          center: "title",

          right:
            "dayGridMonth,timeGridWeek,timeGridDay",
        }}


        events={events}


        editable={true}


        eventDrop={handleEventDrop}


        eventClick={handleEventClick}


        height="620px"


        dayMaxEvents={3}


        slotMinTime="08:00:00"


        slotMaxTime="20:00:00"


        slotDuration="00:30:00"


        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}


        eventContent={(eventInfo) => (

          <div className="calendar-event">

            <div className="calendar-time">
              {eventInfo.timeText}
            </div>


            <div className="calendar-title">
              {eventInfo.event.title}
            </div>


            <div className="calendar-vet">
              Dr. {eventInfo.event.extendedProps.vet}
            </div>

          </div>

        )}

      />

    </div>

  );

}


export default AppointmentCalendar;