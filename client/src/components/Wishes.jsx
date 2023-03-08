import { useState, useRef, useEffect } from 'react';
import { Reorder, AnimatePresence } from 'framer-motion'
import axios from "axios"

const variants = {
    initial: {
        opacity: 0,
        height: 0,
    },
    animate: {
        opacity: 1,
        height: 'auto',
    },
    exit: {
        opacity: 0,
        height: 0,
    }
}

export const Wishes = ({ wishes = [],  setWishes, 
                         createdWishes, setCreatedWishes,
                         changedWishes, setChangedWishes,
                         deletedWishes, setDeletedWishes }) => {
    return (
        <Reorder.Group as="ol" axys="y" values={wishes} onReorder={setWishes} className="wishlist__list">
            <AnimatePresence>
                { wishes.map((wish) => (
                    <WishItem key={wish.id} wish={wish}  wishes={wishes} setWishes={setWishes}
                              createdWishes={createdWishes} setCreatedWishes={setCreatedWishes}
                              changedWishes={changedWishes} setChangedWishes={setChangedWishes}
                              deletedWishes={deletedWishes} setDeletedWishes={setDeletedWishes}/>
                ))}
            </AnimatePresence>
        </Reorder.Group>
    );
};

const WishItem = ({ wish, wishes, setWishes, 
                    createdWishes, setCreatedWishes,
                    changedWishes, setChangedWishes,
                    deletedWishes, setDeletedWishes }) => {

    const [isChanging, setIsChanging] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [spanValue, setSpanValue] = useState(wish.content)
    const [priority, setPriority] = useState(wish.priority)
    const [imageUrl, setImageUrl] = useState(wish.image_url)
    const refInput = useRef('')
    const inputFileRef = useRef(null)

    useEffect(() => {
        refInput.current?.focus()
    }, [isChanging])



    const updateChangedWishes = () => {
        if (!createdWishes.includes(wish.id) && !changedWishes.includes(wish.id))
        {
            setChangedWishes((prev) => [
                ...prev,
                wish.id
            ])
        }
    }

    const handleChangeText = () => {
        setIsChanging(true)
        setInputValue(spanValue)
    };

    const handleBlurText = () => {
        setSpanValue(inputValue)
        setIsChanging(false)

        wish.content = inputValue
        wishes.forEach((elem) => {
            if (elem.id === wish.id) {
                elem.content = wish.content
            }
        })
        setWishes(wishes)
        updateChangedWishes()
    }

    const handlePriorityChanged = (e) => {
        wish.priority = priority
        wishes.forEach((elem) => {
            if (elem.id === wish.id) {
                if (priority > 10)
                {
                    setPriority(10)
                }
                else if (priority < 1)
                {
                    setPriority(1)
                }
                elem.priority = wish.priority
            }
        })
        setWishes(wishes)
        updateChangedWishes()
    }

    const handleChangeFile = async (event) => {
        try {
            const formData = new FormData()
            const file = event.target.files[0]
            formData.append('image', file)

            const { data } = await axios.post('/upload', formData)
            wish.image_url = data
            setImageUrl(wish.image_url)
            updateChangedWishes()
        } catch (err) {
            console.warn(err)
            alert('Ошибка при загрузке файла!')
        }
    }

    const handleRemove = () => {
        if (createdWishes.includes(wish.id))     // еще не сохранили в БД => просто удаляем из списков
        {
            setCreatedWishes(
                createdWishes.filter((id) => id !== wish.id)
            )
        }
        else {                                  // записи сохранены в БД => помечаем как удаленные
            setDeletedWishes((prev) => [
                ...prev,
                wish.id
            ])
        }
        setWishes(
            wishes.filter((w) => w.id !== wish.id)
        )
      }

    return (
        <Reorder.Item 
            value={wish}
            whileDrag={{
                scale: 1.08,
                boxShadow:
                    "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px"
            }}
            {...variants}
            className="wishlist__item"
        >
            <img className="item__img" src={`http://localhost:4444${imageUrl}`} alt="#"/>
            <div className="item__content content">
                <span 
                    className={
                        isChanging
                            ? 'content__ready-text content__ready-text--hidden'
                            : 'content__ready-text'
                        } 
                    onDoubleClick={handleChangeText}
                    >{ spanValue }</span>
                <input 
                    className={
                        isChanging
                            ? 'content__change-text'
                            : 'content__change-text content__change-text--hidden'
                    } 
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onBlur={handleBlurText}
                    ref={refInput}
                />
            </div>
            <div className="item__priority">
                <img className="item__priority-img" src="1f525.png" alt="priority"/>
                <input 
                    className="item__priority-value"
                    type="number"
                    min="1"
                    max="10"
                    onChange={e => setPriority(e.target.value)}
                    onBlur={handlePriorityChanged}
                    value={priority ? priority : 1}
                />
            </div>
            <button 
                className="item__load-file load-file"
                onClick={() => inputFileRef.current.click()}
            >
                <svg className="load-file__img" fill="none" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>image</title>
                    <path d="M30 2.75h-28c-0.69 0-1.25 0.56-1.25 1.25v0 24c0 0.037 0.018 0.068 0.021 0.104 0.020 0.173 0.067 0.33 0.137 0.474l-0.004-0.009c0.040 0.074 0.083 0.137 0.132 0.196l-0.002-0.002c0.053 0.069 0.111 0.129 0.174 0.183l0.002 0.001c0.028 0.023 0.043 0.055 0.073 0.076 0.042 0.025 0.091 0.050 0.142 0.071l0.008 0.003c0.035 0.021 0.078 0.042 0.122 0.061l0.008 0.003c0.129 0.053 0.278 0.085 0.435 0.088l0.002-0 0 0h28c0.69-0.001 1.249-0.56 1.25-1.25v-24c-0-0.69-0.56-1.25-1.25-1.25h-0zM28.75 5.25v12.62l-5.709-8.563c-0.24-0.318-0.617-0.521-1.041-0.521s-0.801 0.203-1.039 0.518l-0.002 0.003-7.243 10.865-3.935-3.148c-0.212-0.17-0.484-0.273-0.781-0.273-0.422 0-0.796 0.209-1.022 0.529l-0.003 0.004-4.726 6.751v-18.784zM4.401 26.75l4.859-6.941 3.959 3.168c0.209 0.171 0.478 0.274 0.772 0.274 0.071 0 0.14-0.006 0.208-0.018l-0.007 0.001c0.356-0.056 0.656-0.256 0.846-0.537l0.003-0.004 6.96-10.439 6.75 10.126v4.37zM8 13.25c1.795 0 3.25-1.455 3.25-3.25s-1.455-3.25-3.25-3.25c-1.795 0-3.25 1.455-3.25 3.25v0c0.002 1.794 1.456 3.248 3.25 3.25h0zM8 9.25c0.414 0 0.75 0.336 0.75 0.75s-0.336 0.75-0.75 0.75c-0.414 0-0.75-0.336-0.75-0.75v0c0.001-0.414 0.336-0.749 0.75-0.75h0z"></path>
                </svg>
            </button>
            <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden/>
            <button 
                className="item__btn-del btn-del"
                onClick={() => handleRemove()}
            >
                <svg className="btn-del__img" fill="none" width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"/>
                </svg>
            </button>
        </Reorder.Item>
    );
};