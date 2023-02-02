export function DBPromise(request: any) {
  return new Promise((resolve, reject) => {
    request.onsuccess = (e: { target: { result: any } }) => {
      resolve(e.target.result);
    };
    request.onerror = (e: { target: { error: any } }) => {
      reject(e.target.error);
    };
  });
}
