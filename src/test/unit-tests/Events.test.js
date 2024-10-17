import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Events from "../../components/Events";
import { data } from "../../utils/mockData";
global.fetch = jest.fn();
const mockUser = {
    userId: 1, 
    selectedEvents: []
}
beforeEach(()=>{
    jest.spyOn(window.sessionStorage.__proto__,'getItem').mockReturnValue(JSON.stringify(mockUser));
    fetch.mockResolvedValue({
        ok: true,
        json: async () => ({data: mockUser})
    });
});
afterEach(()=>{
    jest.restoreAllMocks();
});
describe("Events Component", () => {
    test('renders all events and selected events correctly', () => {
        render(<Events />);
        data.forEach((event)=>{
            expect(screen.getByText(event.event_name)).toBeInTheDocument();
        });
        expect(screen.getByText("Selected events")).toBeInTheDocument();
        expect(screen.queryByText("Remove")).toBeNull();
    });
    test('displace loading spinner when saving events', async() => {
        render(<Events />);
        const selectButton = screen.getAllByText('Select')[0];
        fireEvent.click(selectButton);
        expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
    test('selects an event and moves it to selected events', async () => {
        render(<Events />);
        const selectButton = screen.getAllByText('Select')[0];
        fireEvent.click(selectButton);
        let removeButton = await screen.findByText('Remove');
        expect(removeButton).toBeInTheDocument();
    });
    test("prevents selecting conflicting time events", async () => {
      render(<Events />);
      const selectButtons = screen.getAllByText("Select");
      fireEvent.click(selectButtons[0]);
      fireEvent.click(selectButtons[1]);
      fireEvent.click(selectButtons[2]);
      fireEvent.click(selectButtons[3]);
      await waitFor(() => {
        expect(
          screen.getByText(
            `This event conflicts with Butterfly 100M event's timing. Please choose a different time slot.`
          )
        ).toBeInTheDocument();
      });
    });
    test('prevents selecting more than 3 events', async () => {
        render(<Events />);
        fireEvent.click(screen.getAllByText("Select")[0]);
        fireEvent.click(screen.getAllByText("Select")[2]);
        fireEvent.click(screen.getAllByText("Select")[4]);
        fireEvent.click(screen.getAllByText("Select")[5]);
        await waitFor(()=>{
            expect(screen.getByText("You can only select up to 3 events.")).toBeInTheDocument();
        })
    });
    test('removes an element from selected events', async() => {
        render(<Events />);
        fireEvent.click(screen.getAllByText("Select")[0]);
        await waitFor(()=>{
            expect (screen.getByText('Remove')).toBeInTheDocument();
        });
        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton);
        await waitFor(()=>{
            expect(screen.queryByText('Remove')).toBeNull();
        });
    });
    test('filters events based on search term', async() => {
        render(<Events />);
        data.forEach(event=>{
            expect(screen.getByText(event.event_name)).toBeInTheDocument();
        });
        const searchInput = screen.getByPlaceholderText("Search event name or category");
        fireEvent.change(searchInput,{target:{value:'Butterfly'}});
        expect(screen.getByText('Butterfly 100M')).toBeInTheDocument();
        expect(screen.queryByText('Backstroke 100M')).toBeNull();
    });
    test('shows "No results found" when no event match occurs', async()=>{
        render(<Events />);
        const searchInput = screen.getByPlaceholderText('Search event name or category');
        fireEvent.change(searchInput,{target:{value:'wefwffew'}});
        expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
    test('sorts events in ascending order by start time on single click', async() => {
        render(<Events />);
        const sortButton=screen.getByTestId('sort-button');
        fireEvent.click(sortButton);
        const sortedEvents = [...data].sort((a,b)=> new Date(a.start_time)-new Date(b.start_time));
        await waitFor(()=>{
            const eventNamesOnScreen = screen.getAllByTestId('event-name').map(el=>el.textContent);
            const sortedEventNames = sortedEvents.map(event=>event.event_name);
            expect(eventNamesOnScreen).toEqual(sortedEventNames);
        })
    });
    test("sorts events in descending order by start time on double clicks", async () => {
      render(<Events />);
      const sortButton = screen.getByTestId("sort-button");
      fireEvent.click(sortButton);
      fireEvent.click(sortButton);
      const sortedEvents = [...data].sort(
        (a, b) => new Date(b.start_time) - new Date(a.start_time)
      );
      await waitFor(() => {
        const eventNamesOnScreen = screen
          .getAllByTestId("event-name")
          .map((el) => el.textContent);
        const sortedEventNames = sortedEvents.map((event) => event.event_name);
        expect(eventNamesOnScreen).toEqual(sortedEventNames);
      });
    });
    test("sorts events in default order by start time on triple clicks", async () => {
      render(<Events />);
      const sortButton = screen.getByTestId("sort-button");
      fireEvent.click(sortButton);
      fireEvent.click(sortButton);
      fireEvent.click(sortButton);
      const sortedEvents = [...data];
      await waitFor(() => {
        const eventNamesOnScreen = screen
          .getAllByTestId("event-name")
          .map((el) => el.textContent);
        const sortedEventNames = sortedEvents.map((event) => event.event_name);
        expect(eventNamesOnScreen).toEqual(sortedEventNames);
      });
    });

})