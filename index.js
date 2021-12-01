const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const PORT = 8000
const URL = "https://www.theguardian.com/uk"

axios(URL)
    .then(response => {
        const HTML = response.data
        const pageHTML = cheerio.load(HTML)
        const articles = []
        pageHTML('.fc-item__title', HTML).each(function(){
            const title = pageHTML(this).text()
            const url = pageHTML(this).find('a').attr('href')
            articles.push({
                title,
                url,
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))

app.listen(PORT, () => console.log(`server running on port = ${PORT}`))