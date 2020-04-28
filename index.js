const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username"
    },
    {
      type: "input",
      name: "name",
      message: "what is your project name?"
    },
    {
      type: "input",
      name: "description",
      message: "please write a short description of your project?"
    },
    {
      type: "input",
      name: "license",
      message: "What kinda of license should your repo have?"
    },
    {
      type: "input",
      name: "install",
      message: "what command should be installed to run dependences?"
    },
    {
      type: "input",
      name: "commands",
      message: "what command should be run to run tests?"
    },
    {
      type: "input",
      name: "usingrepo",
      message: "What does the user need to know about Using the Repo?"
    },
    {
      type: "input",
      name: "contribute",
      message: "what does the user need to know about contributing to the repo?"
    },

  ])
}

function generateReadme(answers) {
  return (` 

  Your project Name is 
  # ${answers.name}
            
            
            ## Table of content
            * [License](#license)
            * [Installation](#installation)
            * [Testing](#testing)
            * [Need To Know](#needtoknow)
            * [Contributions](#contributions)
           
            
           
           
           
           

       Your Github user name is  
      
     ${answers.github} 

      --------------------------------------------

      
      ##Description
     Your project description
     
     ${answers.description}

     ---------------------------------------------
     ##License
      The license of your repo 
      
      ${answers.license}

      --------------------------------------------
      ##Installation
      To install necessary dependencies run the following command:
     

     ${answers.install}
      
      --------------------------------------------
      #testing
     
      To run tests, run the following command:
      
       ${answers.command}

      --------------------------------------------
      ##Need to know
      What you need to know to about the repo 
      
      ${answers.usingrepo}


      ------------------------------------------------
      ##Contributions

      The users need to contribute to the repo: 
      
      ${answers.contribute} 

      ​
    ${answers.picture === "Yes" ? `<img>![profile_image](${answers.avatar})</img>` : ""}
​
    #### Email
​
    ${answers.email === "Yes" ? `${answers.email}` : ""}
​
    #### Badge
​
    Badge: ${answers.badge}


    `
  )
}


promptUser()


  .then((answers) => {
    const readMe = generateReadme(answers);

    return writeFileAsync("README.MD", readMe)
  })
  .then(() => {
    console.log("successully wrote to README.MD");
  })
  .catch((err) => {
    console.log(err);
  });