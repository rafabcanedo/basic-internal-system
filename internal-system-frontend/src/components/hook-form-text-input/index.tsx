import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

interface ITextInput {
  name: string;
  type: "text" | "password" | "number";
  label: string;
  title: string;
}

export const HookFormTextInput: FC<ITextInput> = ({
  name,
  type,
  label,
  title
}) => {

  const { 
    register,
    formState: { errors }
  } = useFormContext()

  return (
   <div>
   <label className='text-xs text-zinc-600'>{title}</label>
   <Input placeholder={label} type={type} {...register(name)} />
    <p className="text-xs text-red-400">
     {errors[name]?.message as string}
    </p>
   </div>
  )
}
