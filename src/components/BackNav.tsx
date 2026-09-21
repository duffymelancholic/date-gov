type BackNavProps = {
  onBack: () => void;
  backLabel: string;
  onFirstPage?: () => void;
  firstPageLabel?: string;
};

export function BackNav({
  onBack,
  backLabel,
  onFirstPage,
  firstPageLabel = "I missed the first page. Start me over.",
}: BackNavProps) {
  return (
    <div className="mb-4 flex flex-col gap-2 print:hidden">
      <button type="button" onClick={onBack} className="back-link">
        ← {backLabel}
      </button>
      {onFirstPage ? (
        <button type="button" onClick={onFirstPage} className="back-link">
          {firstPageLabel}
        </button>
      ) : null}
    </div>
  );
}
