import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header test", () => {
  beforeEach(() => {
    render(<Header />);
  });

  test("Should show header element with p element which contain 'Header'", () => {
    const headerElement = screen.queryByTestId("header");
    console.debug(headerElement);
    expect(headerElement).toBeInTheDocument();
  });
});
