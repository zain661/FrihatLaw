import { useEffect, useState } from "react";

// Reads text aloud with the browser's built-in Web Speech API — no backend
// or audio files involved, so quality depends on the voices the OS ships.
export function useSpeechReader(text) {
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!supported) return;
    return () => window.speechSynthesis.cancel();
  }, [supported]);

  const toggle = () => {
    if (!supported) return;
    if (playing) {
      window.speechSynthesis.cancel();
      setPlaying(false);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    const arabicVoice = window.speechSynthesis.getVoices().find((v) => v.lang?.startsWith("ar"));
    if (arabicVoice) utterance.voice = arabicVoice;
    utterance.onend = () => setPlaying(false);
    utterance.onerror = () => setPlaying(false);
    window.speechSynthesis.speak(utterance);
    setPlaying(true);
  };

  return { playing, toggle, supported };
}
