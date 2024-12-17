import { useState, useEffect } from "react";

export function Comments({ selectedPage, selectedPostId }) {
  const [comments, setComments] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);
  // const limit = 2;

  // const comments_url = `${import.meta.env.VITE_APP_META_URL}/${
  //   import.meta.env.VITE_APP_GRAPH_VERSION
  // }/${selectedPostId}/comments?limit=${limit}&fields=id,message&access_token=${
  //   selectedPage.access_token
  // }`;
  const comments_url = `http://127.0.0.1:3000/${selectedPostId}/comments?token=${selectedPage.access_token}`;
  async function getComments(url) {
    try {
      const commentsDetails = await fetch(url);
      const commentsData = await commentsDetails.json();

      // Update comments and pagination URLs
      setComments(commentsData.data || []);
     

      setNextPage(commentsData.paging?.next || null);
      setPrevPage(commentsData.paging?.previous || null);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  useEffect(() => {
    getComments(comments_url);
  }, [selectedPostId]); // Re-run whenever selectedPostId changes

  return (
    <div className="overflow-hidden">
      {/* Conditionally render the table only if there are comments */}
      {comments.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Comment ID</th>
              <th className="px-4 py-2 border">Message</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(
              (comment) =>
                comment.message ? (
                  <tr key={comment.id}>
                    <td className="px-4 py-2 border">{comment.id}</td>
                    <td className="px-4 py-2 border">{comment.message}</td>
                  </tr>
                ) : null // Skip the row if there is no message
            )}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4">No comments yet</div>
      )}

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between">
        {prevPage && (
          <button
            onClick={() => getComments(prevPage)}
            // disabled={!prevPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Previous
          </button>
        )}

       { nextPage && ( <button
          onClick={() => getComments(nextPage)}
          // disabled={!nextPage}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Next
        </button>)
        }
      </div>
    </div>
  );
}
