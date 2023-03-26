import React from "react";
import Animal from "./Animal";


// The AnimalDetail component displays the detailed information about a specific animal
export default function AnimalDetail({ newMessage, setNewMessage, animal,setUser ,setAnimals}) {

  return (
    <Animal
      animal={animal}
      setAnimals={setAnimals}
      setUser={setUser}
      newMessage={newMessage}
      setNewMessage={setNewMessage}
    />
  );
}
