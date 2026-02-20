import { useCallback } from 'react';

/**
 * Exportiert ein HTMLElement als langes JPEG und teilt es (Web Share) oder lädt es herunter.
 */
export function useScreenshotExport() {
  const exportAsImage = useCallback(async (element: HTMLElement | null) => {
    if (!element) return;

    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(element, {
      useCORS: true,
      scale: Math.min(window.devicePixelRatio || 2, 2),
      backgroundColor: '#F8F7F2',
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => (b ? resolve(b) : reject(new Error('toBlob failed'))),
        'image/jpeg',
        0.92
      );
    });

    const filename = `wochenplan-${new Date().toISOString().slice(0, 10)}.jpg`;
    const file = new File([blob], filename, { type: 'image/jpeg' });

    if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'Wochenplan',
          text: 'Unser Wochenplan',
        });
        return true;
      } catch {
        /* Fallback zu Download */
      }
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    return false;
  }, []);

  return { exportAsImage };
}
