import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatISO9075, format } from "date-fns";
import { UserContext } from "../context/UserContext";

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState();

    useEffect(() => {
      fetch(`http://localhost:5010/api/post/${id}`)
      .then((res) => res.json())
      .then((data) => setPostInfo(data));
    }, [id]);
    

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5010/api/post/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
      if (res.status === 200) {
        navigate("/", { replace: true });
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!postInfo) return "";

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>

      {/* time & author */}
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      {/* <time> {format(new Date(postInfo.createdAt), "MMM d, yyy HH:mm")}</time> */}

      <div className="author">by @{postInfo.author.username}</div>

      {/* Edit button */}
      {userInfo.id === postInfo.author._id && (
        <div className="edit-button-div">
          <Link className="edit-button" to={`/edit/${postInfo._id}`}>
            <i class="fa-regular fa-pen-to-square" /> Edit This Post
          </Link>
          <Link className="delete-button" onClick={handleDelete}>
            <i class="fa-solid fa-trash"></i> Delete
          </Link>
        </div>
      )}

      {/* image */}
      <div className="post-image-div">
        <img src={`http://localhost:5010/${postInfo.cover}`} alt="" />
      </div>

      {/* content */}
      <p
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
};

export default PostPage;
