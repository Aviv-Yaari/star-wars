export const storageService = { save, load };

function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function load(key) {
  const data = localStorage.getItem(key);
  if (data) {
    console.log(`loaded ${key} from cache`);
    return JSON.parse(data);
  }
  return null;
}
