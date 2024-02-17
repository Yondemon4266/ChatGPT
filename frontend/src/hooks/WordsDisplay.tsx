import { useEffect, useState } from "react";

export function WordsDisplay({
  text,
  delay,
}: Readonly<{ text: string; delay: number }>) {
  const [wordsDisplayed, setWordsDisplayed] = useState("");
  useEffect(() => {
    console.log("hello");

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setWordsDisplayed(text.substring(0, index));
        index += 8;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text]);

  return <p>{wordsDisplayed}</p>;
}