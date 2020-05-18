
export const convertDateWithoutTime = (data) => {
    return data.split('T')[0]
}

export const firstLetterUpperCase = (str) => {
    let firstLetter=str.substr(0,1).toLocaleUpperCase()
    let restStr = str.substr(1)
    let newStr=firstLetter+restStr
    console.log(`
    firstLetter: ${firstLetter}
    rest: ${restStr}
    newStr: ${newStr}
    `)
    return newStr
}
  