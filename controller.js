const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

exports.createFile = (req, res) => {
    const { filename, content, password } = req.body;

    if (!filename || !content) {
        return res.status(400).send('Both filename and content are required.');
    }

    const filePath = path.join(uploadsDir, filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to create file.');
        }
        res.status(200).send('File created successfully.');
    });

};

exports.getFiles = (req, res) => {

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to get files.');
        }
        res.status(200).json(files);
    });

};

exports.getFile = (req, res) => {

    const { filename } = req.query;

    if (!filename) {
        return res.status(400).send('Filename is required.');
    }

    const filePath = path.join(uploadsDir, filename);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(400).send('File not found.');
        }
        res.status(200).send(data);
    });

};

exports.modifyFile = (req, res) => {

    const { filename, content, password } = req.body;

    if (!filename || !content) {
        return res.status(400).send('Both filename and content are required.');
    }

    const filePath = path.join(uploadsDir, filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to modify file.');
        }
        res.status(200).send('File modified successfully.');
    });

};

exports.deleteFile = (req, res) => {

    const { filename, password } = req.query;

    if (!filename) {
        return res.status(400).send('Filename is required.');
    }

    const filePath = path.join(uploadsDir, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to delete file.');
        }
        res.status(200).send('File deleted successfully.');
    });
    
};