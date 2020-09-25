
const PDFDocument = require('pdfkit');
const fs = require('fs');

function generatePdf(details) {

    let pdfPath = `pdf/output.pdf`
    // Create a document
    const doc = new PDFDocument();
    
    // Pipe its output somewhere, like to a file or HTTP response
    // See below for browser usage
    doc.pipe(fs.createWriteStream(pdfPath));
    
    // Embed a font, set the font size, and render some text
    doc
    //   .font('fonts/PalatinoBold.ttf')
    .fontSize(25).fillColor('red')
    .text('Your personal details', 100, 100)
    doc.fontSize(18).fillColor('black')
    .text(`
        \nName : ${details.fname} ${details.lname}\n
        Date of Birth : ${details.dob}\n
        Qualification : ${details.qual}\n
        Key strength : ${details.strength}\n
        Personal details : ${details.pd}`)  
    // Add an image, constrain it to a given size, and center it vertically and horizontally
    // doc.image('path/to/image.png', {
    //   fit: [250, 300],
    //   align: 'center',
    //   valign: 'center'
    // });
    
    // Add another page
    // doc
    //   .addPage()
    //   .fontSize(25)
    //   .text('Here is some vector graphics...', 100, 100);
    
    // Draw a triangle
    // doc
    //   .save()
    //   .moveTo(100, 150)
    //   .lineTo(100, 250)
    //   .lineTo(200, 250)
    //   .fill('#FF3300');
    
    // Apply some transforms and render an SVG path with the 'even-odd' fill rule
    // doc
    //   .scale(0.6)
    //   .translate(470, -380)
    //   .path('M 250,75 L 323,301 131,161 369,161 177,301 z')
    //   .fill('red', 'even-odd')
    //   .restore();
    
    // Add some text with annotations
    // doc
    //   .addPage()
    //   .fillColor('blue')
    //   .text('Here is a link!', 100, 100)
    //   .underline(100, 100, 160, 27, { color: '#0000FF' })
    //   .link(100, 100, 160, 27, 'http://google.com/');
    
    // Finalize PDF file
    doc.end();
    return pdfPath
}


module.exports = generatePdf;