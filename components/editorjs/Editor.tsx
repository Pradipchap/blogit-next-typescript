'use client'
import React from 'react'
import EditorJS from '@editorjs/editorjs'

export default function EditorJs() {
    const editor=new EditorJS({
        holder:'editor',
        onReady:()=>{
            console.log('Editor js is ready')
        },
        onChange:(api,event)=>{
            console.log('editor is changed',event)
        },
        autofocus:true,
    });
  return (
    <div id='editor' className='text-white'></div>
  )
}
