const KEY = "frihat_bookmarks_v1";

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || [];
  } catch {
    return [];
  }
}

export function isBookmarked(id) {
  return load().includes(id);
}

export function toggleBookmark(id) {
  const list = load();
  const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
  localStorage.setItem(KEY, JSON.stringify(next));
  return next.includes(id);
}
