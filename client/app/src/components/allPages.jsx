import { useEffect, useState } from "react";
import { Posts } from "./Posts.jsx";

export function AllPage() {
  const [allPage, setAllPage] = useState(null); // Stores all pages
  const [page, setPage] = useState(null); // Stores the selected page

  // const all_pages = `${
  //   import.meta.env.VITE_APP_META_URL
  // }/me/accounts?access_token=${
  //   import.meta.env.VITE_APP_Palm_mind_dev_Access_Token
  // }`;

  useEffect(() => {
    async function fetchAllPages() {
      try {
        // const pages = await fetch(all_pages);
        const pages = await fetch('http://127.0.0.1:3000/all-pages');
        
        const allpagesData = await pages.json();
        setAllPage(allpagesData.data); // Set fetched page data
      } catch (err) {
        console.error("Error fetching page details", err);
      }
    }
    fetchAllPages();
  }, []);

  const handlePageClick = (page) => {
    setPage(page); // Update selected page
  };

  return (
    <div className="p-6">
      {page ? (
        // Render the Posts component if a page is selected
        <Posts selectedPage={page} />
      ) : (
        // Render the list of pages if no page is selected
        <>
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            List of Pages
          </h3>
          {allPage && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allPage.map((page) => (
                <button
                  key={page.id}
                  onClick={() => handlePageClick(page)} // Pass the selected page on click
                  className="w-full text-left p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300 hover:shadow-lg hover:border-gray-400 transition duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-700">
                    {page.name}
                  </h4>
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
