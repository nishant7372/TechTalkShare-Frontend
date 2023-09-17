export const isFullScreen = () => {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
};

export const enterPageFullScreen = () => {
  const docEl = window.document.documentElement;

  if (!isFullScreen()) {
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen();
    } else if (docEl.mozRequestFullScreen) {
      // Firefox
      docEl.mozRequestFullScreen();
    } else if (docEl.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      // IE/Edge
      docEl.msRequestFullscreen();
    }
  }
};

export const exitPageFullScreen = () => {
  if (isFullScreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
};

export const removeItemFromLocalStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from localStorage: ${error.message}`);
  }
};

export const addItemtoLocalStorage = (item) => {
  try {
    const { key, value } = item;
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error adding item to localStorage: ${error.message}`);
  }
};

export const getItemFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${error.message}`);
    return null;
  }
};

export const removeItemsFromLocalStorage = (keys) => {
  try {
    for (const key of keys) {
      localStorage.removeItem(key);
    }
  } catch (error) {
    console.error(`Error removing items from localStorage: ${error.message}`);
  }
};

export const addItemstoLocalStorage = (items) => {
  try {
    for (const item of items) {
      const { key, value } = item;
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error adding items to localStorage: ${error.message}`);
  }
};

export const getItemsFromLocalStorage = (keys) => {
  const items = [];
  try {
    for (const key of keys) {
      const item = localStorage.getItem(key);
      if (item) {
        items.push(JSON.parse(item));
      }
    }
    return items;
  } catch (error) {
    console.error(`Error getting items from localStorage: ${error.message}`);
    return [];
  }
};
