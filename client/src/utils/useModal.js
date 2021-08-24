import { useState } from "react";

export const useModal = (initialMode = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialMode);
  const [data, setData] = useState(null); 
  return [setIsModalOpened, isModalOpened, data, setData];
};
