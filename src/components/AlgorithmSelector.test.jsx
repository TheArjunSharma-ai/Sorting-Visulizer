import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";
import { SortingType } from "../sortingContext";
import { generateRandomNumber } from "../common/common.module";

const algorithms = Object.values(SortingType).flatMap(Object.values);
const currentValues = () =>
  screen.getByText("Current Sorting Step:").nextElementSibling.textContent;
const initialValues = () =>
  screen.getByText("Initial Array:").nextElementSibling.textContent;
const apply = () => fireEvent.click(screen.getByRole("button", { name: "Apply algorithm" }));
const nativeShowModal = HTMLDialogElement.prototype.showModal;

beforeAll(() => {
  if (!nativeShowModal) {
    HTMLDialogElement.prototype.showModal = function () {};
  }
});

afterAll(() => {
  if (!nativeShowModal) {
    delete HTMLDialogElement.prototype.showModal;
  }
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test.each(algorithms)("applies custom numbers with %s", (algorithm) => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Algorithm"), { target: { value: algorithm } });
  fireEvent.change(screen.getByLabelText("Custom numbers (optional)"), {
    target: { value: "9, 3, 0, 3" },
  });
  apply();
  expect(initialValues()).toBe("9303");
  act(() => jest.runAllTimers());
  expect(currentValues()).toBe("0339");
});

test("allows maximum to be cleared and retyped, and includes it in random generation", () => {
  jest.spyOn(Math, "random").mockReturnValue(0.999);
  render(<App />);
  const maximum = screen.getByLabelText("Maximum random value (1-500)");
  fireEvent.change(maximum, { target: { value: "" } });
  expect(maximum.value).toBe("");
  fireEvent.change(maximum, { target: { value: "25" } });
  fireEvent.change(screen.getByLabelText("Array size (1-500)"), { target: { value: "3" } });
  fireEvent.change(screen.getByLabelText("Step delay in milliseconds (0-10000)"), {
    target: { value: "0" },
  });
  apply();
  act(() => jest.runAllTimers());
  expect(initialValues()).toBe("252525");
  expect(currentValues()).toBe("252525");
  expect(generateRandomNumber(1, 25)).toBe(25);
});

test.each(["2, bad, 3", "-1, 2", "1.5, 2", "501", "1,,2", ",1", "1,"])(
  "rejects invalid custom numbers %s without changing the array",
  (value) => {
    render(<App />);
    const original = initialValues();
    fireEvent.change(screen.getByLabelText("Custom numbers (optional)"), {
      target: { value },
    });
    apply();
    expect(screen.getByRole("alert").textContent).toContain("whole numbers");
    expect(initialValues()).toBe(original);
  }
);

test("custom numbers take priority over random settings and do not apply while typing", () => {
  render(<App />);
  const original = initialValues();
  fireEvent.change(screen.getByLabelText("Maximum random value (1-500)"), {
    target: { value: "" },
  });
  fireEvent.change(screen.getByLabelText("Custom numbers (optional)"), {
    target: { value: "4 2" },
  });
  expect(screen.getByLabelText("Maximum random value (1-500)")).toBeDisabled();
  expect(initialValues()).toBe(original);
  apply();
  expect(screen.queryByRole("alert")).toBeNull();
  expect(initialValues()).toBe("42");
});

test("reapplying cancels the previous playback and unmount clears timers", () => {
  const { unmount } = render(<App />);
  const input = screen.getByLabelText("Custom numbers (optional)");
  fireEvent.change(input, { target: { value: "8, 6, 4" } });
  apply();
  fireEvent.change(input, { target: { value: "5, 1" } });
  apply();
  act(() => jest.runAllTimers());
  expect(currentValues()).toBe("15");
  apply();
  unmount();
  expect(jest.getTimerCount()).toBe(0);
});

test.each([
  ["Array size (1-500)", "", "Array size"],
  ["Array size (1-500)", "0", "Array size"],
  ["Array size (1-500)", "501", "Array size"],
  ["Maximum random value (1-500)", "", "Maximum random value"],
  ["Maximum random value (1-500)", "0", "Maximum random value"],
  ["Maximum random value (1-500)", "501", "Maximum random value"],
  ["Step delay in milliseconds (0-10000)", "", "Delay"],
  ["Step delay in milliseconds (0-10000)", "-1", "Delay"],
  ["Step delay in milliseconds (0-10000)", "1.5", "Delay"],
  ["Step delay in milliseconds (0-10000)", "10001", "Delay"],
])("validates %s value %s", (label, value, message) => {
  render(<App />);
  const original = initialValues();
  fireEvent.change(screen.getByLabelText(label), { target: { value } });
  apply();
  expect(screen.getByRole("alert")).toHaveTextContent(message);
  expect(initialValues()).toBe(original);
});

test("reset restores the original custom numbers after completion", () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Custom numbers (optional)"), {
    target: { value: "6, 2, 4" },
  });
  apply();
  act(() => jest.runAllTimers());
  expect(currentValues()).toBe("246");
  fireEvent.click(screen.getByRole("button", { name: "reset steps" }));
  expect(currentValues()).toBe("624");
  act(() => jest.runAllTimers());
  expect(currentValues()).toBe("624");
});

test.each(algorithms)("offers an explanation for %s", (algorithm) => {
  const showModal = jest.spyOn(HTMLDialogElement.prototype, "showModal")
    .mockImplementation(function () { this.setAttribute("open", ""); });
  render(<App />);
  fireEvent.change(screen.getByLabelText("Algorithm"), { target: { value: algorithm } });
  fireEvent.click(screen.getByRole("button", { name: "How does it work?" }));
  expect(showModal).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("dialog", { name: algorithm })).toBeTruthy();
  expect(screen.getByRole("button", { name: "Close" })).toBeTruthy();
});
