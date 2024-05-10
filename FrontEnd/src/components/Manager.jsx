import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({
    websiteUrl: "",
    username: "",
    password: "",
  });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editingPasswordId, setEditingPasswordId] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    getAllPasswords();
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/eyecross.png";
    }
  };

  const savePassword = async () => {
    if (
      form.websiteUrl.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      try {
        const response = await axios.post("http://localhost:8080/save", {
          websiteUrl: form.websiteUrl,
          username: form.username,
          password: form.password,
        });
        const newPassword = response.data;
        setPasswordArray((prevPasswords) => [...passwordArray, newPassword]);
        setform({ websiteUrl: "", username: "", password: "" });
        // window.location.reload();
        toast("Password saved!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        // console.error("Error saving password:", error);
        toast.error("Error: Password not saved!");
      }
    } else {
      toast.error("Error: Password not saved!");
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    if (passwordToEdit) {
      setform({
        websiteUrl: passwordToEdit.websiteUrl,
        username: passwordToEdit.username,
        password: passwordToEdit.password,
      });
      setEditingPasswordId(passwordToEdit); // Set the ID of the password being edited
      setIsUpdate(true); // Set isUpdate to true
    } else {
      console.error("Password not found for editing");
      toast.error("Error: Password not found for editing!");
    }
  };

  const updatePassword = async () => {
    const id = editingPasswordId.id; // Get the ID of the password being edited
    console.log("id for updating the user" + id);
    try {
      const updatedPasswordData = {
        websiteUrl: form.websiteUrl,
        username: form.username,
        password: form.password,
      };
      const response = await axios.put(
        `http://localhost:8080/edit/${id}`,
        updatedPasswordData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const updatedPassword = response.data;
      setPasswordArray(
        passwordArray.map((item) => (item.id === id ? updatedPassword : item))
      );
      toast("Password updated!", { position: "top-right" });
      setform({ websiteUrl: "", username: "", password: "" });
      setEditingPasswordId(null); // Clear the editing password ID
      setIsUpdate(false); // Reset isUpdate to false
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Error: Unable to update password!");
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting password with id ", id);
    let c = window.confirm("Do you really want to delete this password?");
    if (c) {
      try {
        await axios.delete(`http://localhost:8080/delete/${id}`);
        setPasswordArray(passwordArray.filter((item) => item.id !== id));
        toast("Password Deleted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } catch (error) {
        console.error("Error deleting password:", error);
        toast.error("Error: Unable to delete password!");
      }
    }
  };

  const getAllPasswords = async () => {
    try {
      const response = await axios.get("http://localhost:8080/fetch");

      const passwordsFromBackend = response.data;
      //   console.log(
      //     "Data from backend---> ",
      //     JSON.stringify(passwordsFromBackend, null, 2)
      //   );
      setPasswordArray(passwordsFromBackend);
    } catch (error) {
      console.error("Error retrieving passwords from backend:", error);
    }
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className=" p-3 md:mycontainer min-h-[88.2vh] ">
        <h1 className="text-4xl font-bold text-center text">
          <span className="text-green-500"> &lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-lg text-center text-green-900">
          Your own Password Manager
        </p>

        <div className="flex flex-col items-center gap-8 p-4 text-black">
          <input
            value={form.websiteUrl}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="w-full p-4 py-1 border border-green-500 rounded-full"
            type="text"
            name="websiteUrl"
            id="websiteUrl"
          />
          <div className="flex flex-col justify-between w-full gap-8 md:flex-row">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full p-4 py-1 border border-green-500 rounded-full"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full p-4 py-1 border border-green-500 rounded-full"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>
          {isUpdate ? (
            <button
              onClick={updatePassword}
              className="flex items-center justify-center gap-2 px-8 py-2 bg-green-400 border border-green-900 rounded-full hover:bg-green-300 w-fit"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Update
            </button>
          ) : (
            <button
              onClick={savePassword}
              className="flex items-center justify-center gap-2 px-8 py-2 bg-green-400 border border-green-900 rounded-full hover:bg-green-300 w-fit"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Save
            </button>
          )}
        </div>

        <div className="passwords">
          <h2 className="py-4 text-2xl font-bold">Your Passwords</h2>
          {passwordArray.length === 0 && <div> No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="w-full mb-10 overflow-hidden rounded-md table-auto">
              <thead className="text-white bg-green-800">
                <tr>
                  <th className="py-2">Website URL</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 text-center border border-white">
                      <div className="flex items-center justify-center ">
                        <a href={item.websiteUrl} target="_blank">
                          {item.websiteUrl}
                        </a>
                        <div
                          className="cursor-pointer lordiconcopy size-7"
                          onClick={() => {
                            copyText(item.websiteUrl);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center border border-white">
                      <div className="flex items-center justify-center ">
                        <span>{item.username}</span>
                        <div
                          className="cursor-pointer lordiconcopy size-7"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 text-center border border-white">
                      <div className="flex items-center justify-center ">
                        <span>{item.password}</span>
                        <div
                          className="cursor-pointer lordiconcopy size-7"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "3px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="justify-center py-2 text-center border border-white">
                      <span
                        className="mx-1 cursor-pointer"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="mx-1 cursor-pointer"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
