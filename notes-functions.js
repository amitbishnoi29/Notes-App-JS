const getSavedNotes=function(){
    const notesJSON=localStorage.getItem('notes')
    if(notesJSON!==null){
        return JSON.parse(notesJSON)
    }
    else {
        return []
    }
}

//save notes

const saveNotes=(notes) => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

//remove notes

const removeNote=function(id){
    const index= notes.findIndex(function(note){
        return note.id===id
    })
    if(index > -1) {
        notes.splice(index,1)
    }
}



//generate Dom 

const generateEl=function(note){
    const div=document.createElement('a')
    const noteEl=document.createElement('p')
    const statusEl=document.createElement('p')

        //create note element
        if (note.title.length>0) {

            noteEl.textContent=note.title
        }
        else {
            
            noteEl.textContent='Unnamed Note '
        }
        noteEl.classList.add('list-item__title')
        div.appendChild(noteEl)
       
        // link setup
        div.setAttribute('href', `/edit.html#${note.id}`)
        div.classList.add('list-item')

        //setup status message
        statusEl.textContent=lastEdited(note.updatedAt)
        statusEl.classList.add('list-item__subtitle')
        div.appendChild(statusEl)
        
        return div
}


//sort notes 
const sortNotes=function(notes,sortBy){
    if (sortBy==='byEdited') {
        return notes.sort(function(a,b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if (a.updatedAt < b.updatedAt){
                return 1
            }
            else {
                return 0
            }
        })
    } else if (sortBy==='byCreated') {
        return notes.sort(function(a,b){
            if(a.createdAt > b.createdAt) {
                return -1
            }
            else if (a.createdAt < b.createdAt) {
                return 1
            }
            else {
                return 0
            }
        })
        

    }  else if (sortBy==='alphabetically') {
        return notes.sort(function(a,b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else {
                return 0
            }

        })
    }
    else{
        return notes
    }

}


//rendering notes

const renderNotes=function(notes,filters){
    const notesEl=document.querySelector('#notes')
    sortNotes(notes,filters.sortBy)
    const filteredNotes=notes.filter(function(note){
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    notesEl.innerHTML=''

    if(filteredNotes.length > 0) {
        filteredNotes.forEach(function(note) {
    
            notesEl.appendChild(generateEl(note))
    
            // remove button
          //  removebutton.setAttribute('')
        })
    }
    else {
        const message=document.createElement('p')
        message.textContent='No notes to show'
        message.classList.add('empty-message')
        notesEl.appendChild(message)

    }

    
}

//generate last edited message

const lastEdited=function(timestamp){
    return `Last edited ${moment(timestamp).fromNow()} `
}