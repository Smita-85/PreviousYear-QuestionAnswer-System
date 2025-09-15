import { useContext } from "react";
import { FavouritesContext } from "../context/FavouritesContext";

const FavouritesPage = () => {
  const { favourites } = useContext(FavouritesContext);

  return (
    <div>
      <h2>Your Favourite Questions</h2>
      {favourites.length === 0 ? (
        <p>No favourites yet.</p>
      ) : (
        favourites.map((q) => (
          <div key={q.id} className="card">
            <h3>{q.title}</h3>
            <p>{q.text}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default FavouritesPage;