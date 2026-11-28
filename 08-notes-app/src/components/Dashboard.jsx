import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { MdPushPin } from "react-icons/md";

export default function Dashboard() {
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem("note");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.log("Failed load notes: ", error);
      return [];
    }
  });
  const [title, setTitle] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [openform, setOpenForm] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editIsPinned, setEditIsPinned] = useState(false);
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  // const [isCompleted, setIsCompleted] = useState(false);

  const addNotes = (e) => {
    e.preventDefault();
    const note = {
      id: Date.now(),
      title: title,
      description: description,
      isPinned: isPinned,
      isCompleted: false,
      date: date,
    };
    setNotes((prev) => [...prev, note]);
    setTitle("");
    setDescription("");
    // setIsCompleted("");
    setIsPinned(false);
    setOpenForm(false);
    setDate("");
  };

  useEffect(() => {
    localStorage.setItem("note", JSON.stringify(notes));
  }, [notes]);

  const cardsColour = [
    "bg-purple-200",
    "bg-yellow-200",
    "bg-pink-200",
    "bg-orange-200",
    "bg-violet-200",
    "bg-green-200",
  ];

  const finalResult =
    activeTab === "all"
      ? notes
      : notes.filter((item) => item.isPinned === true);

  const filtered = finalResult.filter((item) => {
    return (
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handlePin = (id) => {
    setNotes((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item,
      ),
    );
  };

  const handleCompleted = (id) => {
    console.log("clicked: ", id);
    setNotes((prev) =>
      prev.map((item) =>
        item.id == id ? { ...item, isCompleted: !item.isCompleted } : item,
      ),
    );
    // console.log("kjsdjh", item)
  };
  const deleteNote = (id) => {
    const deleted = notes.filter((item) => item.id !== id);
    setNotes(deleted);
    setShowMenu(false);
  };

  const handleEdit = (item) => {
    setEditForm(true);
    setOpenForm(false);
    setEditingId(item.id);
    setEditTitle(item.title);
    setEditDescription(item.description);
    setEditDate(item.date);
    setEditIsPinned(item.isPinned);
  };

  const editNote = (id) => {
    console.log("clicked on button");
    const updatedNote = notes.map((item) =>
      item.id === id
        ? {
            ...item,
            title: editTitle,
            description: editDescription,
            isPinned: editIsPinned,
            date: editDate,
          }
        : item,
    );
    console.log(updatedNote);
    setNotes(updatedNote);
    setTitle("");
    setDescription("");
    setDate("");
    setIsPinned(false);
    setEditForm(false);
    setShowMenu(false);
  };

  const handleCancle = () => {
    setEditForm(false);
    setOpenForm(false);
    setShowMenu(false);
    setEditingId(null);

    setEditTitle("");
    setEditDescription("");
    setEditDate("");
    setEditIsPinned(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex gap-5">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="justify-center flex items-start pt-2">
        <div className="bg-gray-200 rounded-md shadow-md p-4 w-280 h-155 relative">
          <div className="w-full justify-between flex">
            <div className="justify-center">
              <h2 className="text-3xl text-start text-emerald-950 font-bold">
                My Notes
              </h2>
              <p className="text-sm font-light">
                Write, save and organize your thoughts
              </p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-gray-100 p-1 rounded-md shadow-md gap-3 border border-gray-200">
                <CiSearch className="mt-4" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearch(e.target.value);
                  }}
                  placeholder="Search notes..."
                  className="outline-none"
                />
              </div>
              <button
                onClick={() => {
                  setOpenForm(true);
                  setEditForm(false);
                }}
                className="bg-purple-700 text-white font-bold rounded-md shadow-md p-2"
              >
                + Add Note
              </button>
            </div>
          </div>
          {(editForm || openform) && (
            <div className="absolute inset-0 flex items-start justify-center mt-30">
              <form
                onSubmit={
                  editForm
                    ? (e) => {
                        e.preventDefault();
                        editNote(editingId);
                      }
                    : addNotes
                }
                className="bg-gray-100 w-150 p-6 rounded-lg shadow-lg space-y-4"
              >
                <div className="gap-3 flex">
                  <label className="mt-2 font-bold">Title:</label>
                  <input
                    type="text"
                    placeholder="Enter Title..."
                    value={editForm ? editTitle : title}
                    onChange={(e) => {
                      editForm
                        ? setEditTitle(e.target.value)
                        : setTitle(e.target.value);
                    }}
                    className="border p-2 rounded-md outline-none border-gray-50 bg-gray-200 rounded-md shadow-md"
                  />
                </div>
                <div className="gap-3 flex">
                  <label className="mt-2 font-bold">Description:</label>
                  <input
                    type="text"
                    placeholder="Enter Description..."
                    value={editForm ? editDescription : description}
                    onChange={(e) => {
                      editForm
                        ? setEditDescription(e.target.value)
                        : setDescription(e.target.value);
                    }}
                    className="border p-2 rounded-md outline-none border-gray-50 bg-gray-200 rounded-md shadow-md"
                  />
                </div>
                <div className="gap-3 flex">
                  <label className="mt-2 font-bold">Date:</label>
                  <input
                    type="date"
                    placeholder="Enter Date..."
                    value={editForm ? editDate : date}
                    onChange={(e) => {
                      editForm
                        ? setEditDate(e.target.value)
                        : setDate(e.target.value);
                    }}
                    className="border p-2 rounded-md outline-none border-gray-50 bg-gray-200 rounded-md shadow-md"
                  />
                </div>
                <div className="gap-3 flex">
                  <label className="mt-2 font-bold">Pinned:</label>
                  <input
                    type="checkbox"
                    placeholder="Enter pinned..."
                    checked={editForm ? editIsPinned : isPinned}
                    onChange={(e) => {
                      editForm
                        ? setEditIsPinned(e.target.checked)
                        : setIsPinned(e.target.checked);
                    }}
                    className="border p-2 rounded-md outline-none border-gray-50 bg-gray-200 rounded-md shadow-md"
                  />
                </div>
                <div className="justify-between flex">
                  <button
                    type="submit"
                    className="bg-green-700 p-3 rounded-2xl font-bold text-white text-sm w-20 flex text-center justify-center"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      editForm ? handleCancle() : setOpenForm(false);
                    }}
                    className="bg-red-700 p-3 rounded-2xl font-bold text-white text-sm w-20 flex text-center justify-center"
                  >
                    Cancle
                  </button>
                </div>
              </form>
            </div>
          )}
          <div className="flex flex-wrap gap-4 mt-10">
            {filtered.map((item, index) => (
              <div
                key={item.id}
                className="bg-gray-100 rounded-xl shadow-md w-50 h-64 overflow-hidden flex flex-col relative"
              >
                <div
                  className={`${cardsColour[index % cardsColour.length]} p-2 h-10`}
                >
                  {item.isPinned ? (
                    <p className="text-purple-700 font-semibold text-sm flex gap-2">
                      <MdPushPin className="mt-1" /> Pinned
                    </p>
                  ) : (
                    <div>
                      <input
                        type="checkbox"
                        checked={item.isPinned}
                        onChange={() => handlePin(item.id)}
                        // className={`${item.isPinned === true ? "Pinned" : ""}`}
                      />
                    </div>
                  )}
                </div>

                <div className="p-3 flex flex-col flex-1">
                  <div className="flex gap-3">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCompleted(item.id)}
                    />
                    <h2
                      className={` ${item.isCompleted ? "line-through text-gray-300" : "text-xl font-bold"}`}
                    >
                      {item.title}
                    </h2>
                  </div>
                  <p
                    className={` ${item.isCompleted ? "line-through text-gray-300" : "font-sans px-5"}`}
                  >
                    {item.description}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <div className="flex gap-2">
                      <CiCalendarDate />
                      <span>{item.date}</span>
                    </div>

                    <button
                      onClick={() =>
                        setShowMenu(showMenu === item.id ? null : item.id)
                      }
                    >
                      <CiMenuKebab />
                    </button>

                    {showMenu === item.id && (
                      <div className="absolute right-2 bottom-10 bg-white shadow-lg rounded-lg p-2 z-50 flex flex-col w-24 space-y-2.5">
                        <button
                          onClick={() => handleEdit(item)}
                          className="hover:bg-gray-300 hover:text-gray-950 p-2 text-left bg-gray-500 rounded-md text-white font-bold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteNote(item.id)}
                          className="hover:bg-gray-100 p-2 text-left text-white bg-red-600 rounded-md hover:text-gray-800"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
