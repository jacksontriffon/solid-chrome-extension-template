import "@src/styles/index.css";
import { createSignal, onCleanup, onMount } from "solid-js";

const Popup = () => {
  const [highlightedText, setHighlightedText] =
    createSignal("No Text Selected");

  const updateSessionData = () => {
    chrome.storage.local.get("Highlighted", (result) => {
      if (result.Highlighted) {
        setHighlightedText(result.Highlighted);
      }
    });
  };

  // Listen for changes to chrome.storage
  onMount(() => {
    // Load initial data
    updateSessionData();

    const storageListener = (changes, areaName) => {
      if (areaName === "local" && changes.Highlighted) {
        setHighlightedText(changes.Highlighted.newValue);
      }
    };

    chrome.storage.onChanged.addListener(storageListener);

    onCleanup(() => {
      chrome.storage.onChanged.removeListener(storageListener);
    });
  });

  return (
    <>
      <iframe
        src={
          highlightedText()
            ? "https://jisho.hlorenzi.com/search/" + highlightedText()
            : "https://jisho.hlorenzi.com/"
        }
        title="Jisho"
      />
      ;
    </>
  );
};

export default Popup;
