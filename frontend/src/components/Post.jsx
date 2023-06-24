import { formatISO9075, format } from "date-fns";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, cover, content, createdAt, author }) => {
  return (
    <Link to={`/post/${_id}`}>
      <div className="post">
        <div className="img-div">
          <img src={"http://localhost:5010/" + cover} alt="" />
        </div>
        <div>
          <h2>{title}</h2>
          <p>
            <a href="/">{author.username}: </a>
            {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
            <time> {format(new Date(createdAt), "MMM d, yyy HH:mm")}</time>
          </p>
          <p>{summary}</p>
        </div>
      </div>
    </Link>
  );
};

export default Post;
