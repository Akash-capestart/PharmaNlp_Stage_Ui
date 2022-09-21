import React from 'react'

export function GetFirstLetter(word:string) {

  const firstLetter = word.charAt(0)

  return (
    <span>{firstLetter + ".."}</span>
  )
}
