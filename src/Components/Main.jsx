import React, { useState } from "react";
import { RiLightbulbLine, RiLightbulbFlashLine } from "react-icons/ri";
import { GiCrossMark } from "react-icons/gi";
import { TbHandClick } from "react-icons/tb";
import { FaArrowCircleRight } from "react-icons/fa";
import { RiAddLargeFill } from "react-icons/ri";
const Main = () => {
  const [dark, setDark] = useState(false);
  const [text, setText] = useState("");
  const [data, setData] = useState("");
  const [submit, setSubmit] = useState(false);
  const [amount, setAmount] = useState("");
  const [salary, setSalary] = useState(false);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [sign, setSign] = useState("+");
  const [list, setList] = useState([]);

  const darkToggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const handleSalarySubmit = () => {
    if (amount) {
      setSalary(true);
    }
  };

  const signHandler = (e) => {
    setSign(e.target.value);
  };

  const handleSalary = (e) => {
    setAmount(e.target.value);
  };

  const handleTextInput = (e) => {
    setText(e.target.value);
  };

  const handleDataInput = (e) => {
    setData(e.target.value);
  };

  const addTransactions = () => {
    if (data && text) {
      const newTransaction = { data, text, sign };
      setList([...list, newTransaction]);

      if (sign === "+") {
        setIncome(income + parseFloat(data));
      } else if (sign === "-") {
        setExpenses(expenses + parseFloat(data));
      }

      setSubmit(true);
      setData("");
      setText("");
    }
  };

  const handleDelete = (index) => {
    const filtered = list.filter((item_, i) => i !== index);
    const deletedItem = list[index];

    if (deletedItem.sign === "+") {
      setIncome(income - parseFloat(deletedItem.data));
    } else if (deletedItem.sign === "-") {
      setExpenses(expenses - parseFloat(deletedItem.data));
    }

    setList(filtered);
  };

  return (
    <div className="bg-gray-300 h-[90%] w-11/12 md:w-[95%] lg:w-1/2 dark:bg-gray-800 rounded-md p-4 mx-auto">
      <div className="header flex items-center gap-4 mb-2">
        <span className="text-2xl font-bold dark:text-white">
          Expense Tracker
        </span>
        <button
          onClick={darkToggle}
          className="p-2 bg-gray-400 rounded-2xl dark:bg-gray-600 hover:bg-gray-500 dark:hover:bg-gray-700 transition duration-300"
        >
          {dark ? <RiLightbulbLine /> : <RiLightbulbFlashLine />}
        </button>
      </div>
      <div className="Account flex flex-col md:flex-row items-center justify-between mb-4">
        <span className="font-semibold text-gray-600 dark:text-gray-200">
          {salary ? (
            "Your Balance"
          ) : (
            <span className="text-red-600 flex items-center gap-1">
              Enter Your Balance First <FaArrowCircleRight />
            </span>
          )}
        </span>
        <span className="font-bold text-2xl dark:text-white mt-2 md:mt-0">
          {salary ? (
            `₹ ${(Number(amount) + income - expenses).toFixed(2)}`
          ) : (
            <div className="flex items-center">
              <input
                type="number"
                placeholder="Enter Your Salary here"
                className="outline-none border-b-2 bg-transparent border-violet-500 text-black font-semibold no-spinners w-full md:w-auto"
                value={amount}
                onChange={handleSalary}
              />
              <button
                className="p-2 bg-violet-600 rounded-full text-white ml-2 font-thin
                 hover:bg-violet-700 transition duration-300 disabled:bg-slate-200 disabled:text-black"
                onClick={handleSalarySubmit}
              >
                <TbHandClick />
              </button>
            </div>
          )}
        </span>
      </div>
      <div className="cards flex justify-evenly items-center gap-4">
        <div className="income flex flex-col items-center p-4 bg-white dark:bg-slate-700 text-lg font-bold text-green-500 rounded-md shadow-md">
          <span>Income</span>
          <span>{income.toFixed(2)}</span>
        </div>
        <div className="expenses flex flex-col items-center p-4 bg-white dark:bg-slate-700 text-lg font-bold text-red-600 rounded-md shadow-md">
          <span>Expenses</span>
          <span>{expenses.toFixed(2)}</span>
        </div>
      </div>
      <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
        History
      </span>
      <hr className="border-cyan-500 my-1" />
      <div className="container flex flex-col justify-between bg-red h-[60%]">

      <div className="history p-2 mb-2 max-h-60 overflow-y-auto scrollbar-none scrollbar-thumb-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
        {list.length > 0 ? (
          <ul className="space-y-2">
            {list.map((e, index) => (
              <li
                key={index}
                className={`list-none border-l-4 p-3 rounded-sm ${
                  e.sign === "-" ? "border-red-500" : "border-green-500"
                } bg-white dark:bg-slate-700 dark:text-gray-200 flex justify-between items-center shadow-md`}
              >
                <span>{e.text}</span>
                <div className="flex items-center gap-2">
                  <span>
                    {e.sign} {parseFloat(e.data).toFixed(2)}
                  </span>
                  <GiCrossMark
                    className="cursor-pointer text-red-600 hover:text-red-800 transition duration-300"
                    onClick={() => handleDelete(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">No History</div>
        )}
      </div>
      <div className="New_Transaction sticky">
        <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
          Add New Transactions
        </span>
        <hr className="border-cyan-500 my-1" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 mt-2">
          <div className="flex flex-col md:flex-row items-center gap-2 w-full md:w-1/2">
            <label htmlFor="" className="dark:text-white w-full md:w-auto">
              Add Text
            </label>
            <input
              type="text"
              placeholder="Add the Label"
              className="outline-none border-b-2 bg-transparent p-1 text-black font-semibold w-full"
              value={text}
              onChange={handleTextInput}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center w-full md:w-1/2">
          
            <span htmlFor="" className="dark:text-white w-full md:w-auto">
              Amount
            </span>
            <select
              name=""
              id=""
              className="outline-none bg-transparent text-lg"
              onChange={signHandler}
            >
              <option value="+">+</option>
              <option value="-">-</option>
            </select>
            <input
              type="number"
              placeholder="Enter the amount"
              className="outline-none border-b-2 bg-transparent p-1 text-black font-semibold no-spinners w-full"
              value={data}
              onChange={handleDataInput}
            />
          </div>
      <button
        className={`p-2 ${
          !data || !text
            ? "bg-slate-200 text-black cursor-not-allowed"
            : "bg-violet-600 text-white hover:bg-violet-700 transition duration-300"
        } rounded-full float-right mr-3 mt-4`}
        onClick={addTransactions}
        disabled={!data || !text}
      >
        <RiAddLargeFill/>
      </button>
        </div>
      </div>
      </div>

    </div>
  );
};

export default Main;
