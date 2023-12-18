import { utilService } from "./util.service.js"
import { imgService } from "./img.service.js"
import { pdfService } from "./pdf.service.js"

utilService.loadCSV('./data/rare-animals.csv')
    .then(animals => {
        console.log('animals', animals)
        const prmAnimals = animals.map(animal => {
            return imgService.suggestImages(animal.name)
                .then(imgUrls => {
                    animal.imgUrls = imgUrls
                    return animal
                })
        })
        return Promise.all(prmAnimals)
    })
    .then(animals => {
        const prmAnimalImages = animals.map(animal => {
            animal.imgFiles = []
            const baseFileName = './img/' + animal.name.toLowerCase().replace(' ', '-')
            const prmImageFiles = animal.imgUrls.map((url, i) => {
                const fileName = `${baseFileName}-${i+1}.jpg`
                animal.imgFiles.push(fileName)
                return utilService.download(url, fileName)
            })
            return Promise.all(prmImageFiles)
        })
        return Promise.all(prmAnimalImages).then(() => animals)
    })
    .then(animals => {
        pdfService.buildAnimalsPdf(animals)
    })
    .catch(err => console.error(err))