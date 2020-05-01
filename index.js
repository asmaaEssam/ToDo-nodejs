const fs= require('fs')

const { program } = require('commander');
program.version('0.0.1');

program
    .command('list')
    .option('-s, --status <status>')
    .action((option)=>{
        const notes = JSON.parse(readFile('./notes.json') || '[]')
        if (option.status != undefined)
        {
            const filteredNotes = notes.filter(n=> n.status === option.status)
            console.log(filteredNotes);
        }
        else
        {
            console.log(notes)
        }
    })

program
.command('add')
.option('-t, --title <title>')
.action((option)=>{
    const notes = JSON.parse(readFile('./notes.json') || '[]')
    var id;
    if (notes.length===0)
    {
        id =0;  
    }else
    {
        id = notes[notes.length-1].id + 1;
    }
    const newNote = {
        id : id,
        title: option.title,
        status: 'to-do'
    }
    const newNotesArray = notes.concat(newNote)
    writeFile('./notes.json', newNotesArray)
})

program
.command('edit')
.option('-t, --title <title>')
.option('-s, --status <status>')
.option('-id, --id <id>')
.action((option)=>{
    const notes = JSON.parse(readFile('./notes.json') || "[]")
    const note = notes.find(n=> n.id === parseInt(option.id))
    if(note.title != undefined)
    {
        note.title = option.title;
    }
    (option.status)? note.status= option.status: 0 
    writeFile('./notes.json', notes) 
})

program
.command('delete')
.option('-id, --id <id>')
.action((option)=>{
    const notes = JSON.parse(readFile('./notes.json') || "[]")
    const note = notes.find(n=> n.id === parseInt(option.id))
    const index = notes.indexOf(note)
    notes.splice(index,1)
    writeFile('./notes.json', notes) 
})

program.parse(process.argv);

function readFile(path)
{
    return fs.readFileSync(path)
}
function writeFile(path,newNotesArray)
{
    return fs.writeFileSync(path , JSON.stringify(newNotesArray),{encoding: 'utf8'})
}
