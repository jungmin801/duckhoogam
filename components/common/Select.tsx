import React, { Dispatch, SetStateAction } from "react";
import { Category, Categories } from "../../types/types";

interface CheckItemsProps {
  checkItems: string[];
  setCheckItems: Dispatch<SetStateAction<string[]>>;
}

interface SelectProps extends Categories, CheckItemsProps {}

const Select = ({ categories, checkItems, setCheckItems }: SelectProps) => {
  const defaultStyle =
    "px-2.5 py-2 text-xs text-center rounded-full w-fit border border-solid border-custom-gray-300 whitespace-nowrap inline-block";
  const checkedStyle =
    "text-white bg-custom-blue border border-solid border-custom-blue";

  // 체크여부에 따라 체크박스 배열을 업데이트한다.
  const handleCheckBox = (cateId: string) => {
    setCheckItems((prevCheckItems) =>
      prevCheckItems.includes(cateId)
        ? prevCheckItems.filter((id) => id !== cateId)
        : [...prevCheckItems, cateId]
    );
  };

  return (
    <ul className="flex flex-wrap gap-2">
      {categories?.map((category: Category) => (
        <li key={category.id}>
          <label
            className={`${defaultStyle} ${
              checkItems.includes(category.id) && checkedStyle
            }`}
          >
            <input
              type="checkbox"
              className="hidden"
              checked={checkItems.includes(category.id)}
              onChange={() => handleCheckBox(category.id)}
            />
            {category.name}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Select;
