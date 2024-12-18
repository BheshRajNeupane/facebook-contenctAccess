import { useEffect, useState } from "react";
import { Comments } from "./Comments.jsx";
import { Page } from "./Page.jsx";
export function Posts({ selectedPage }) {
  const [posts, setPosts] = useState([]); // List of posts
  const [selectedPost, setSelectedPost] = useState(null); // Selected post
  const [isOpen, setIsOpen] = useState(false); // Sidebar toggle state

  // const posts_url = `${import.meta.env.VITE_APP_META_URL}/${
  //   import.meta.env.VITE_APP_GRAPH_VERSION
  // }/${selectedPage.id}/posts?fields=id,message&access_token=${
  //   selectedPage.access_token
  // }`;
  const posts_url = `http://127.0.0.1:3000/posts/${selectedPage.id}?token=${selectedPage.access_token}`;

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postDetails = await fetch(posts_url);
       

        const postData = await postDetails.json();
        setPosts(postData.data || []);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    }
    fetchPosts();
  }, [posts_url]);

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post
    setIsOpen(false);
  };

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-2 z-20 p-3 bg-blue-600  text-white rounded-3xl shadow-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {isOpen ? "Close" : "Posts"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gradient-to-b from-blue-600 to-purple-700 text-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 transition-transform duration-300 ease-in-out  z-10`}
      >
        {/* Sidebar Header */}
        <div className="px-6 py-4 bg-blue-800 text-lg font-bold text-center">
          List of Posts
        </div>

        {/* Scrollable Menu */}
        <div className="overflow-y-auto h-[calc(100%-4rem)] p-4 space-y-2">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <button
                key={post.id || index}
                onClick={() => handlePostClick(post)}
                className="block w-full text-left px-4 py-2 rounded-md bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
              >
                Post {index + 1}
              </button>
            ))
          ) : (
            <p className="text-center">No posts available</p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-grow ml-0 md:ml-64 p-6 transition-opacity ${
          isOpen ? "opacity-50" : "opacity-100"
        }`}
      >
        {selectedPost ? (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-2">Post Details</h2>
            <p>
              {selectedPost.message
                ? selectedPost.message
                : "This post does not contain a message."}
            </p>

            {/* Comments Component */}
            <Comments
              selectedPage={selectedPage}
              selectedPostId={selectedPost.id}
            />

            <button
              onClick={() => setSelectedPost(null)} // Deselect post and return to post list
              className="mt-4 p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Back to Posts
            </button>
          </div>
        ) : (
          <Page pageName={selectedPage.name} />
        )}
      </div>
    </div>
  );
}
