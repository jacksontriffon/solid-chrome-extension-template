import { onMount } from "solid-js";

onMount(() => {
  console.log("Content is running");
  document.addEventListener("mouseup", () => {
    const selection = document.getSelection
      ? document.getSelection().toString()
      : document.selection.createRange().toString(); // Selection is valid somehow

    saveToStorage("Highlighted", selection);

    console.log("Highlighted text: ", selection);
  });
});

const saveToStorage = (key: string, value: string) => {
  console.log("Save triggered");
  chrome.storage.local.set({ [key]: value }, () => {
    console.log(`Saved: ${key} = ${value}`);
  });
};
