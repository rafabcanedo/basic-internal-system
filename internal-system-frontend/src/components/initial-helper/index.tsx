import Link from "next/link";
import { ElementType } from "react";

type InitialCardsProps = {
  name: string;
  link?: string;
  icon: ElementType;
};

export const InitialHelper = ({ name, link, icon: Icon }: InitialCardsProps) => {
  const buttonContent = (
    <div
      className="w-56 py-2 bg-white border border-zinc-500 rounded-lg cursor-pointer hover:bg-gray-50 flex flex-row items-center justify-center gap-2"
    >
      <Icon className="w-4 h-4 text-zinc-600 hover:text-zinc-700" />
      <span className="text-sm font-opens text-zinc-600 hover:text-zinc-700">
        {name}
      </span>
    </div>
  );

  return link ? <Link href={link}>{buttonContent}</Link> : buttonContent;
};
