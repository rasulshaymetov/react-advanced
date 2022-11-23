import React from "react";
import { useAppSelector } from "../hooks/redux";

export const Favourites = () => {
  const { favourites } = useAppSelector((state) => state.github);
  if (favourites.length === 0) return <p className="text-center">No Items</p>;
  return (
    <div className="flex justify-center pt-2 mx-auto h-screen w-scren">
      <ul className="list-none">
        {favourites.map((f) => (
          <li className="mb-2 hover:bg-gray-200 pt-5 flex justify-center" key={f}>
            <a href={f} target="_blank">{f}</a>
          </li>
        ))}
      </ul>
      ;
    </div>
  );
};
