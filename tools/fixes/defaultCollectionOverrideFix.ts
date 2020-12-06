// SEE: https://stackoverflow.com/questions/14177087/replace-a-string-in-a-file-with-nodejs

/**
 defaultCollectionOverrideFix

 PROBLEM:
   on every installation of new packages
   "nstudio/xplat" sets its own schematics as a default
   by overriding "defaultCollection" key in "angular.json".

   SOLUTION: automatically run post setup script
   with this fix which will set up "@nrwl/angular"
   as a default "defaultCollection" for the project.


PUT THIS SCRIPTS INTO "package.json"
  "fix:defaultCollectionOverride": "ts-node ./tools/fixes/defaultCollectionOverrideFix",

APPEND
   "npm run fix:defaultCollectionOverride"
TO "postsetup" SCRIPT.

*/

const replace = require('replace-in-file');

// Specify replacement options
const options = {
  //Single file
  files: './angular.json',

  //Replacement to make (string or regex)
  from: /\"defaultCollection\": \"@nstudio\/xplat\"/g,
  to: '"defaultCollection": "@nrwl/angular"'
};

try {
  let changedFiles = replace.sync(options);
  console.log('Fixed defaultCollection key in angular.json');
} catch (error) {
  console.error('Error occurred:', error);
}
