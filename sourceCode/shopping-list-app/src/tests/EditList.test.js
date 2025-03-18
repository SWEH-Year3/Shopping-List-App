import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditList from "../pages/EditList";


test("add card list", async () => {
  const updateListMock = jest.fn();
  const lists = [
    { id: 1, title: "Shopping List", description: "A sample list", items: [] },
  ];

  render(<EditList lists={lists} updateList={updateListMock} />);

  // Get the inputs by label text
  const titleInput = screen.getByLabelText("List Name");
  const descriptionInput = screen.getByLabelText("Description");

  // Clear existing text
  await userEvent.clear(titleInput);
  await userEvent.clear(descriptionInput);

  // Type new values
  await userEvent.type(titleInput, "shopping");
  await userEvent.type(descriptionInput, "studing is very borning");

  // Submit the form (simulate clicking the update button)
  const updateButton = screen.getByRole("button", { name: /update list/i });
  await userEvent.click(updateButton);

  // Expected updateListMock call should now have only the new values, plus the id and items from the original list
  expect(updateListMock).toHaveBeenCalledWith({
    id: 1,
    title: "shopping",
    description: "studing is very borning",
    items: [],
  });
});
