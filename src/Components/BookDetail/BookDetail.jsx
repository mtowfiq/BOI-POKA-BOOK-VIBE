import { useLoaderData, useParams } from "react-router-dom";
import { addToStoredReadList } from "../../Utility/addToDb";
import { addToWishlist } from "../../Utility/addToWishlist";

const BookDetail = () => {
  const { bookId } = useParams();
  const data = useLoaderData();
  const id = parseInt(bookId);

  const book = data.find((book) => book.bookId === id);
  console.log(book);

  const { bookId: currentBookId, image } = book;

  const handleMarkAsRead = (id) =>{
    addToStoredReadList(id)
  }

  const handleAddToWishlist =(id) =>{
    addToWishlist(id)
  }

  return (
    <div className="">
      <h2 className="font-semibold text-center text-3xl">Book Number: {bookId}</h2>
      <div className="mx-auto w-fit">
        <img className="w-36 mx-auto my-3" src={image} alt="" />
        <br />
        <button onClick={() => handleMarkAsRead(bookId)} className="btn btn-outline btn-accent mr-4">Mark as Read</button>
        <button onClick={() => handleAddToWishlist(bookId)} className="btn btn-accent">Add to Wishlist</button>
      </div>
    </div>
  );
};

export default BookDetail;
