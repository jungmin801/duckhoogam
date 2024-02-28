"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Category, Categories } from "../../types/types";
import { useController } from "react-hook-form";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface CheckItemsProps {
  checkItems: string[];
  setCheckItems: Dispatch<SetStateAction<string[]>>;
}

interface SelectProps extends Categories, CheckItemsProps {}

const Select = ({ categories, control, name, rules, selected }) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name, rules });

  const [value, setValue] = useState(field.value || []);

  useEffect(() => {
    setValue(selected);
  }, [selected]);

  const defaultStyle =
    "px-2.5 py-2 text-xs text-center rounded-full w-fit border border-solid border-custom-gray-300 whitespace-nowrap inline-block";
  const checkedStyle =
    "text-white bg-custom-blue border border-solid border-custom-blue";

  return (
    <ul className="flex flex-wrap gap-2 py-3">
      {categories?.map((category: Category, index: number) => (
        <li key={category.id}>
          <label
            className={`${defaultStyle} ${
              value.includes(category.id) && checkedStyle
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              value={category.name}
              checked={value.includes(category.id)}
              onChange={(e) => {
                const valueCopy = [...value];
                valueCopy[index] = e.target.checked ? category.id : null;
                field.onChange(valueCopy);
                setValue(valueCopy);
              }}
            />
            {category.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Select;
