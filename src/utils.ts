const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZqeytrpolkadjsghfgmnbzxcvnQPOWEYRKASJHDGFMNBCVX--___-_jsfhrlg-_124903564576986483658fgh4sdfh687e4h897WETHJ68F7G4688471877GFHJFFGJ87469857468746hfghwrtiyj4598yhdjkhgnk'
const CHARACTERS_LENGTH = CHARACTERS.length

export const generateID = (stringLength = 20) => {
  let randomStr = ''
  for (let index = 0; index < stringLength; ++index) {
    randomStr += CHARACTERS.charAt(
      Math.floor(Math.random() * CHARACTERS_LENGTH)
    )
  }
  return randomStr
}
