import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import type { ToolInvocation as AIToolInvocation } from "ai";
import {
  ToolInvocation,
  formatToolInvocation,
} from "../ToolInvocation";

afterEach(() => {
  cleanup();
});

// --- formatToolInvocation: str_replace_editor ---

test("str_replace_editor + create while running -> Creating <path>", () => {
  const { label, isRunning } = formatToolInvocation({
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx", file_text: "..." },
    state: "call",
  } as AIToolInvocation);
  expect(label).toBe("Creating /App.jsx");
  expect(isRunning).toBe(true);
});

test("str_replace_editor + create with result -> Created <path>", () => {
  const { label, isRunning } = formatToolInvocation({
    toolCallId: "1",
    toolName: "str_replace_editor",
    args: { command: "create", path: "/App.jsx", file_text: "..." },
    state: "result",
    result: "File created: /App.jsx",
  } as AIToolInvocation);
  expect(label).toBe("Created /App.jsx");
  expect(isRunning).toBe(false);
});

test("str_replace_editor + str_replace while running -> Editing <path>", () => {
  const { label, isRunning } = formatToolInvocation({
    toolCallId: "2",
    toolName: "str_replace_editor",
    args: { command: "str_replace", path: "/App.jsx", old_str: "a", new_str: "b" },
    state: "call",
  } as AIToolInvocation);
  expect(label).toBe("Editing /App.jsx");
  expect(isRunning).toBe(true);
});

test("str_replace_editor + insert with result -> Edited <path>", () => {
  const { label, isRunning } = formatToolInvocation({
    toolCallId: "3",
    toolName: "str_replace_editor",
    args: { command: "insert", path: "/App.jsx", insert_line: 2, new_str: "x" },
    state: "result",
    result: "ok",
  } as AIToolInvocation);
  expect(label).toBe("Edited /App.jsx");
  expect(isRunning).toBe(false);
});

test("str_replace_editor + view shows Viewing/Viewed", () => {
  const running = formatToolInvocation({
    toolCallId: "4",
    toolName: "str_replace_editor",
    args: { command: "view", path: "/components/Card.jsx" },
    state: "call",
  } as AIToolInvocation);
  expect(running.label).toBe("Viewing /components/Card.jsx");

  const done = formatToolInvocation({
    toolCallId: "4",
    toolName: "str_replace_editor",
    args: { command: "view", path: "/components/Card.jsx" },
    state: "result",
    result: "1\tcontent",
  } as AIToolInvocation);
  expect(done.label).toBe("Viewed /components/Card.jsx");
});

test("str_replace_editor + undo_edit shows Reverting/Reverted", () => {
  const running = formatToolInvocation({
    toolCallId: "5",
    toolName: "str_replace_editor",
    args: { command: "undo_edit", path: "/App.jsx" },
    state: "call",
  } as AIToolInvocation);
  expect(running.label).toBe("Reverting /App.jsx");

  const done = formatToolInvocation({
    toolCallId: "5",
    toolName: "str_replace_editor",
    args: { command: "undo_edit", path: "/App.jsx" },
    state: "result",
    result: "ok",
  } as AIToolInvocation);
  expect(done.label).toBe("Reverted /App.jsx");
});

// --- formatToolInvocation: file_manager ---

test("file_manager + rename with both paths -> Renaming <a> -> <b>", () => {
  const { label } = formatToolInvocation({
    toolCallId: "6",
    toolName: "file_manager",
    args: { command: "rename", path: "/a.jsx", new_path: "/b.jsx" },
    state: "call",
  } as AIToolInvocation);
  expect(label).toBe("Renaming /a.jsx → /b.jsx");
});

test("file_manager + rename without new_path falls back to bare path", () => {
  const { label } = formatToolInvocation({
    toolCallId: "7",
    toolName: "file_manager",
    args: { command: "rename", path: "/a.jsx" },
    state: "call",
  } as AIToolInvocation);
  expect(label).toBe("Renaming /a.jsx");
});

test("file_manager + delete shows Deleting/Deleted", () => {
  const running = formatToolInvocation({
    toolCallId: "8",
    toolName: "file_manager",
    args: { command: "delete", path: "/old.jsx" },
    state: "call",
  } as AIToolInvocation);
  expect(running.label).toBe("Deleting /old.jsx");

  const done = formatToolInvocation({
    toolCallId: "8",
    toolName: "file_manager",
    args: { command: "delete", path: "/old.jsx" },
    state: "result",
    result: { success: true },
  } as AIToolInvocation);
  expect(done.label).toBe("Deleted /old.jsx");
});

// --- fallbacks ---

test("partial-call with empty args falls back to tool name", () => {
  const { label, isRunning } = formatToolInvocation({
    toolCallId: "9",
    toolName: "str_replace_editor",
    args: {},
    state: "partial-call",
  } as AIToolInvocation);
  expect(label).toBe("str_replace_editor");
  expect(isRunning).toBe(true);
});

test("unknown tool name renders verbatim", () => {
  const { label } = formatToolInvocation({
    toolCallId: "10",
    toolName: "future_tool",
    args: { command: "do", path: "/x" },
    state: "call",
  } as unknown as AIToolInvocation);
  expect(label).toBe("future_tool");
});

test("known tool with unknown command falls back to tool name", () => {
  const { label } = formatToolInvocation({
    toolCallId: "11",
    toolName: "str_replace_editor",
    args: { command: "frobnicate", path: "/x" },
    state: "call",
  } as unknown as AIToolInvocation);
  expect(label).toBe("str_replace_editor");
});

// --- component rendering ---

test("ToolInvocation shows spinner while running", () => {
  const { container } = render(
    <ToolInvocation
      toolInvocation={{
        toolCallId: "c1",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx", file_text: "..." },
        state: "call",
      } as AIToolInvocation}
    />
  );
  expect(container.querySelector(".animate-spin")).not.toBeNull();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

test("ToolInvocation shows green dot when done", () => {
  const { container } = render(
    <ToolInvocation
      toolInvocation={{
        toolCallId: "c2",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx", file_text: "..." },
        state: "result",
        result: "File created: /App.jsx",
      } as AIToolInvocation}
    />
  );
  expect(container.querySelector(".bg-emerald-500")).not.toBeNull();
  expect(container.querySelector(".animate-spin")).toBeNull();
});

test("ToolInvocation renders the friendly label", () => {
  render(
    <ToolInvocation
      toolInvocation={{
        toolCallId: "c3",
        toolName: "str_replace_editor",
        args: { command: "create", path: "/App.jsx", file_text: "..." },
        state: "result",
        result: "ok",
      } as AIToolInvocation}
    />
  );
  expect(screen.getByText("Created /App.jsx")).toBeDefined();
});
