//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync( __dirname + '/template.html', "utf8");
var html_total = fs.readFileSync( __dirname + '/template_total.html', "utf8");

function pdfGeneration(items,title){    

    console.log(items)
    if(title=='total'){
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "27mm",
                contents: `<div style="text-align: center;">Raport ${title}</div>`
            },
            footer: {
                height: "28mm",
                contents: {
                    default: '<span style="color: #444;text-align: center;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                }
            }
        };
        var document = {
            html: html_total,
            data: {
                items: items,
            },
            path: `./document/raport_${title}_${Date.now()}.pdf`,
            type: "",
        };
    }else{
        var options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "27mm",
                contents: `<div style="text-align: center;">Raport des objet de type ${title}</div>`
            },
            footer: {
                height: "28mm",
                contents: {
                    default: '<span style="color: #444;text-align: center;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                }
            }
        };
        var document = {
            html: html,
            data: {
                items: items,
            },
            path: `./document/raport_${title}_${Date.now()}.pdf`,
            type: "",
        };
    }
        


pdf.create (document, options).then (res => {
    console.log (res);
    }).catch (error => {
        console.error (error);
    });
}

module.exports = pdfGeneration;