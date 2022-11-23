import React, { useEffect, useState } from "react";
import { CardRepository } from "../components/CardRepository";
import { useDebounce } from "../hooks/debounce";
import { useLazyGetUserReposQuery, useSearchUsersQuery } from "../store/github/github.api";
export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [dropdown, setsDropdown] = useState(false)
  const debounced = useDebounce(searchValue);
  
  const {
    isLoading,
    isError,
    data
  } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus:true
  });
  const [fetchRepos, {isLoading:areReposLoading, data:repos}] = useLazyGetUserReposQuery()
  const clickHandler = (username: string) => {
      fetchRepos(username)
      setsDropdown(false)
      
  }
  useEffect(() => {
    setsDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data]);
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p className="text-center text-red-600">Something Wrong</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search users..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
  {dropdown && <ul className="list-none absolute top-[42px] left-0 right-0 overflow-y-scroll max-h-[200px] shadow-md bg-white">
          {isLoading && <p className="text-center text-gray-600">Loading...</p>}
          {data?.map(user => (
            <li
              key={user.id}
              onClick={() => clickHandler(user.login)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-500 hover:text-white transition-colours"
            >
              {user.login}
            </li>
          ))}
        </ul>}
        <div className="container overflow-y-scroll max-h-[500px]">
        {areReposLoading && <p className="text-center">Repos are loading...</p>}
        {repos?.map(repo => (
          <CardRepository repo={repo} key={repo.id}/>
        ))}
      </div>
      </div>
      
    </div>
  );
};
