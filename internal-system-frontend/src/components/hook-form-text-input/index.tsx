import React, { FC } from 'react'
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';

type InputType = "text" | "password" | "number" | "email" | "tel";
interface ITextInput {
  name: string;
  type: InputType;
  label: string;
  title: string;
  disabled?: boolean;
}

export const HookFormTextInput: FC<ITextInput> = ({
  name,
  type,
  label,
  title,
  disabled,
}) => {

  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <label className='text-xs text-zinc-600'>{title}</label>
      <Input placeholder={label} type={type} {...register(name)} disabled={disabled} className='disabled:border-zinc-400 disabled:cursor-not-allowed' />
      <p className="text-xs text-red-400">
        {errors[name]?.message as string}
      </p>
    </div>
  )
}
