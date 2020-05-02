// linking package json 
const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const axios = require("axios");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    // api call needed to retive data
    {
      type: "input",
      name: "username",
      message: "Enter your GitHub username:",

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
      type: "list",
        name: "license",
        message: "What kind of licensing will your project have?",
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD3', 'None']
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

// read me page 
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
      
     ${answers.username} 

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



    `
  )
}



// using axios to geth the api 
promptUser()

  .then((answers) => {

    const readMe = generateReadme(answers);

    writeFileAsync("README.MD", readMe)

    return answers.username
    

  })
  .then(function(username)  {
    const url = `https://api.github.com/users/${username}`

    axios 
    .get(url)
    .then(function(res) {
      console.log(res.data.email)

      console.log(res.data.avatar_url)

      let data = res.data.email
      let img = res.data.avatar_url

      fs.appendFile("README.md", `<img src="${img}">`, (err)=>{
        if (err)
        throw err; 
      })
    })

    .then(function () {
      console.log("successully wrote to README.MD");
    })
    .catch((err) => {
      if (err) {
        console.log(err)
      }
    })
  })








