import { useCallback, useState } from "react";

type ClipboardStatus = "READY" | "SUCCESS" | "ERROR" | Error;

interface UseClipboardOptions {
  resetDelay?: number; // время сброса статуса в ms
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { resetDelay = 2000 } = options;
  const [status, setStatus] = useState<ClipboardStatus>("READY");

  // Копирование текста с очисткой пробелов и переводом в верхний регистр
  const copyToClipboard = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      setStatus("ERROR");
      return false;
    }
    // Очищаем пробелы и переводим в верхний регистр
    const cleaned = text.replace(/\s/g, "").toUpperCase();
    try {
      await navigator.clipboard.writeText(cleaned);
      setStatus("SUCCESS");
      setTimeout(() => setStatus("READY"), resetDelay);
      return true;
    } catch (err) {
      setStatus(err instanceof Error ? err : "ERROR");
      setTimeout(() => setStatus("READY"), resetDelay);
      return false;
    }
  }, [resetDelay]);

  return { copyToClipboard, status };
}

export default useClipboard;
