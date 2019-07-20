const lastEditedElement=document.querySelector('#last-edited')
const noteTiltle=document.querySelector('#note-title')
const noteBody=document.querySelector('#note-body')
const removeButton=document.querySelector('#remove-note')
let notes=getSavedNotes()

const noteid=location.hash.substring(1)
let note=notes.find(function(note){
    return note.id===noteid
})
if(note===undefined) {
    location.assign('/index.html')
}
//else
noteTiltle.value=note.title
noteBody.value=note.body
lastEditedElement.textContent=lastEdited(note.updatedAt) //update last edited


noteTiltle.addEventListener('input',function(e){
    note.title=e.target.value
    note.updatedAt=moment().valueOf()
    lastEditedElement.textContent=lastEdited(note.updatedAt) //update last edited
    saveNotes(notes)
})

noteBody.addEventListener('input',function(e) {
    note.body=e.target.value
    note.updatedAt=moment().valueOf()
    lastEditedElement.textContent=lastEdited(note.updatedAt) //update last edited
    saveNotes(notes)
})

removeButton.addEventListener('click',function(e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',function(e) {
    if(e.key=='notes'){
        notes=JSON.parse(e.newValue)
        note=notes.find(function(note) {
        return note.id===noteid
})
    if(note===undefined) {
    location.assign('/index.html')
}
    noteTiltle.value=note.title
    noteBody.value=note.body
    lastEditedElement.textContent=lastEdited(note.updatedAt) //update last edited
    }
})