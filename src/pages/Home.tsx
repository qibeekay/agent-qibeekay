import { useState } from "react";
import TerminalDecription from "../components/terminal/TerminalDecription";
import { h1 } from "motion/react-client";
import Portfolio from "../components/home/Portfolio";

const Home = () => {
  const [showPortfolio, setShowPortfolio] = useState(false);
  return (
    <div>
      {!showPortfolio ? (
        <TerminalDecription onComplete={() => setShowPortfolio(true)} />
      ) : (
        <Portfolio />
      )}
    </div>
  );
};

export default Home;
