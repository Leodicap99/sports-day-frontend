function EventBox({ event, selectEvent,type,removeEvent }) {
  let date = new Date(event.start_time.replace(" ", "T"));
  const startDate = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  date = new Date(event.end_time.replace(" ", "T"));
  const endDate = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return (
    <div className="border h-40 sm:w-64 bg-blue-100 border-blue-700 items-center flex justify-center rounded-lg m-10 p-5">
      <div className="text-3xl font-extrabold">{event.event_category[0]}</div>
      <span className="border-r border-black h-full mx-4"></span>
      <div>
        <div>{event.event_name}</div>
        <div>{event.event_category}</div>
        <div>
          {startDate}-{endDate}
        </div>
        <div className="flex justify-end">
          {type === "All" && (
            <button
              onClick={() => selectEvent(event.id)}
              className="bg-green-200 p-2 border rounded-md text-xs mt-4 border-green-900 hover:bg-green-500"
            >
              Select
            </button>
          )}
          {type === "Selected" && (
            <button
              onClick={() => removeEvent(event.id)}
              className="bg-red-200 p-2 border rounded-md text-xs mt-4 border-red-900 hover:bg-red-500"
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
export default EventBox;