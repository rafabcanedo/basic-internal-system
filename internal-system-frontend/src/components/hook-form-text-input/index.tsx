import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

interface ITextInput {
  name: string;
  type: "text" | "password";
  label: string;
}

export const HookFormTextInput: FC<ITextInput> = ({
  name,
  type,
  label
}) => {

  const { 
    register,
    formState: { errors }
  } = useFormContext()

  return (
   <>
   <Input placeholder={label} type={type} {...register(name)} />
    <p className="text-xs text-red-400">
     {errors[name]?.message as string}
    </p>
   </>
  )
}
