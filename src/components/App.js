import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  //Do the below if you want to use the useEffect
  // useEffect(() => {
  //   if (filters.type === 'all') {
  //     fetch(`http://localhost:3001/pets`)
  //     .then(r => r.json())
  //     .then(data => setPets(data))
  //   }
  //   else {
  //   fetch(`http://localhost:3001/pets?type=${filters.type}`)
  //   .then(r => r.json())
  //   .then(data => setPets(data))
  //   }
  // }, [filters])

  function onChangeType(e) {
    setFilters({type: `${e.target.value}`})
  }

  function onFindPetsClick() {
    if (filters.type === 'all') {
      fetch(`http://localhost:3001/pets`)
      .then(r => r.json())
      .then(data => setPets(data))
    }
    else {
    fetch(`http://localhost:3001/pets?type=${filters.type}`)
    .then(r => r.json())
    .then(data => setPets(data))
    }
  }

  function onAdoptPet(petID) {
    const updatedPets = pets.map(pet => {
      if (petID === pet.id) {
        pet.isAdopted = !pet.isAdopted
        return pet
      }
      else {
        return pet
      }
    })
    setPets(updatedPets)
  }

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={onChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
