import React, { useEffect, useState} from 'react'
import { CreateWish } from "./components/CreateWish"
import { Wishes } from "./components/Wishes"
import { Sorting } from './components/Sorting'
import { Saving } from './components/Saving';

function App() {
  const [wishes, setWishes] = useState([]);
  const [createdWishes, setCreatedWishes] = useState([])
  const [changedWishes, setChangedWishes] = useState([])
  const [deletedWishes, setDeletedWishes] = useState([])

  useEffect(() => {
    fetch("api/wishes")
      .then((res) => res.json())
      .then((data) => setWishes(data))
  }, [])

  return (
    <article className="wishlist">
      <CreateWish setWishes={setWishes} setCreatedWishes={setCreatedWishes}/>
      <div className="wishlist__func">
        <Sorting wishes={wishes} setWishes={setWishes} />
        <Saving wishes={wishes} setWishes={setWishes} 
                createdWishes={createdWishes} setCreatedWishes={setCreatedWishes}
                changedWishes={changedWishes} setChangedWishes={setChangedWishes} 
                deletedWishes={deletedWishes} setDeletedWishes={setDeletedWishes}/>
      </div>
      <Wishes wishes={wishes} setWishes={setWishes} 
              createdWishes={createdWishes} setCreatedWishes={setCreatedWishes}
              changedWishes={changedWishes} setChangedWishes={setChangedWishes} 
              deletedWishes={deletedWishes} setDeletedWishes={setDeletedWishes} />
    </article>
  )
}

export default App