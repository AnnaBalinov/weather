import { FavoritePreview } from "./FavoritePreview"

export const FavoriteList = ({ favorites, isImperial, setCity, removeFavorite }) => {

    return (
        <section className="favorite-list-container">
            {favorites.map((favorite, idx) => (
                <FavoritePreview key={idx} favorite={favorite}
                    setCity={setCity} isImperial={isImperial}
                    removeFavorite={removeFavorite}
                />
            ))}
        </section>
    )
}
