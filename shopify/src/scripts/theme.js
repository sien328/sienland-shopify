import '../styles/theme.scss';

function requireAll(r) {
    r.keys().forEach(r);
  }
requireAll(require.context('../styles/icons/', true, /\.svg$/));