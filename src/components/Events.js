import { useState } from "react";
import { data } from "../utils/mockData";
import EventBox from "./EventBox";
import { Snackbar } from "@mui/material";

function Events() {
  const [events, setEvents] = useState(data);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [errorToast,setErrorToast] = useState(false);
  const [errorToastMessage,setErrorToastMessage] = useState('');
  const selectEvent = (id) => {
    if(selectedEvents.length===3){
        setErrorToast(true);
        setErrorToastMessage('You can only select up to 3 events.');
        return;
    }
    let event = events.filter((e) => e.id === id);
    let startTime=event[0].start_time,endTime = event[0].end_time;
    for(let i=0;i<selectedEvents.length;i++){
        if (
          (startTime < selectedEvents[i].end_time &&
            startTime >= selectedEvents[i].start_time) ||
          (selectedEvents[i].start_time<endTime && selectedEvents[i].start_time>=startTime)
        ) {
          setErrorToast(true);
          setErrorToastMessage(`This event conflicts with ${selectedEvents[i].event_name} event's timing. Please choose a different time slot.
`);
          return;
        }
    }
    setSelectedEvents([...selectedEvents, event[0]]);
  };
  const removeEvent = (id) =>{
    let newEvents = selectedEvents.filter((e)=>e.id!==id);
    setSelectedEvents([...newEvents]);
  }
  const handleClose = () => {
    setErrorToast(false);
  }
  return (
    <div className="flex h-full">
      <div className="border border-black m-4 p-4 w-1/2">
        <h1 className="text-2xl  z-10 p-4">All events</h1>
        <div className="flex flex-wrap overflow-y-auto ">
          {" "}
          {events.map((event) => (
            <EventBox
              key={event.id}
              event={event}
              selectEvent={selectEvent}
              type="All"
            />
          ))}
        </div>
      </div>
      <div className="border border-black m-4 p-4 w-1/2">
        <h1 className="text-2xl  z-10 p-4">Selected events</h1>
        <div className="flex flex-wrap overflow-y-auto ">
          {" "}
          {selectedEvents.map((event) => (
            <EventBox
              key={event.id}
              event={event}
              type={"Selected"}
              removeEvent={removeEvent}
            />
          ))}
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={errorToast}
        autoHideDuration={5000}
        onClose={handleClose}
        message={errorToastMessage}
        sx={{
          "& .MuiSnackbarContent-root": {
            bgcolor: "red", // background color
            color: "white", // text color
          },
        }}
        action={
          <>
            <span className="text-white cursor-pointer" onClick={handleClose}>
              X
            </span>
          </>
        }
      />
    </div>
  );
}

export default Events;
