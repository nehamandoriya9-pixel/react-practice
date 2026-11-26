import React, { Children, useEffect, useState } from "react";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : [];
  });
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [types, setTypes] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [editAmount, setEditAmount] = useState("");
  const [editType, setEditType] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editOpenForm, setEditOpenForm] = useState(false);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(users));
  }, [users]);

  const formOpen = (e) => {
    e.preventDefault();
    setOpenForm(true);
  };

  const addTransaction = (e) => {
    e.preventDefault();
    const user = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      type: type,
      category: category,
      date: date,
    };

    setUsers([...users, user]);
    // console.log(setUsers)
    setTitle("");
    setAmount("");
    setCategory("");
    setType("");
    setOpenForm(false);
  };

  const deleteUser = (id) => {
    const deleted = users.filter((item) => item.id !== id);
    setUsers(deleted);
  };

  const filteredUser = () =>
    users.filter((item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()),
    );

  let filteredData = filteredUser();

  if (types === "income") {
    filteredData = filteredData.filter((item) => item.type === "income");
    console.log(filteredData);
  } else if (types === "expense") {
    filteredData = filteredData.filter((item) => item.type === "expense");
    console.log(filteredData);
  }

  const totalIncome = users.reduce((total, item) => {
    // console.log("type: ", item.type);
    // console.log("amount: ", Number(item.amount));
    if (item.type === "income") {
      return total + Number(item.amount);
    }
    return total;
  }, 0);
  // console.log(totalIncome);

  const totalExpense = users.reduce((total, item) => {
    if (item.type === "expense") {
      return total + Number(item.amount);
    }
    return total;
  }, 0);

  const totalBalane = totalIncome - totalExpense;

  // const totalTransaction = users.filter((item) => item.type === "expense").length
  const totalTransaction = users.length;
  // console.log(totalTransaction)

  const editForm = (item) => {
    console.log("openedit");
    setEditOpenForm(true);
    console.log("editopened: ", editOpenForm);
    setEditTitle(item.title);
    setEditAmount(item.amount);
    setEditCategory(item.category);
    setEditType(item.type);
    setEditingId(item.id);
    setEditDate(item.date);
  };

  const editFormSave = (id) => {
    const updatedForm = users.map((item) =>
      item.id === id
        ? {
            ...item,
            title: editTitle,
            amount: Number(editAmount),
            type: editType,
            category: editCategory,
            date: editDate,
          }
        : item,
    );
    setUsers(updatedForm);
    console.log(updatedForm);
    setEditTitle("");
    setEditAmount("");
    setEditCategory("");
    setEditType("");
    setEditDate("");
    setEditOpenForm(false);
  };

  return (
    <div className="min-h-screen bg-lime-200 flex justify-center items-center">
      <div className="bg-lime-100 rounded-2xl shadow-2xl p-2 space-y-3">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-indigo-900 text-center">
            Income & Expense Tracker
          </h2>
          <p className="text-sm text-center font-light">
            Take control of your finances with beautiful insights
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-10">
          <div className="bg-lime-200 rounded-md shadow-md p-9 text-sm font-bold">
            <span>Total Income</span>
            <p>{totalIncome}</p>
          </div>
          <div className="bg-lime-200 rounded-md shadow-md p-9 text-sm font-bold">
            <span>Total Expense</span>
            <p>{totalExpense}</p>
          </div>
          <div className="bg-lime-200 rounded-md shadow-md p-9 text-sm font-bold">
            <span>Balance</span>
            <p>{totalBalane}</p>
          </div>
          <div className="bg-lime-200 rounded-md shadow-md p-9 text-sm font-bold">
            <span>Transactions</span>
            <p>{totalTransaction}</p>
          </div>
        </div>
        <div className="mt-10 items-center justify-center flex gap-4 p-2">
          <div className="bg-gradient-to-r from-lime-500 to-lime-300 via-lime-400 p-2 rounded-2xl shadow-md font-bold text-green-950 space-x-2">
            <span>+</span>
            <button onClick={formOpen}>Add Transaction</button>
          </div>
        </div>
        <div className="">
          {(editOpenForm || openForm) && (
            <div className="bg-lime-200 p-2 space-y-5">
              <h2 className="font-bold">Add Transaction</h2>
              <form
                action=""
                className="space-y-4"
                onSubmit={
                  editOpenForm
                    ? (e) => {
                        e.preventDefault();
                        editFormSave(editingId);
                      }
                    : addTransaction
                }
              >
                <div className="gap-3 flex">
                  <label htmlFor="" className="font-black">
                    Title:{" "}
                  </label>
                  <input
                    type="text"
                    required
                    value={editOpenForm ? editTitle : title}
                    onChange={(e) => {
                      editOpenForm
                        ? setEditTitle(e.target.value)
                        : setTitle(e.target.value);
                    }}
                    className="bg-lime-50 rounded-md shadow-md p-1"
                    placeholder="eg. Grocery"
                  />
                </div>
                <div className="gap-3 flex">
                  <label htmlFor="" className="font-black">
                    Amount:{" "}
                  </label>
                  <input
                    type="number"
                    required
                    value={editOpenForm ? editAmount : amount}
                    onChange={(e) => {
                      editOpenForm
                        ? setEditAmount(e.target.value)
                        : setAmount(e.target.value);
                    }}
                    className="bg-lime-50 rounded-md shadow-md p-1"
                    placeholder="eg. 500"
                  />
                </div>
                <div className="gap-3 flex">
                  <label htmlFor="" className="font-black">
                    Type:{" "}
                  </label>
                  <select
                    name="type"
                    value={editOpenForm ? editType : type}
                    onChange={(e) => {
                      editOpenForm
                        ? setEditType(e.target.value)
                        : setType(e.target.value);
                    }}
                    id="type"
                    className="bg-lime-50 rounded-md w-sm p-2 font-light outline-none"
                  >
                    <option
                      value=""
                      className="font-light outline-none text-sm"
                    >
                      Select type
                    </option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div className="gap-3 flex">
                  <label htmlFor="" className="font-black">
                    Category:{" "}
                  </label>
                  <select
                    name="category"
                    value={editOpenForm ? editCategory : category}
                    onChange={(e) => {
                      editOpenForm
                        ? setEditCategory(e.target.value)
                        : setCategory(e.target.value);
                    }}
                    id="category"
                    className="bg-lime-50 rounded-md w-sm p-2 font-light outline-none"
                  >
                    <option value="" disabled selected>
                      Select Category
                    </option>
                    <option value="food">Food</option>
                    <option value="shopping">Shopping</option>
                    <option value="salary">Salary</option>
                    <option value="bills">Bills</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="gap-3 flex">
                  <label htmlFor="category" className="font-black">
                    Date:{" "}
                  </label>
                  <input
                    type="date"
                    required
                    value={editOpenForm ? editDate : date}
                    onChange={(e) => {
                      editOpenForm
                        ? setEditDate(e.target.value)
                        : setDate(e.target.value);
                    }}
                    className="bg-lime-50 rounded-md w-sm p-2 font-light outline-none"
                  />
                </div>
                <div className="justify-between flex gap-4">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-lime-500 to-lime-300 via-lime-400 p-2 rounded-2xl shadow-md font-bold text-green-950 w-sm"
                  >
                    {editOpenForm ? "Save" : "Add Transaction"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      editOpenForm
                        ? setEditOpenForm(false)
                        : setOpenForm(false);
                    }}
                    className="bg-gradient-to-r from-red-500 to-red-600 via-red-700 p-2 rounded-2xl shadow-md font-bold text-white w-sm"
                  >
                    Cancle
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
        <div className="bg-lime-200 rounded-md shadow-md">
          <div className="justify-between flex">
            <div className="p-2">
              <span className="text-lg font-bold">Recent Transaction</span>
              <p className="text-sm font-light">Your Financial Activity</p>
            </div>
            <div className="mt-3 p-2 gap-2 flex">
              <input
                type="text"
                required
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Transaction..."
                className="bg-lime-50 rounded-md shadow-md text-sm p-2 outline-none border border-lime-200"
              />
              <select
                value={types}
                onChange={(e) => setTypes(e.target.value)}
                className="bg-lime-50 rounded-md shadow-md text-sm p-2 outline-none border border-lime-200"
              >
                <option value="">All types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          {users.length === 0 && (
            <div className="justify-center items-center mt-10">
              <h1 className="text-center text-2xl font-bold">$</h1>
              <h2 className="font-medium text-2xl text-center">
                please create your transaction...
              </h2>
              <p className="font-light text-sm text-center">
                Start by adding your first transaction
              </p>
            </div>
          )}
          {filteredData.length === 0 && (
            <div className="justify-center items-center mt-10">
              <h1 className="text-center text-2xl font-bold">$</h1>
              <h2 className="font-medium text-2xl text-center">
                No Transactions Found
              </h2>
            </div>
          )}
          <div className="grid grid-cols-4  gap-4 p-2">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="p-2 bg-lime-100 flex flex-col gap-2 rounded-md"
              >
                <span className="text-sm  font-bold text-lime-900">
                  Title: {item.title}
                </span>
                <span className="text-sm  font-bold text-lime-900">
                  Amount: {item.amount}
                </span>
                <span className="text-sm  font-bold text-lime-900">
                  Type: {item.type}
                </span>
                <span className="text-sm  font-bold text-lime-900">
                  Category: {item.category}
                </span>
                <span className="text-sm  font-bold text-lime-900">
                  Date: {item.date}
                </span>
                <div className="justify-between flex">
                  <button
                    onClick={() => deleteUser(item.id)}
                    className="bg-red-600 p-2 font-bold text-sm text-white rounded-md shadow-md"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => editForm(item)}
                    className="bg-gray-600 p-2 font-bold text-sm text-white rounded-md shadow-md"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
