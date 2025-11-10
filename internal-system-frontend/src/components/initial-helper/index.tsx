import Link from "next/link";
import { ElementType } from "react";

type InitialCardsProps = {
 name: string;
 link: string;
 icon: ElementType;
}

export const InitialHelper = ({ name, link, icon: Icon }: InitialCardsProps) => {
 return (
  <Link href={link}>
  <button className="h-10 px-12 bg-white border border-zinc-500 rounded-lg cursor-pointer hover:bg-gray-50">
   <Icon className="w-4 h-4  text-zinc-600 hover:text-zinc-700" />
   <span className="text-lg font-opens text-zinc-600 hover:text-zinc-700">
    {name}
   </span>
  </button>
  </Link>
 )
}