import React from "react";
import Animal from "./Animal";

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
