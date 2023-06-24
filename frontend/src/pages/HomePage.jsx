import { useEffect, useState } from "react";
import Post from "../components/Post";


const HomePage = () => {
  const [posts, setPosts] = useState([]);
    
    useEffect(() => {
      fetch("http://localhost:5010/api/post")
      .then((res) => res.json())
      .then((posts) => setPosts(posts));
    }, []);
    
  return <>
    {posts.length > 0 && posts.map((post) => 
      <Post {...post }/>
    )}
  </>;
};

export default HomePage;




// // ---------------Loading Spin not working---------------------------//

// import { useEffect, useState } from "react";
// import Post from "../components/Post";
// import LoadingSpinner from "../components/spinner/LoadingSpinner";


// const HomePage = ({_id,title,summary,cover,content,createdAt,author}) => {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
    
//     useEffect(() => {
//       setIsLoading(true)
//       fetch("http://localhost:5010/api/post")
//       .then((res) => res.json())
//       .then((posts) => setPosts(posts));
//       setIsLoading(false)

//     }, []);
    
//     if(isLoading) return <LoadingSpinner/>
//   return <>
//     {posts.length > 0 && posts.map((post) => 
//       <Post {...post }/>
//     )}
//   </>;
// };

// export default HomePage;
