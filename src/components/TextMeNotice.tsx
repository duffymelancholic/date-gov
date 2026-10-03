"use client";

import { useRef, useState } from "react";

type TextMeNoticeProps = {
  me: string;
  message: string;
};

export function TextMeNotice({ me, message }: TextMeNoticeProps) {
  const [copied, setCopied] = useState(false);
  const [hint, setHint] = useState("");
  const scriptRef = useRef<HTMLParagraphElement>(null);

  async function copy() {
    const ok = await writeClipboard(message);
    if (ok) {
      setCopied(true);
      setHint("");
      window.setTimeout(() => setCopied(false), 2200);
      return;
    }

    const selected = selectMessage(scriptRef.current);
    setCopied(false);
    setHint(
      selected
        ? "Copy is blocked here. The message is highlighted — hold it and tap Copy."
        : "Copy is blocked here. Hold the message and tap Copy.",
    );
  }

  return (
    <aside className="text-me-notice" role="status" aria-live="polite">
      <p className="font-mono text-[11px] font-bold tracking-[0.28em] text-[#1b2a4a] uppercase">
        Required last step — do not skip
      </p>
      <h2 className="mt-2 font-serif text-3xl leading-tight text-[#1b2a4a] sm:text-4xl">
        Text {me} this exact message
      </h2>
      <p className="mt-2 text-sm text-[#1b2a4a]">
        That’s how I know Poison Ivy said yes. I’ll reply with the pin. The
        website cannot text me for you. You have to actually do the funny
        little text.
      </p>
      <p ref={scriptRef} className="text-me-script">
        {message}
      </p>
      <button
        type="button"
        onClick={copy}
        className="official-btn official-btn-primary mt-4 w-full sm:w-auto"
      >
        {copied ? "Copied. Now send it." : "Copy the text"}
      </button>
      {hint ? (
        <p className="mt-3 font-mono text-[12px] text-[#1b2a4a]">{hint}</p>
      ) : null}
    </aside>
  );
}

async function writeClipboard(text: string) {
  try {
    if (navigator.clipboard?.writeText && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fall through to the older copy trick.
  }

  const field = document.createElement("textarea");
  field.value = text;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "0";
  field.style.left = "0";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.focus();
  field.select();
  field.setSelectionRange(0, text.length);

  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  field.remove();
  return ok;
}

function selectMessage(node: HTMLElement | null) {
  if (!node) {
    return false;
  }
  const selection = window.getSelection();
  if (!selection) {
    return false;
  }
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
}
