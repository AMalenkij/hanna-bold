function forceDownload(blobUrl: string, filename: string) {
  const a = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export default function downloadPhoto(url: string, filename?: string) {
  const finalFilename =
    filename || url.split(/[\\/]/).pop()?.replace(/\?.*/, "") || "download";

  fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return response.blob();
    })
    .then((blob) => {
      const blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, finalFilename);
      // Освобождаем ресурс после загрузки
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
    })
    .catch((e) => console.error("Download error:", e));
}
