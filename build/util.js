const getPage = v => {
  const lastSlashPos = v.lastIndexOf('/index.js');
  const pagePos = v.lastIndexOf('/', lastSlashPos - 1) + 1;
  return v.slice(pagePos, lastSlashPos);
}
const getTemplate = v => {
  return v.replace(/index.js$/, 'index.html');
}

const getEntries = list => {
  if (Array.isArray(list)) {
    return list.map(v => {
      return {
        name: getPage(v),
        path: v,
        template: getTemplate(v),
      }
    })
  } else {
    console.log('\nWrong page entry setting. \nExiting.');
    process.exit(-1);
  }
}

module.exports = {
  getPage,
  getTemplate,
  getEntries
};
