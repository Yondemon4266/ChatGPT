import { useEffect, useState } from "react";

export function WordsDisplay({
  text,
  delay,
}: Readonly<{ text: string; delay: number }>) {
  const [wordsDisplayed, setWordsDisplayed] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setWordsDisplayed((letter) => letter + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, [text]);

  return <p>{wordsDisplayed}</p>;
}
