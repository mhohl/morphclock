module.paths.push('/usr/local/lib/node_modules');
// thanks to https://stackoverflow.com/questions/12594541/npm-global-install-cannot-find-module?rq=1

const svgFolder = './svg/';
const fs = require('fs');

const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const select = xpath.useNamespaces({"xmlns": "http://www.w3.org/2000/svg"});

const data = {}; const meta = {}; var count = 0;

// Aus der log-Datei bestimmen wir die Versionsnummer:
const logfile = fs.readFileSync(svgFolder + "glyph.log",encoding='utf8').split("\n");
const mesg = logfile.filter(line => (line.indexOf(">>") == 0) &&
                                    (line.indexOf("Version") > -1));

// Die Versionsnummer hat die Form '>> "Version: <version>"'
meta.version = mesg[0].split("\"")[1].split(":")[1].toString().trim() || "unknown" ;

// Wir lesen nur svg-Dateien ein:
function isSVGFile(file) {
  return file.length-file.lastIndexOf(".svg") == 4;
}
const svgFileList = fs.readdirSync(svgFolder).filter(isSVGFile);

svgFileList.forEach(file => {
  const content = fs.readFileSync(svgFolder + file,encoding='utf8');
  const doc = new dom().parseFromString(content);
  if (count == 0) {
    /* die Bilddateien haben alle dieselbe Breite und Höhe,
    wir lesen nur die ersten Einträge aus: */
    const width  = select("//xmlns:svg/@width",doc);
    const height = select("//xmlns:svg/@height",doc);
    const style  = select("//xmlns:path/@style",doc);
    const styles = style[0].value.split(";")
            .filter(line => line.indexOf("rgb") < 0);
    styles.forEach(entry => {
       var e = entry.split(":");
       var k = e[0].toString().trim();
       if (k.length > 0) meta[k] = e[1].toString().trim();
    });
    meta.width = width[0].value;
    meta.height = height[0].value;
    data.metainfo = meta;
  }
  count++;
  const nodes = select("//xmlns:path/@d", doc);
  const result = [];
  nodes.forEach(node => result.push(node.value));
  var key = file.slice(0,-4); // strip ".svg"
  if ( key == "slash" ) key = "/";
  if ( key == "asterisk" ) key = "*";
  data[key] = result;
});

data.metainfo.glyphs = count;
console.log("\"use strict\";");
console.log("const Morph = {};");
console.log("Morph.path =", data, ";");