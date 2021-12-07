const ipc = require('electron').ipcRenderer;

const button = document.getElementById("upload")

const randomString = require('random-string')

const process = require('child_process')

var formate = 'mp3'

const fs = require('fs')

const $ = require('jquery')

var dir = './media'

if(!fs.existsSync(dir)){
    fs.mkdirSync(dir)
}

$("#formate").change(function(){
    formate = $("#formate option:selected").text()
})

button.addEventListener('click',function(event){
  ipc.send('open-file-dialog-for-file') 
})

ipc.on('selected-file',function(event,Paths){
    console.log(event)

    console.log(Paths)

    process.exec(`ffmpeg -i "${Paths}" media/${randomString()}_video.${formate}`
    ,function(error,stdout,stderr){
        console.log(stdout)

        if(error !== null){
            console.log(error)
        }
    })
})

