const NAMESPACE = 'kvass.ai';

function get(key) {
  let result = null;
  try {
    result = JSON.parse(window.localStorage.getItem(`${NAMESPACE}/${key}`));
  } catch(err) {
    console.log(err);
  }
  return result;
}

function set(key, value) {
  window.localStorage.setItem(`${NAMESPACE}/${key}`, JSON.stringify(value));
}

function remove(key) {
  window.localStorage.removeItem(`${NAMESPACE}/${key}`);
}

export default {
  get,
  set,
  remove,
  NAMESPACE
};
