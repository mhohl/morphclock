
module.paths.push('/usr/local/lib/node_modules');
// thanks to https://stackoverflow.com/questions/12594541/npm-global-install-cannot-find-module?rq=1

const svgFolder = './svg/';
const fs = require('fs');

const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const select = xpath.useNamespaces({"x": "http://www.w3.org/2000/svg"});

const data = {}; const count = 0;

// Aus der log-Datei bestimmen wir die Versionsnummer:
const logfile = fs.readFileSync(svgFolder + "glyph.log",encoding='utf8').split("\n");
const mesg = logfile.filter(
  function(line) {
    return (line.indexOf(">>") == 0) && (line.indexOf("Version") > -1)
  });

// Die Versionsnummer hat die Form '>> "Version: <version>"'
const version = mesg[0].split("\"")[1].split(":")[1].toString().trim() || "unknown" ;
data['version'] = version;

// Wir lesen nur svg-Dateien ein:
function isSVGFile(file) {
  return file.length-file.lastIndexOf(".svg") == 4;
}
const svgFileList = fs.readdirSync(svgFolder).filter(isSVGFile);

svgFileList.forEach(file => {
  const content = fs.readFileSync(svgFolder + file,encoding='utf8');
  const doc = new dom().parseFromString(content);
  if (count == 0 ) {
    /* die Bilddateien haben alle dieselbe Breite und Höhe,
    wir lesen nur die ersten Einträge aus: */
    const width  = select("//x:svg/@width",doc);
    const height = select("//x:svg/@height",doc);
    const style  = select("//x:path/@style",doc);
    const strokewidth = style[0].value.split(";").filter(
      function(line) {
        return line.indexOf("stroke-width") > -1;
      })[0].split(":")[1].toString().trim();
    data['width'] = width[0].value;
    data['height'] = height[0].value;
    data['stroke-width'] = strokewidth;
  }
  count++;
  const nodes = select("//x:path/@d", doc);
  const result = [];
  nodes.forEach(node => result.push(node.value));
  data[file.slice(0,-4)] = result;
});

console.log("morphpath =", data, ";");