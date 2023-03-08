export const CreateWish = ({ setWishes, setCreatedWishes }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const content = e.target.wish.value;

        let newWish = {
            id: Date.now(),
            content: content,
            priority: 1
        }

        if (e.target.wish.value) {
            setWishes((prevWishes) => [
                ...prevWishes,
                newWish
            ]);
            setCreatedWishes((prevWishes) => [
                ...prevWishes,
                newWish.id
            ])

            e.target.reset();
        }
    };

    return (
        <form className="wishlist__form-add" onSubmit={handleSubmit} autoComplete="off">
            <input className="wishlist__input" placeholder="Желаю..." name="wish" />
            <input className="wishlist__btn" type="submit" value="Добавить" />
        </form>
    );
}