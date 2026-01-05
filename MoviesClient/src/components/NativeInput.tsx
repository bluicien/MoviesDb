import { forwardRef } from "react"

type InputProps = {
  label: string,
  placeholder?: string,
  type: "text" | "password" | "email"
}

const NativeInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <label className="flex flex-col text-white font-semibold gap-1 md:w-100 capitalize" >
    {props.label}
    <input
      ref={ref}
      {...props}
      placeholder={props.placeholder}
      className="text-black bg-white rounded-sm px-2 py-1"
    />
  </label>
  )
});

NativeInput.displayName = "NativeInput";

export default NativeInput;
