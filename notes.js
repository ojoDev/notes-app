const fs = require('fs')
const chalk = require('chalk')

const readNote =  (title) => {
    const note = loadNotes().find(note  => note.title === title)
    if (note === undefined) {
        console.log(chalk.red("Note not found"))
    } else {
        console.log("Title: " + note.title)
        console.log("Body: " + note.body)
    }
}

const listNotes =  () => {
    const notes = loadNotes()
    console.log(chalk.blue("Your notes"))
    notes.forEach(note => console.log(chalk.blueBright(note.title)))
}

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find(note => note.title === title) 

    debugger

    if (duplicateNote === undefined) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.yellow('Note title duplicated'))
    }
}

const saveNotes = notes =>
    fs.writeFileSync('notes.json', JSON.stringify(notes))


const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const otherNotes = notes.filter(note => note.title != title)
    if (notes.length === otherNotes.length) {
        console.log(chalk.yellow('Note not found'))
    } else {
        saveNotes(otherNotes)
        console.log(chalk.green('Note deleted'))
    }

}

module.exports = {
    readNote: readNote,
    addNote: addNote,
    removeNote: removeNote,
    listNotes : listNotes
}