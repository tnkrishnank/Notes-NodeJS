const chalk = require('chalk');
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv)).argv;

if(process.argv[2] == "add")
{
    add_note();
} 
else if(process.argv[2] == "remove")
{
    remove_note();
}
else if(process.argv[2] == "list")
{
    list_note();
}
else if(process.argv[2] == "read")
{
    read_note();
}

function add_note()
{
    var x = 0;

    fs.readFile("notes.json", function(err, data) {
        if(err)
        {
            console.log(chalk.bgRed("FILE NOT FOUND !!!"));
        }
        else
        {
            let new_note = {
                title: argv.title,
                body: argv.body
            }

            let notes = [];

            try
            {
                const n = JSON.parse(data);
                var t = 0;

                for(var i = 0; i < n.length; i++)
                {
                    if(argv.title == n[i].title)
                    {
                        t = 1;
                        break;
                    }
                }

                if(t == 1)
                {
                    console.log(chalk.bgRed("TITLE ALREADY TAKEN !!!"));
                    x = 1;
                }
                else
                {
                    n.push(new_note);
                    notes = n;
                }
            }
            catch (err)
            {
                const n = [];
                n.push(new_note);
                notes = n;
            }

            if(x == 0)
            {
                fs.writeFile("notes.json", JSON.stringify(notes), err => {
                    if (err)
                    {
                        console.log(chalk.bgRed("FILE WRITE ERROR !!!"));
                    }
                    else
                    {
                        console.log(chalk.bgGreen("NEW NOTE CREATED !"));
                    }
                });
            }
        }
    });
}

function remove_note()
{
    fs.readFile("notes.json", function(err, data) {
        if(err)
        {
            console.log(chalk.bgRed("FILE NOT FOUND !!!"));
        }
        else
        {
            let new_note = {
                title: argv.title
            }

            let notes = [];

            const n = JSON.parse(data);
            var t = 0;

            for(var i = 0; i < n.length; i++)
            {
                if(argv.title == n[i].title)
                {
                    t = 1;
                    break;
                }
            }

            if(t == 1)
            {
                n.splice(i, 1);
                notes = n;

                fs.writeFile("notes.json", JSON.stringify(notes), err => {
                    if (err)
                    {
                        console.log(chalk.bgRed("FILE WRITE ERROR !!!"));
                    }
                    else
                    {
                        console.log(chalk.bgGreen("NOTE REMOVED !"));
                    }
                });
            }
            else
            {
                console.log(chalk.bgRed("NOTE NOT FOUND !!!"));
            }
        }
    });
}

function list_note()
{
    fs.readFile("notes.json", function(err, data) {
        if(err)
        {
            console.log(chalk.bgRed("FILE NOT FOUND !!!"));
        }
        else
        {
            const notes = JSON.parse(data);

            if(notes.length > 0)
            {
                console.log(chalk.bgCyan("YOUR NOTES : "));
                for(var i = 0; i < notes.length; i++)
                {
                    console.log(notes[i].title);
                }
            }
            else
            {
                console.log(chalk.bgRed("NO NOTES AVAILABLE !!!"));
            }
        }
    });
}

function read_note()
{
    fs.readFile("notes.json", function(err, data) {
        if(err)
        {
            console.log(chalk.bgRed("FILE NOT FOUND !!!"));
        }
        else
        {
            let r_note = {
                title: argv.title
            }

            const notes = JSON.parse(data);
            var t = 0;

            for(var i = 0; i < notes.length; i++)
            {
                if(argv.title == notes[i].title)
                {
                    t = 1;
                    break;
                }
            }

            if(t == 1)
            {
                console.log(chalk.bgMagenta(notes[i].title));
                console.log(notes[i].body);
            }
            else
            {
                console.log(chalk.bgRed("NOTE NOT AVAILABLE !!!"));
            }
        }
    });
}
