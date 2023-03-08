import axios from "axios"


export const Saving = ({wishes = [],  setWishes, 
                        createdWishes, setCreatedWishes,
                        changedWishes, setChangedWishes,
                        deletedWishes, setDeletedWishes}) => {

    const handleSave = async () => {
        for (let id in deletedWishes) {
            try {
                await axios.delete(`api/wishes/${id}`)
            } catch (err) {
                console.warn(err)
                alert('Ошибка при удалении записи!')
            }
        }
        setDeletedWishes([])
        
        for (let id in createdWishes)
        {
            console.log(id)
            let wish = wishes.find((w) => w.id === id)
            try {
                await axios.post(`api/wishes/`, {
                    content: wish.content,
                    priority: wish.priority,
                    image_url: wish.image_url,
                })
            } catch (err) {
                console.warn(err)
                alert('Ошибка при добавлении записи!')
            }
        }
        setCreatedWishes([])
    }




    return (
        <button 
            className="wishlist__save"
            onClick={handleSave}
        >
            Сохранить
        </button>
    );
}