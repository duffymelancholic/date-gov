import { toPng } from "html-to-image";

export async function savePassImage(node: HTMLElement) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#fffdf7",
  });

  const blob = await (await fetch(dataUrl)).blob();
  const file = new File([blob], "visitor-pass.png", { type: "image/png" });

  const canShareFile =
    typeof navigator.share === "function" &&
    typeof navigator.canShare === "function" &&
    navigator.canShare({ files: [file] });

  if (canShareFile) {
    await navigator.share({
      files: [file],
      title: "Visitor pass",
      text: "Show this at the door.",
    });
    return "shared";
  }

  const link = document.createElement("a");
  link.download = "visitor-pass.png";
  link.href = dataUrl;
  link.click();
  return "downloaded";
}
