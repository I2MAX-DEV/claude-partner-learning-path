"use client";

import { Loader2 } from "lucide-react";
import type { ToolInvocation as AIToolInvocation } from "ai";

interface FormatResult {
  label: string;
  isRunning: boolean;
}

const STR_REPLACE_VERBS: Record<string, [string, string]> = {
  create: ["Creating", "Created"],
  str_replace: ["Editing", "Edited"],
  insert: ["Editing", "Edited"],
  view: ["Viewing", "Viewed"],
  undo_edit: ["Reverting", "Reverted"],
};

const FILE_MANAGER_VERBS: Record<string, [string, string]> = {
  rename: ["Renaming", "Renamed"],
  delete: ["Deleting", "Deleted"],
};

export function formatToolInvocation(
  toolInvocation: AIToolInvocation
): FormatResult {
  const isRunning = !(
    toolInvocation.state === "result" &&
    (toolInvocation as { result?: unknown }).result !== undefined &&
    (toolInvocation as { result?: unknown }).result !== null
  );

  const { toolName } = toolInvocation;
  const args = (toolInvocation.args ?? {}) as {
    command?: string;
    path?: string;
    new_path?: string;
  };

  if (toolName === "str_replace_editor") {
    const verbs = args.command ? STR_REPLACE_VERBS[args.command] : undefined;
    if (!verbs) {
      return { label: toolName, isRunning };
    }
    const verb = isRunning ? verbs[0] : verbs[1];
    return {
      label: args.path ? `${verb} ${args.path}` : `${verb}…`,
      isRunning,
    };
  }

  if (toolName === "file_manager") {
    const verbs = args.command ? FILE_MANAGER_VERBS[args.command] : undefined;
    if (!verbs) {
      return { label: toolName, isRunning };
    }
    const verb = isRunning ? verbs[0] : verbs[1];
    if (args.command === "rename") {
      if (!args.path) return { label: `${verb}…`, isRunning };
      if (!args.new_path) return { label: `${verb} ${args.path}`, isRunning };
      return {
        label: `${verb} ${args.path} → ${args.new_path}`,
        isRunning,
      };
    }
    return {
      label: args.path ? `${verb} ${args.path}` : `${verb}…`,
      isRunning,
    };
  }

  return { label: toolName, isRunning };
}

export function ToolInvocation({
  toolInvocation,
}: {
  toolInvocation: AIToolInvocation;
}) {
  const { label, isRunning } = formatToolInvocation(toolInvocation);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isRunning ? (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      ) : (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
