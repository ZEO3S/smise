import Image from "next/image";
import { PropsWithChildren } from "react";

import Button from "../button";
import Option from "./option";
import SelectContextProvider from "./context";

import ArrowSVG from "@/assets/svgs/arrow.svg";
import { SelectOption } from "@/types/components/select";
import { useSelectToggle } from "@/hooks/useSelectToggle";
import { useClickOutsideHandler } from "@/hooks/useClickOutsideHandler";

interface Props extends PropsWithChildren {
  selectedOption: SelectOption;
}

export default function Select({ selectedOption, children }: Props) {
  const { isOpen, closeSelect, toggleSelect } = useSelectToggle();
  const FieldsetRef = useClickOutsideHandler<HTMLFieldSetElement>(closeSelect);

  return (
    <fieldset className='relative' ref={FieldsetRef} role='combobox'>
      <Button
        className='flex justify-between gap-1 w-full p-2 border border-default-color border-opacity-10 select-none'
        onClick={toggleSelect}
      >
        {selectedOption?.label}
        <Image
          className={isOpen ? "rotate-180 " : " " + "select-none"}
          src={ArrowSVG}
          alt='토글 버튼'
        />
      </Button>
      <SelectContextProvider value={selectedOption}>
        {isOpen && (
          <legend
            className='absolute w-full bg-white z-10'
            role='listbox'
            onClick={closeSelect}
          >
            {children}
          </legend>
        )}
      </SelectContextProvider>
    </fieldset>
  );
}

Select.Option = Option;
