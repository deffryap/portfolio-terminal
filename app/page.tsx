"use client";
import PortfolioTerminal from '../components/PortfolioTerminal';

export default function Home() {
  const handleExit = () => {
    console.log("Exit command triggered. Feature coming soon.");
  };

  return (
    <main>
      <PortfolioTerminal onExit={handleExit} />
    </main>
  );
} 