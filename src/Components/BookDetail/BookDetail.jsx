import { useLoaderData, useParams } from "react-router-dom";

const BookDetail = () => {
  const { bookId } = useParams();
  const data = useLoaderData();
  const id = parseInt(bookId);

  const book = data.find((book) => book.bookId === id);
  console.log(book);

  const { bookId: currentBookId, image } = book;

  return (
    <div className="">
      <h2 className="font-semibold text-center text-3xl">Book Number: {bookId}</h2>
      <div className="mx-auto w-fit">
        <img className="w-36 mx-auto my-3" src={image} alt="" />
        <br />
        <button className="btn btn-outline btn-accent mr-4">Read</button>
        <button className="btn btn-accent">Wish List</button>
      </div>
    </div>
  );
};

export default BookDetail;
