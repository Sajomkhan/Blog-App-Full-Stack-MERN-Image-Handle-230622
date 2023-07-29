
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");


  const navigate = useNavigate();

  async function createNewPost(e) {
    if (!title || !summary || !content || !files ){
      alert("Please fill the field properly!");
    }else{
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("file", files[0]);
  
      e.preventDefault();
      const res = await fetch("http://localhost:5010/api/post", {
        method: "POST",
        body: data,
        credentials: "include",
      });
      if (res.ok) {
        navigate("/", { replace: true });
      }
    }
  }

  return (
    <form className="create-post" onSubmit={createNewPost}>
      <h1>Create Your Own Post</h1>
      <input
        type="text"
        placeholder={"Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder={"Summary"}
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        value={content}
        onChange={(newvalue) => setContent(newvalue)}
        placeholder={"Write here your content"}
        modules={modules}
        formats={formats}
      />
      <button>Create Post</button>
    </form>
  );
};

export default CreatePost;

