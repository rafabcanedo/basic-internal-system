import { GroupCards } from "./components/group-cards";
import { CreateGroup } from "./components/create-group";
import { GroupDetail, GroupCategory } from "@/types";

const mockGroups: GroupDetail[] = [
  {
    id: "1",
    name: "Group 1",
    category: GroupCategory.DINNER,
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
    members: [
      { id: "1", name: "Rafael", email: "rafael@email.com" },
      { id: "2", name: "Karina", email: "karina@email.com" },
      { id: "3", name: "Isa", email: "isa@email.com" },
    ],
  },
  {
    id: "2",
    name: "Travel Squad",
    category: GroupCategory.TRAVEL,
    createdAt: "2026-02-01",
    updatedAt: "2026-02-01",
    members: [
      { id: "1", name: "Rafael", email: "rafael@email.com" },
      { id: "4", name: "Lucas", email: "lucas@email.com" },
    ],
  },
];

export default function Groups() {
  return (
    <div className="flex flex-col gap-4 px-8 w-full">
      <header className="flex flex-row items-center justify-between h-12 mt-4">
        <h1 className="font-montserrat text-xl text-zinc-600">
          Your contact list
        </h1>
        <CreateGroup />
      </header>

      <div className="flex flex-col gap-4 max-w-xl">
        {mockGroups.map((group) => (
          <GroupCards key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
}
