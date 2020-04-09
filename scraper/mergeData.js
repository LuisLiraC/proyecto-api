const fs = require('fs')
const path = require('path')

const mergeData = () => {
  let filesFromDir = fs.readdirSync(path.join(__dirname, 'champions'))
  let promises = []

  filesFromDir.map(file => {
    promises.push(readData(file))
  })

  Promise.all(promises)
    .then(data => {
      fs.writeFile( path.join(__dirname,'champions.json'), JSON.stringify(data), (err) => {
        if (err) {
          return console.log(err)
        } else {
          return console.log('Data merged')
        }
      })
    })
}

const readData = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, `champions/${file}`), 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      else {
        resolve(JSON.parse(data));
      }
    })
  })
}

mergeData()