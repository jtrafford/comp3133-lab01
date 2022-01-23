const fs = require('fs')
const csv = require('csv-parser')

// Delete usa.txt and canada.txt if exists
if (fs.existsSync('canada.txt')) {
    fs.unlinkSync('canada.txt', (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("File deleted successfully.")
    })
}
if (fs.existsSync('usa.txt')) {
    fs.unlinkSync('usa.txt', (err) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("File deleted successfully.")
    })
}

const canada_data = [];
const usa_data = [];

// Write data from Canada and United States to txt file
fs.createReadStream('input_countries.csv')
    .pipe(csv())
    .on('data', (data) => {
        if (data.country == 'Canada'){
            canada_data.push(data)
        }

        if (data.country == 'United States'){
            usa_data.push(data)
        }
    })

    .on('end', () => {
        let canadaText = canada_data.map(row => {
            return `Country: ${row['country']}, Year: ${row['year']}, Population: ${row['population']}`
        })

        let usaText = usa_data.map(row => {
            return `Country: ${row['country']}, Year: ${row['year']}, Population: ${row['population']}`
        })

        fs.writeFile('canada.txt', canadaText.join("\n"), (err) => {
            if(err) {
                console.log(err)
            }
        });
        fs.writeFile('usa.txt', usaText.join("\n"), (err) => {
            if(err) {
                console.log(err)
            }
        })
    })

