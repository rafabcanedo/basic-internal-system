import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ContactCategory } from "@/mocks/types";

type SelectCategoryProps = {
 value: ContactCategory | undefined;
 onValueChange: (value: ContactCategory) => void;
};

export const SelectCategory: React.FC<SelectCategoryProps> = ({ value, onValueChange }) => {
 return (
  <Select
   value={value}
   onValueChange={(val) => onValueChange(val as ContactCategory)}
  >
   <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a category" />
   </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="work">Work</SelectItem>
          <SelectItem value="family">Family</SelectItem>
          <SelectItem value="friend">Friend</SelectItem>
        </SelectGroup>
      </SelectContent>
  </Select>
 )
}