import { useState, useEffect, useRef } from "react";
import { data } from "../utils/mockData";
import EventBox from "./EventBox";
import { Snackbar } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EventSearch from "./EventSearch";
function Events() {
  const [events, setEvents] = useState(data);
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [errorToast, setErrorToast] = useState(false);
  const [errorToastMessage, setErrorToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);
  const user = JSON.parse(sessionStorage.getItem("isLoggedIn"));
  const userId = user.userId;
  useEffect(() => {
    if (user.selectedEvents) {
      setSelectedEvents(user.selectedEvents);
    }
  }, []);
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [events]);
  const saveSelectedEvents = async (selectedEventsForPost) => {
    setLoading(true);
    try {
      const obj = {
        userId: userId,
        selectedEvents: selectedEventsForPost,
      };
      const response = await fetch(
        "http://localhost:5000/api/save-selected-events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error saving selected events: ", errorData.error);
      } else {
        const data = await response.json();
        sessionStorage.setItem("isLoggedIn", JSON.stringify(data.data));
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error: ", error);
      setLoading(false);
    }
  };
  const selectEvent = (id) => {
    if (selectedEvents.length === 3) {
      setErrorToast(true);
      setErrorToastMessage("You can only select up to 3 events.");
      return;
    }
    let event = events.filter((e) => e.id === id);
    let startTime = event[0].start_time,
      endTime = event[0].end_time;
    for (let i = 0; i < selectedEvents.length; i++) {
      if (
        (startTime < selectedEvents[i].end_time &&
          startTime >= selectedEvents[i].start_time) ||
        (selectedEvents[i].start_time < endTime &&
          selectedEvents[i].start_time >= startTime)
      ) {
        setErrorToast(true);
        setErrorToastMessage(`This event conflicts with ${selectedEvents[i].event_name} event's timing. Please choose a different time slot.
`);
        return;
      }
    }
    saveSelectedEvents([...selectedEvents, event[0]]);
    setSelectedEvents([...selectedEvents, event[0]]);
  };
  const removeEvent = (id) => {
    let newEvents = selectedEvents.filter((e) => e.id !== id);
    saveSelectedEvents([...newEvents]);
    setSelectedEvents([...newEvents]);
  };
  const handleClose = () => {
    setErrorToast(false);
  };
  const handleSortEvents = (flag) => {
    let filteredArray=[...data];
    if(flag==='asc'){
      filteredArray.sort(
        (a, b) => new Date(a.start_time) - new Date(b.start_time)
      );
    }else if(flag==='desc'){
      filteredArray.sort(
        (a, b) => new Date(b.start_time) - new Date(a.start_time)
      );
    }
    setEvents([...filteredArray]);
  }
  const handleFilterEvents = (searchTerm) => {
    const filteredEvents = data.filter((event) =>
      event.event_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setEvents(filteredEvents);  
  };
  return (
    <div
      className={
        "dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-800 min-h-screen"
      }
    >
      <div className="flex flex-col lg:flex-row h-full">
        <div className="m-4 p-4 lg:w-1/2 shadow-lg rounded-lg border border-gray-300 bg-white dark:bg-gray-800">
          <h1 className="text-xl md:text-2xl text-center z-10 p-4 font-semibold">
            All events
          </h1>
          <EventSearch
            handleFilterEvents={handleFilterEvents}
            handleSortEvents={handleSortEvents}
          />
          {events.length === 0 ? (
            <div className="text-center p-4">No results found.</div>
          ) : (
            <div className="flex flex-wrap overflow-y-auto">
              {events.map((event) => (
                <EventBox
                  key={event.id}
                  event={event}
                  selectEvent={selectEvent}
                  type="All"
                />
              ))}
            </div>
          )}
        </div>

        <div className="m-4 p-4 lg:w-1/2 shadow-lg rounded-lg border border-gray-300 bg-white dark:bg-gray-800">
          <h1 className="text-xl md:text-2xl text-center z-10 p-4 font-semibold">
            Selected events
          </h1>
          <div className="flex flex-wrap overflow-y-auto">
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
              bgcolor: "red",
              color: "white",
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
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Events;
