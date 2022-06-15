const {Router} = require("express") 
const fs = require('fs') 
const router = Router()

const pathRouter = `${__dirname}`
// Remove extension from routes files
const removeExtension = (fileName) => fileName.split('.').shift();

// Remove index file from routes files and dynamically import the current route and it's controller
fs.readdirSync(pathRouter).filter(async file => {
  const fileWWithOutExt = removeExtension(file)
  let skip;
  fileWWithOutExt ? skip = ['index'].includes(fileWWithOutExt) : skip = false
  if (!skip) {
    import(`./${fileWWithOutExt}.js`).then(module => router.use(`/${fileWWithOutExt}`, module.router))
    console.log('LOAD ROUTE --->', fileWWithOutExt)}
})

module.exports = router