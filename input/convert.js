import fs from "node:fs";
import path from "node:path";
import { parse } from "csv-parse";
const json = []

const folderPath = 'input';
fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Unable to scan directory:', err);
      return;
    }

    // Filter for CSV files only
    const csvFiles = files.filter(file => path.extname(file) === '.csv');
    console.log(csvFiles)
    // Loop through each CSV file
    csvFiles.forEach(file => {
      console.log(file)
      fs.createReadStream("input/"+file)
      .pipe(parse({ delimiter: "," }, (err, data) => {
            let currentCategory = ""
            data.forEach(element => {
                let no = element[0];
                if (isNaN(no)) {
                    currentCategory = element[1]
                }else{
                    json.push({
                        no: parseInt(no),
                        question: element[1],
                        answer1: element[2],
                        answer2: element[3],
                        answer3: element[4],
                        answer4: element[5],
                        correctAnswer: parseInt(element[6]),
                        moreInfo: element[7],
                        category: currentCategory
                    })
                }
            });
        }))
        .on('end', () => {
            const jsonData = JSON.stringify(json, null, 2);  // null, 2 adds indentation for readability
            fs.writeFile('output/output.json', jsonData, (err) => {
                if (err) {
                    console.error("Error writing to file", err);
                } else {
                    console.log("JSON data successfully written to file");
                }
            });
        });
    });
});

// fs.createReadStream('input/Tong hop ra soat cau hoi nghiệp vụ tin dung - 300 câu.csv').pipe(parser);