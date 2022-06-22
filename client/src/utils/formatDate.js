const formatDate = (date) => {
  if (!date) return null
  let formattedDate = date.split('/')
  formattedDate = `${formattedDate[2]}-${formattedDate[1]}-${formattedDate[0]}`
  return formattedDate
}

export default formatDate
