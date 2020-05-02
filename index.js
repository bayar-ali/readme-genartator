const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function userPrompt() {
   
    return inquirer.prompt([{
        type: "input",
        name: "username",
        message: "What is your github username?"
    },
    {
        type: "input",
        name: "project",
        message: "What is your Project Name?"
    },
    {
        type: "input",
        name: "description",
        message: "Please write a brief desription about your Project"
    },
    {
        type: "list",
        name: "license",
        message: "What kind of licensing will your project have?",
        choices: ['MIT', 'APACHE 2.0', 'GPL 3.0', 'BSD3', 'None']
    },
    {
        type: "input",
        name: "installDependencies",
        message: "What command needs to be run to install dependencies?"
    },
    {
        type: "input",
        name: "testing",
        message: "What command needs to be run for testing?"
    },
    {
        type: "input",
        name: "needToKnow",
        message: "What does the user need to know about using this repository?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to this repository?"
    },
        
    ])
}



function genReadMe(results) {
    return`
    
    The name of your project
        # ${results.project}
        
        
        ## Description
       the desription about your Project

        
        ${results.description}
        
        ## Table
        
        * [License](#license)
        * [Installation](#installation)
        
        * [Testing](#testing)
        * [Need To Know](#needtoknow)
        * [Contributions](#contributions)
        
        * [Questions](#questions)
        
        ## License
        
        ${results.choices}
        ## Installation
        
        To install necessary dependencies run the following command:
        
        ${results.installDependencies}
        
        ## Testing
         
        To run tests, run the following command:
        ${results.testing}
        ## Need to Know
        ${results.needToKnow}
        ## Contributions
        
        ${results.contributing}
        
    `
}

userPrompt()

    .then((results) => {
        
        const readME = genReadMe(results)

        writeFileAsync("README.md", readME)

        return results.username
    })
    .then(function(username){
        const url = `https://api.github.com/users/${username}`
        
        axios
            .get(url)
            .then(function (res){
                
                console.log(res.data.email)
                
                console.log(res.data.avatar_url)
                
                let data = res.data.email
                let img = res.data.avatar_url
            
            })
    })

    
    .then(function () {
        console.log("Succesfully written to README.md")
    })
    .catch((err) => {
        if (err) {
            console.log(err)
        }
    })


