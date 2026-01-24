import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface IAvatarCosts {
    name: string;
}

export const AvatarCosts = ({ name }: IAvatarCosts) => {

    const firstTwoLetters = name.trim().slice(0, 2).toUpperCase()

    return (
        <div className="flex flex-col items-center gap-2">
            <Avatar>
                <AvatarFallback>{firstTwoLetters}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-center">{name}</span>
        </div>
    )
}