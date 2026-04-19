"use client";

import { FC } from "react";
import { Plus } from "lucide-react";
import { GroupDetail } from "@/types";

interface IPropsGroupCards {
  group: GroupDetail;
  onAddMember?: (groupId: string) => void;
}

const getInitials = (name: string) => {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const GroupCards: FC<IPropsGroupCards> = ({ group, onAddMember }) => {
  return (
    <div className="w-full shadow rounded-xl px-5 py-4 flex flex-col gap-4">
      <span className="font-poppins font-semibold text-lg text-zinc-700">
        {group.name}
      </span>
      <div className="flex flex-row flex-wrap items-center gap-2">
        {group.members.map((member) => (
          <div
            key={member.id}
            title={member.name}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-600 font-poppins text-sm font-medium cursor-default select-none"
          >
            {getInitials(member.name)}
          </div>
        ))}
        <button
          onClick={() => onAddMember?.(group.id)}
          className="flex items-center justify-center w-6 h-6 rounded-lg border border-zinc-400 text-zinc-400 hover:border-zinc-600 hover:text-zinc-600 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
