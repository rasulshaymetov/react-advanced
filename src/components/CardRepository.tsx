import React, { useState } from "react";
import { IRepo } from "../models/models";
import { Link } from "react-router-dom";
import { useActions } from "../hooks/action";
import { useAppSelector } from "../hooks/redux";
export const CardRepository = ({ repo }: { repo: IRepo }) => {
  const { addFavourite, removeFavourite } = useActions();
  const addToFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addFavourite(repo.html_url);
    setisFav(true)
  };
  const deleteFromFavourite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    removeFavourite(repo.html_url);
    setisFav(false)
  };
  const { favourites } = useAppSelector((state) => state.github);
  const [isFav, setisFav] = useState(favourites.includes(repo.html_url));
  return (
    <a target="_blank" href={repo.html_url}>
      <div className="border py-3 px-5 rounded mb-2 hover:shadow-mb hover:bg-gray-100 transtion-all cursor-pointer">
        <h2 className="text-lg font-weight-500">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold">{repo.forks}</span>
          Watchers: <span className="font-bold mb-2">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>
        {!isFav && (
          <button
            className="py-2 px-4 bg-yellow-400 rounded hover:shadow-md transition-all"
            onClick={addToFavourite}
          >
            Add
          </button>
        )}
        {isFav && (
          <button
            className="py-2 px-4 bg-red-400 rounded hover:shadow-md transition-all"
            onClick={deleteFromFavourite}
          >
            Delete
          </button>
        )}
      </div>
    </a>
  );
};
