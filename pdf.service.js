import fs from 'fs'
import PDFDocument from 'pdfkit'

export const pdfService = {
    buildAnimalsPdf,
}

function buildAnimalsPdf(animals, fileName='SaveTheAnimals.pdf') {
    var pdf = new PDFDocument()
    animals.forEach((animal, pageIdx) => {
        pdf.pipe(fs.createWriteStream(fileName))
        animal.imgFiles.forEach((file, fileIdx) => {
            const imageHeight = pdf.page.height / 3
            const y = (fileIdx % 3) * imageHeight
            pdf.image(file, 0, y, { height: imageHeight })
        })
        if (pageIdx < animals.length - 1) pdf.addPage()
    })
    pdf.end()
}