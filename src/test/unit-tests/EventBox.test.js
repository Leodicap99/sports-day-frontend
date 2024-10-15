import { render, screen, fireEvent } from "@testing-library/react";
import EventBox from "../../components/EventBox";

describe('EventBox Component', () => {
    const event = {
        id: 1,
        event_name: 'Test Event',
        event_category: 'Category 1',
        start_time: '2024-10-01 10:00:00',
        end_time: '2024-10-01 11:00:00'
    };
    test('renders event details correctly', () => {
        render(<EventBox event={event} selectEvent={jest.fn()} type="All" removeEvent={jest.fn()}/>);
        expect(screen.getByText('Test Event')).toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText(/10:00 AM-11:00/i)).toBeInTheDocument();
    });
    test('displays Select button when type is All', () => {
        render(
          <EventBox
            event={event}
            selectEvent={jest.fn()}
            type="All"
            removeEvent={jest.fn()}
          />
        );
        const selectButton = screen.getByRole('button',{name:/select/i});
        expect(selectButton).toBeInTheDocument();
    });
    test('displays remove button when the type is Selected', () => {
        render(
          <EventBox
            event={event}
            selectEvent={jest.fn()}
            type="Selected"
            removeEvent={jest.fn()}
          />
        );
        const removeButton = screen.getByRole('button', {name: /remove/i});
        expect(removeButton).toBeInTheDocument();
    });
    test('calls selectEvent when the select button is clicked', () => {
        const selectEventMock = jest.fn();
        render(
          <EventBox
            event={event}
            selectEvent={selectEventMock}
            type="All"
            removeEvent={jest.fn()}
          />
        );
        fireEvent.click(screen.getByRole('button',{name:/select/i}));
        expect(selectEventMock).toHaveBeenCalledWith(event.id);
    });
    test('calls removeEvent when Remove button is clicked', () => {
        const removeEventMock = jest.fn();
        render(
          <EventBox
            event={event}
            selectEvent={jest.fn()}
            type="Selected"
            removeEvent={removeEventMock}
          />
        );
        fireEvent.click(screen.getByRole('button', {name:/remove/i}));
        expect(removeEventMock).toHaveBeenCalledWith(event.id);
    })
})