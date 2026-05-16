import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import AnimalSelector from "./components/AnimalSelector.jsx";
import VirtualTour from "./components/VirtualTour.jsx";
import PropertyCards from "./components/PropertyCards.jsx";
import PollSection from "./components/PollSection.jsx";
import CTASection from "./components/CTASection.jsx";
import Footer from "./components/Footer.jsx";
import { animals, defaultRoomId, rooms } from "./data/tourData.js";

export default function App() {
  const [selectedAnimalId, setSelectedAnimalId] = useState("dog");
  const [currentRoomId, setCurrentRoomId] = useState(defaultRoomId);

  const selectedAnimal = useMemo(
    () => animals.find((animal) => animal.id === selectedAnimalId) ?? animals[0],
    [selectedAnimalId]
  );

  const currentRoom = useMemo(
    () => rooms.find((room) => room.id === currentRoomId) ?? rooms[0],
    [currentRoomId]
  );

  function handleAnimalChange(animalId) {
    setSelectedAnimalId(animalId);
    if (animalId === "fish") {
      setCurrentRoomId(defaultRoomId);
    }
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal antialiased">
      <Header />
      <main>
        <Hero />
        <AnimalSelector
          animals={animals}
          selectedAnimalId={selectedAnimalId}
          onSelect={handleAnimalChange}
        />
        <VirtualTour
          selectedAnimal={selectedAnimal}
          currentRoom={currentRoom}
          currentRoomId={currentRoomId}
          onRoomChange={setCurrentRoomId}
        />
        <PropertyCards />
        <PollSection animals={animals} selectedAnimalId={selectedAnimalId} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
