import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");

  useEffect(() => {
    fetch("http://localhost:5010/api/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []);

  async function updatePost(ev) {
    ev.preventDefault();

    if (!title || !summary || !content || !files) {
      alert("Please fill the field properly!");
    } else {
      const data = new FormData();
      data.set("title", title);
      data.set("summary", summary);
      data.set("content", content);
      data.set("id", id);
      if (files?.[0]) {
        data.set("file", files?.[0]);
      }
      const res = await fetch("http://localhost:5010/api/post", {
        method: "PUT",
        body: data,
        credentials: "include",
      });
      if (res.ok) {
        navigate("/", { replace: true });
      }
    }
  }

  return (
    <form onSubmit={updatePost} className="edit-post">
      <h1>Edit & Udating Page</h1>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
