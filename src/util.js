// I assume we use modern brosers and local storage is supported fully
export function loadFigures() {
  try {
    const serializedFigures = localStorage.getItem('figures');
    if (serializedFigures === null) {
      return undefined;
    }
    return JSON.parse(serializedFigures);
  } catch (err) {
    return undefined;
  }
}

export const saveFigures = (data) => {
  try {
    localStorage.setItem('figures', data);
  } catch (err) {
    // ignore write errors
  }
};

