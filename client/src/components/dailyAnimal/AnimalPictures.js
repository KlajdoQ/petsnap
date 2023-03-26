import React from 'react'
import './AnimalPictures.css'


export default function AnimalPictures() {
  return (
    < div className='featured-animal'>
      <h1>Featured Animals</h1>
      <div>
         <div>
            <h2>Rusty</h2>
            <img className="img" src="https://randomfox.ca/images/26.jpg" alt="fox" />
            <div>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </div>
        </div>
        <div>
            <h2>Quackers</h2>
            <img className="img"src="https://random-d.uk/api/randomimg" alt="fox" />
            <div>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </div>
        </div>
        <div>
            <h2>Grizzly</h2>
            <img className="img"src="https://placebear.com/200/300" alt="fox" />
            <div>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </div>
        </div>
        <div>
            <h2>Luna</h2>
            <img className="img"src="http://placekitten.com/200/300" alt="fox" />
            <div>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </div>
        </div>
        <div>
            <h2>Skye</h2>
            <img className="img"src="https://cdn.shibe.online/birds/58a19f75fb4c4613594704bb180a171712d48891.jpg" alt="fox" />
        </div>
      </div>
    </div>
  )
}




