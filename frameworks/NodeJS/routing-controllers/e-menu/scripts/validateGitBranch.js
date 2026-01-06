const gitBranchIs = require("git-branch-is");

const errorColor = "\x1b[31m";

gitBranchIs("master", function (err, isMaster) {
  if (err) {
    console.log(errorColor, "Something went wrong with git branch validation.");

    return process.exit(1);
  }

  if (isMaster) {
    console.log(
      errorColor,
      "You are not able to commit into or push to master branch. Create another branch."
    );

    return process.exit(1);
  }

  return process.exit(0);
});
