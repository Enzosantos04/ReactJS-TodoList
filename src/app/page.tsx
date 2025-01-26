"use client";
import { Header } from "./components/header";
import { useState } from "react";
import { Item } from "@/types/items";

export default function App() {
  const [list, setList] = useState<Item[]>([]);
  const [itemInput, setItemInput] = useState("");
  function addItem() {
    // add item to list
    if (itemInput.trim() === "") return alert("Please enter your task");
    setList([
      ...list,
      { id: list.length + 1, label: itemInput, checked: false },
    ]);
    setItemInput("");
  }
  function deleteItem(id: number) {
    // delete item from list
    setList(
      list.filter((item) => {
        return item.id !== id;
      })
    );
  }
  function handleCheck(id: number) {
    // toggle checkbox
    const newList = [...list];
    setList(
      newList.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        }
        return item;
      })
    );
  }
  return (
    <div className="bg-blue-200 w-screen h-screen">
      <Header />
      <div className="bg-blue-400 h-20 p-6 flex justify-center">
        <h1 className="text-3xl mr-4">🚀</h1>
        <input
          type="text"
          className="w-96 rounded-full p-3 shadow-zinc-900 shadow-md text-black"
          placeholder="Type your task here..."
          value={itemInput}
          onChange={(e) => setItemInput(e.target.value)}
        />
        <button
          className="ml-6 bg-blue-950 px-4 py-2 flex hover:bg-blue-600  font-semibold transform transition-transform hover:scale-105 rounded-md text-center cursor-pointer shadow-zinc-900 shadow-md items-center "
          onClick={addItem}
        >
          Submit
        </button>
      </div>
      <div className=" flex justify-center items-center">
        <div className="h-auto w-80 bg-blue-950 text-center mt-10 rounded-md  shadow-black shadow-md ">
          <h1 className="text-xl uppercase mt-2 font-semibold">My tasks 📋 </h1>
          <ul className="">
            {list.map((item) => {
              return (
                <li
                  key={item.id}
                  className="font-semibold uppercase mt-3 rounded-full bg-blue-400 m-5 p-2"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={item.checked}
                    onChange={() => handleCheck(item.id)}
                  />
                  {item.label}
                  <button className="ml-2" onClick={() => deleteItem(item.id)}>
                    ❌
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
