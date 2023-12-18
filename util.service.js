import fs from 'fs'
import fr from 'follow-redirects'

const { http, https } = fr

export const utilService = {
    readJsonFile,
    download,
    httpGet,
    randInt,
}

function readFileSync() {
	const contents = fs.readFileSync('data/data.txt', 'utf8')
	console.log(contents)
}

function readFileAsync() {
	fs.readFile('data/data.txt', 'utf8', (err, contents) => {
		if (err) return console.log('Cannot read file')
		console.log(contents)
	})
	console.log('after calling readFile')
}


function readJsonFile(path) {
    const str = fs.readFileSync(path, 'utf8')
    const json = JSON.parse(str)
    return json
}

function download(url, fileName) {
    console.log('downloading...')
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(fileName)
        https.get(url, content => {
            content.pipe(file)
            file.on('error', reject)
            file.on('finish', () => {
                file.close()
                resolve()
            })
        })
    })
}

// inside util.service:
function httpGet(url) {
    const protocol = url.startsWith('https') ? https : http
    const options = {
        method: 'GET',
    }
    return new Promise((resolve, reject) => {
        const req = protocol.request(url, options, res => {

            let data = ''
            res.on('data', chunk => {
                data += chunk
            })

            res.on('end', () => {
                resolve(data)
            })
        })
        req.on('error', err => {
            reject(err)
        })
        req.end()
    })
}

function randInt(max, min=0) {
    return Math.floor(Math.random() * (max - min) + min)
}