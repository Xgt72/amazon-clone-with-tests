import { describe, expect, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import App from "../../../App";
import Header from "../Header";

const MockHeader = () => (
  <MemoryRouter>
    <Header />
  </MemoryRouter>
);

const MockAppWithHeader = () => (
  <MemoryRouter initialEntries={["/checkout"]}>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </MemoryRouter>
);

describe("Header test", () => {
  test("Should show header element", () => {
    render(<MockHeader />);
    const headerElement = screen.getByText(
      (content, element) => element.tagName.toLowerCase() === "header"
    );
    expect(headerElement).toBeInTheDocument();
  });

  test("Should show a 'a' element which redirect to / page", () => {
    render(<MockHeader />);
    const linkElement = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "a" &&
        element.getAttribute("href") === "/"
    );
    expect(linkElement).toBeInTheDocument();
  });

  test("Should show a 'img' element inside the 'a' element with the Amazon logo", () => {
    render(<MockHeader />);
    const linkElement = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "a" &&
        element.getAttribute("href") === "/"
    );
    const imgageElement = linkElement.querySelector("img");
    expect(imgageElement).toBeInTheDocument();
    expect(imgageElement.getAttribute("alt")).toBe("Amazon logo");
  });

  test("Should navigate to home when the Amazon logo is clicked", () => {
    render(<MockAppWithHeader />);
    const checkoutElement = screen.getByText(/Checkout/i);
    expect(checkoutElement).toBeInTheDocument();
    const linkElement = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "a" &&
        element.getAttribute("href") === "/"
    );
    fireEvent.click(linkElement);
    const homeElement = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "h1" && content.match(/Home/i)
    );
    expect(homeElement).toBeInTheDocument();
  });

  test("Should render search input element", () => {
    render(<MockHeader />);
    const inputElement = screen.getByPlaceholderText(/Find Amazon.com/i);
    expect(inputElement).toBeInTheDocument();
  });

  test("Should be able to type in search input", () => {
    render(<MockHeader />);
    const inputElement = screen.getByPlaceholderText(/Find Amazon.com/i);

    fireEvent.change(inputElement, {
      target: { value: "Nintendo" },
    });
    expect(inputElement.value).toBe("Nintendo");
  });

  test("Should have empty input when search icon is clicked", () => {
    render(<MockHeader />);
    const inputElement = screen.getByPlaceholderText(/Find Amazon.com/i);
    const iconElement = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "svg" &&
        element.classList.value.includes("header__searchIcon")
    );

    fireEvent.change(inputElement, {
      target: { value: "Nintendo" },
    });
    fireEvent.click(iconElement);
    expect(inputElement.value).toBe("");
  });

  test("Should show a 'a' element which redirect to /login page", () => {
    render(<MockHeader />);
    const linkElement = screen.getByText(
      (content, element) =>
        element.tagName.toLowerCase() === "a" &&
        element.getAttribute("href") === "/login"
    );
    expect(linkElement).toBeInTheDocument();
  });
});
