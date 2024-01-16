
import React, { useEffect, useState } from "react";
import "./Posts.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";
import { postDetails } from "../redux/user/userSlice";

function Posts() {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);



  const handlePostChange = (event) => {
    setPostText(event.target.value);
  };

  const dispatch = useDispatch();
  const { currentUser, post } = useSelector((e) => e.user);

  useEffect(() => {
    // This will run whenever the 'post' state changes
    console.log("Post state changed:", post);
    // You can add any additional logic or side effects here
  }, [post]);

  const handlePostSubmit = (event) => {
    event.preventDefault();
    if (postText.trim() !== "") {
      setPosts((prevPosts) => [
        { id: "post", text: postText },
        ...prevPosts,
      ]);



      axios.post('api/auth/posts', { postText, currentUser })
        .then(res => {
          const responseData = (res.data).filter((item) => item !== null);
          dispatch(postDetails(responseData));

        })
        .catch(err => {
          console.log("galat hai ye")

        })


      setPostText("");
    }
  }

  return (
    <div className="App">
      <h1 style={{ fontWeight: 'bold' }}>React Posting App</h1>
      <div className="form-container">
        <form>
          <textarea
            type="text"
            rows="4"
            cols="50"
            placeholder="What's on your mind?"
            value={postText}
            onChange={handlePostChange}
          />
          <br />
          <button type="submit" onClick={handlePostSubmit}>
            Post
          </button>
        </form>
      </div>
      <h2 style={{ textAlign: 'left', fontWeight: 'bold' }}>Posts</h2>
      <div className="posts">

        {post.map((e) => (
          <div className="user">
            <h1>Anonymous</h1>
            <div key={e.id} className="post">

              {e}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
