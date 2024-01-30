import { motion } from "framer-motion";
import { storage } from "../firebase";
import { getDownloadURL, ref } from 'firebase/storage';
import React, { use, useCallback, useEffect, useRef, useState } from "react";
import { set } from "firebase/database";
import Image from 'next/image';
import ChessGameComponent from "./ChessGameComponent";
import MineSweeperComponent from "./MineSweeperComponent";
import SnakeGameComponent from "./SnakeGameComponent";

interface Piece {
  type: string;
  color: 'white' | 'black';
  image: string;
  position: {
    x: number;
    y: number;
  }
}

interface GameState {
  pieces: Piece[];
  playerTurn: 'white' | 'black';
}


interface CardProps {
  index: number;
  imageSrc: string;
  onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const Card: React.FC<CardProps> = ({ index, imageSrc, onClick }) => {
  return (
    <li className="card" onClick={onClick} data-index={index}>
      <div className="view front-view">
        <span className="material-icons text-3xl smm:text-xl">?</span>
      </div>
      <div className="view back-view">
        <Image width={65} height={65} src={imageSrc} alt="cardImage" />
      </div>
    </li>
  );
};

const MemoryGameComponent = () => {

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const cardsRef = useRef<HTMLUListElement | null>(null); // Specify HTMLUListElement for the <ul>
  let cards: HTMLLIElement[] = [];

  const [matched, setMatched] = useState(0);
  const [cardOne, setCardOne] = useState<HTMLLIElement | null>(null);
  const [cardTwo, setCardTwo] = useState<HTMLLIElement | null>(null);
  const [disableDeck, setDisableDeck] = useState(false);
  const [flips, setFlips] = useState(0);
  const [restartGame, setRestartGame] = useState(true);
  const [gameSize, setGameSize] = useState(0);
  const [playChess, setPlayChess] = useState(false);
  const [playMineSweep, setPlayMineSweep] = useState(false);
  const [playSnake, setPlaySnake] = useState(false);
  const [playMemoryGame, setPlayMemoryGame] = useState(false);
  const [gameSelected, setGameSelected] = useState(false);


  useEffect(() => {
    const fetchImageUrls = async () => {
      try {
        const Gem1 = ref(storage, "memory_game_assets/img-1.png");
        const Gem1Url = await getDownloadURL(Gem1);
        const Gem2 = ref(storage, "memory_game_assets/img-2.png");
        const Gem2Url = await getDownloadURL(Gem2);
        const Gem3 = ref(storage, "memory_game_assets/img-3.png");
        const Gem3Url = await getDownloadURL(Gem3);
        const Gem4 = ref(storage, "memory_game_assets/img-4.png");
        const Gem4Url = await getDownloadURL(Gem4);
        const Gem5 = ref(storage, "memory_game_assets/img-5.png");
        const Gem5Url = await getDownloadURL(Gem5);
        const Gem6 = ref(storage, "memory_game_assets/img-6.png");
        const Gem6Url = await getDownloadURL(Gem6);
        const Gem7 = ref(storage, "memory_game_assets/img-7.png");
        const Gem7Url = await getDownloadURL(Gem7);
        const Gem8 = ref(storage, "memory_game_assets/img-8.png");
        const Gem8Url = await getDownloadURL(Gem8);

        setImageUrls([Gem1Url, Gem2Url, Gem3Url, Gem4Url, Gem5Url, Gem6Url, Gem7Url, Gem8Url, Gem1Url, Gem2Url, Gem3Url, Gem4Url, Gem5Url, Gem6Url, Gem7Url, Gem8Url]);
      } catch (error) {
        console.error("Error fetching image URLs:", error);
      }
    };
    // Call the function
    fetchImageUrls();
  }, []); // Empty dependency array to run only once on component mount

  const shuffleCard = () => {
    // console.log("Shuffling cards");
    setMatched(0);
    setFlips(0);
    setDisableDeck(false)
    setRestartGame(true);
    cards = Array.from(cardsRef.current!.children) as HTMLLIElement[];
    cards.forEach((card) => {
      const position = Math.floor(Math.random() * cards.length);
      card.style.order = position.toString();
      card.classList.remove("matched");
      card.classList.remove("flip");
    });
  };

  const flipCard = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const clickedCard = event.currentTarget as HTMLLIElement;
    if (cardOne !== clickedCard && !disableDeck) {
      clickedCard.classList.add("flip");

      if (!cardOne) {
        setCardOne(clickedCard);
        setFlips(flips + 1);
      } else {
        setCardTwo(clickedCard);
        setFlips(flips + 1);
        setDisableDeck(true);
      }
    }
  };

  const matchCards = (img1: string, img2: string) => {
    if (img1 === img2) {
      setMatched(matched + 1);
      cardOne!.classList.add("matched");
      cardTwo!.classList.add("matched");
      setCardOne(null)
      setCardTwo(null)
      setDisableDeck(false);
      setTimeout(() => {
        if (matched === gameSize) {
          if (flips <= 32) {
            alert(`Excellent Score : ${flips} flips`);
          }
          else if (flips > 32 && flips <= 45) {
            alert(`Good Score : ${flips} flips`);
          }
          else if (flips > 45 && flips <= 55) {
            alert(`Average Score : ${flips} flips`);
          }
          else {
            alert(`Seriously ?! ${flips} flips, you can do better than that`);
          }
          shuffleCard();
        }
      }, 1000);

    } else {

      cardOne?.classList.add("shake");
      cardTwo?.classList.add("shake");

      setTimeout(() => {
        cardOne?.classList.remove("shake", "flip");
        cardTwo?.classList.remove("shake", "flip");
        setCardOne(null)
        setCardTwo(null)
        setDisableDeck(false);
      }, 1200);
    }

  };

  useEffect(() => {
    if (cardOne && cardTwo) {
      matchCards(cardOne.querySelector(".back-view img")!.getAttribute("src") || "", cardTwo.querySelector(".back-view img")!.getAttribute("src") || "");
    }
  }, [cardOne, cardTwo]);

  useEffect(() => {
    if (cardsRef.current) {
      shuffleCard();
    }
    setGameSize((imageUrls.length / 2) - 1);
  }, [imageUrls, restartGame]);

  const handleGameSelected = (name: string) => {
    setGameSelected(true);
    if (name === "chess") {
      setPlayChess(true);
      setPlayMemoryGame(false);
      setPlayMineSweep(false);
      setPlaySnake(false);
    }
    else if (name === "mineSweep") {
      setPlayChess(false);
      setPlayMemoryGame(false);
      setPlayMineSweep(true);
      setPlaySnake(false);
    }
    else if (name === "snake") {
      setPlayChess(false);
      setPlayMemoryGame(false);
      setPlayMineSweep(false);
      setPlaySnake(true);
    }
    else {
      setPlayChess(false);
      setPlayMemoryGame(true);
      setPlayMineSweep(false);
      setPlaySnake(false);
    }
  }

  const handleGameExit = () => {
    setGameSelected(false);
    setPlayChess(false);
    setPlayMemoryGame(false);
    setPlayMineSweep(false);
    setPlaySnake(false);
  }

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
        animate={{ scale: 1, opacity: 1 }}
        className="min-w-[70vw] flex flex-col justify-between z-50 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-400/90 dark:bg-white/75 rounded-lg backdrop-blur-md py-8 px-1"
      >
        {!gameSelected ? <>
          <h1 className="text-2xl font-bold pb-4 md:text-xl smm:text-sm">Select A Game To Play</h1>
          <div className="flex flex-row justify-center items-center">
            <button className="bg-white hover:scale-[1.1] text-black font-bold py-2 px-2 rounded-lg mt-2 mx-2 text-sm sm:text-xs" onClick={() => handleGameSelected("mineSweep")}>MineSweeper 💣</button>
            <button className="bg-white hover:scale-[1.1] text-black font-bold py-2 px-2 rounded-lg mt-2 mx-2 text-sm sm:text-xs" onClick={() => handleGameSelected("memory")}>Memory 🧩</button>
            <button className="bg-white hover:scale-[1.1] text-black font-bold py-2 px-2 rounded-lg mt-2 mx-2 text-sm sm:text-xs" onClick={() => handleGameSelected("chess")}>Chess ♖</button>
            <button className="bg-white hover:scale-[1.1] text-black font-bold py-2 px-2 rounded-lg mt-2 mx-2 text-sm sm:text-xs" onClick={() => handleGameSelected("snake")}>Snake 🐍</button>
          </div>
        </> : <>
          {playChess ? <>
            <ChessGameComponent />
            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 text-sm sm:text-xs" onClick={() => handleGameExit()}>Go Back</button>
          </> : null}
          {playMineSweep ? <>
            <MineSweeperComponent rows={8} columns={8} bombs={10} />
            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 text-sm sm:text-xs" onClick={() => handleGameExit()}>Go Back</button>
          </> : null}
          {playSnake ? <>
            <SnakeGameComponent />
            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 text-sm sm:text-xs" onClick={() => handleGameExit()}>Go Back</button>
          </> : null}
          {playMemoryGame ? <>
            <h1 className="text-2xl font-bold pb-4 md:text-xl smm:text-sm">Memory Game</h1>

            <div className="wrapper">
            <ul className="cards" ref={cardsRef}>
            {restartGame ? <>
                {imageUrls.map((url, index) => (
              <Card key={index} index={index} imageSrc={url} onClick={flipCard} />
            ))}
            </> : <>
            Loading ...
            </>}
          </ul>
              <div className="flex flex-row justify-center items-center">
                <button className="bg-red-600 hover:bg-red-400 text-white font-bold py-2 px-2 rounded-lg mt-2 mr-2 text-sm sm:text-xs" onClick={() => setRestartGame(false)}>Restart</button>
                <h1 className="text-xl font-bold pt-2 pr-4 md:text-sm sm:text-xs ml-2">Flips : {flips}</h1>
              </div>
            </div>
            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-2 rounded-lg mt-2 text-sm sm:text-xs" onClick={() => handleGameExit()}>Go Back</button>

          </> : null}

        </>}

      </motion.div>
    </>
  )
};

export default MemoryGameComponent;