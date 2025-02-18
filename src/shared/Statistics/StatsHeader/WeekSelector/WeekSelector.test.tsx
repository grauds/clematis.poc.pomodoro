import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { WeekSelector } from "./WeekSelector";
import { setCurrentWeek } from "../../../../store/reducer";
import { Weeks } from "../../../../types/model";
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe("WeekSelector", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      week: Weeks[0],
    });

    store.dispatch = jest.fn();
  });

  it("should render WeekSelector component", () => {
    render(
      <Provider store={store}>
        <WeekSelector />
      </Provider>
    );

    expect(screen.getByText(Weeks[0].text)).toBeInTheDocument();
  });

  it("should open dropdown when button is clicked", () => {
    render(
      <Provider store={store}>
        <WeekSelector />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(screen.getByText(Weeks[1].text)).toBeInTheDocument();
  });

  it("should dispatch setCurrentWeek action when an item is clicked", () => {
    render(
      <Provider store={store}>
        <WeekSelector />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText(Weeks[1].text));

    expect(store.dispatch).toHaveBeenCalledWith(setCurrentWeek(Weeks[1]));
  });

  it("should close dropdown when an item is clicked", () => {
    render(
      <Provider store={store}>
        <WeekSelector />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText(Weeks[1].text));

    expect(screen.queryByText(Weeks[1].text)).not.toBeInTheDocument();
  });
});
