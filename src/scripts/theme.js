function requireAll(r) {
    r.keys().forEach(r);
  }
requireAll(require.context('../styles/icons/', true, /\.svg$/));


import home from "./components/home.js";

