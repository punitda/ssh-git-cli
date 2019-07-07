const fs = require('fs');
const os = require('os');
const path = require('path');

const sshConfigFileLocation = path.join(os.homedir(), '.ssh', 'config');

fs.readFile(sshConfigFileLocation, 'utf8', (err, data) => {
  let obj = {};
  const splitted = data.replace(/^\s*[\r\n\t]/gm,"");
  const result = splitted.split("\n").filter((element) => element !== "")
 // const final_result = result.map(element => element.replace("\t",""))
  console.log(result)
});
