import { beforeEach, describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import Accordion from "../Accordion";

describe("Accordion test", () => {
  beforeEach(() => {
    render(
      <Accordion title="Testing">
        <h4>Content</h4>
      </Accordion>
    );
  });

  test("Should show title all the time", () => {
    const titleElement = screen.queryByText(/Testing/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("Should not show the content at the start", () => {
    const contentElement = screen.queryByText(/Content/i);
    expect(contentElement).not.toBeInTheDocument();
  });

  test("Should show the content on accordion click", async () => {
    const buttonElement = screen.getByText(/Show/i);

    fireEvent.click(buttonElement);

    expect(await screen.findByText(/Content/i)).toBeInTheDocument();
  });
});
