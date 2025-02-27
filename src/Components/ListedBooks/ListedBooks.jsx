import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { getStoredReadList } from "../../Utility/addToDb";
import Book from "../Book/Book";
import { getStoredWishlist } from "../../Utility/addToWishlist";

const ListedBooks = () => {
  const allBooks = useLoaderData();

  const [readList, setReadList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [sort, setSort] = useState("")

  useEffect(() => {
    const storedReadList = getStoredReadList();
    const storedReadListInt = storedReadList.map((id) => parseInt(id));
    const readList = allBooks.filter((book) =>
      storedReadListInt.includes(book.bookId)
    );
    setReadList(readList);
  }, []);

  useEffect(() => {
    const storedWishList = getStoredWishlist();
    const storedReadListArr = storedWishList.map((wishlist) =>
      parseInt(wishlist)
    );
    const readListArr = allBooks.filter((book) =>
      storedReadListArr.includes(book.bookId)
    );
    setWishList(readListArr);
  }, []);

  const handleSort = sortType =>{
    setSort(sortType)
    if(sortType === "Number of Pages"){
      const sortedReadList = [...readList].sort((a,b) => a.totalPages - b.totalPages)
      setReadList(sortedReadList)
    }
    else if(sortType === "Rating"){
      const sortedReadList = [...readList].sort((a, b) => a.rating - b.rating)
      setReadList(sortedReadList)
    }
  }

  return (
    <div>
      <h3 className="text-3xl my-5">Listed Books</h3>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn m-1">
          {
            sort? `Sorted by: ${sort}` : "Sort by"
          }
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li onClick={() => handleSort("Rating")}>
            <a>Rating</a>
          </li>
          <li onClick={() => handleSort("Number of Pages")}>
            <a>Number of pages</a>
          </li>
        </ul>
      </div>
      <Tabs>
        <TabList>
          <Tab>Read Books</Tab>
          <Tab>Wishlist Books</Tab>
        </TabList>

        <TabPanel>
          <h2>Books I read: {readList.length}</h2>
          <div className="grid grid-cols-1 mx-auto w-fit md:grid-cols-2 lg:grid-cols-3 gap-8">
            {readList.map((book) => (
              <Book key={book.bookId} book={book}></Book>
            ))}
          </div>
        </TabPanel>
        <TabPanel>
          <h2>My wishlist: {wishList.length}</h2>
          <div className="grid grid-cols-1 mx-auto w-fit md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishList.map((book) => (
              <Book key={book.bookId} book={book}></Book>
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ListedBooks;
