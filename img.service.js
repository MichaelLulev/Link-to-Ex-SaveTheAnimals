import { load } from 'cheerio'
import { utilService } from './util.service.js'

export const imgService = {
    suggestImages,
}

function suggestImages(term) {
    const BASE_URL = 'https://www.istockphoto.com/search/2/image?phrase='
    const prmImgUrls = utilService.httpGet(BASE_URL + term)
        .then(res => {
            const $ = load(res)
            const topImages = Array.from($('[class*="yGh0CfFS4AMLWjEE9W7v"]')).slice(0, 3)
            const imgUrls = topImages.map(img => img.attribs.src)
            return imgUrls
        })
    return prmImgUrls
}