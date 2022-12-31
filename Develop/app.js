const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employees = [];

const makefile = () => {
    const teamFile = render(employees);
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, teamFile);
}

const teaminfo = () => {
    inquirer
        .prompt([
            //General Employee Properties
            {
                type: 'input',
                name: 'employeeName',
                message: 'Enter Name: '
            },
            {
                type: 'input',
                name: 'employeeId',
                message: 'Enter ID: '
            },
            {
                type: 'input',
                name: 'employeeEmail',
                message: 'Enter Email: '
            },
            {
                type: 'list',
                name: 'employeeRole',
                choices: [
                    'Manager',
                    'Engineer',
                    'Intern'
                ],
                message: 'Enter Role: '
            },
            //Manager-Only Properties
            {
                type: 'input',
                name: 'officeNumber',
                message: 'Enter Office Number: ',
                when: (answers) => answers.role === 'Manager'
            },
            //Engineer-Only Properties
            {
                type: 'input',
                name: 'gitHubEmail',
                message: 'Enter GitHub Email: ',
                when: (answers) => answers.role === 'Engineer'
            },
            //Intern-Only Properties
            {
                type: 'input',
                name: 'school',
                message: 'Enter School Name: ',
                when: (answers) => answers.role === 'Intern'
            },
            //Option to add another employee
            {
                type: 'confirm',
                name: 'another',
                message: 'Add Another Employee? '
            },

        ])

        .then((answers) => {
            let addEmployee;
            if (answers.employeeRole === 'Manager') {
                addEmployee = new Manager(answers.employeeName ,answers.employeeId ,answers.employeeEmail ,answers.officeNumber);
            } else if (answers.employeeRole === 'Engineer') {
                addEmployee = new Engineer(answers.employeeName ,answers.employeeId ,answers.employeeEmail ,answers.gitHubEmail);
            } else if (answers.employeeRole === 'Intern') {
                addEmployee = new Intern(answers.employeeName ,answers.employeeId ,answers.employeeEmail ,answers.school);
            }

            employees.push(addEmployee);
            if (answers.another) {
                return teaminfo();
            } else {
                return makefile();
            }
        });
}

const init = () => {
    teaminfo();
}

init();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
