import fs from 'fs'
import GridFS from 'GridFS'
import dotenv from 'dotenv'
const newFileName = "my-image";
const imageFile = fs.writeFile("/Users/kvjha/Desktop/4413Project/backend/image.txt","file",function (err) {
    if (err) throw err;
    console.log('Saved!');
  });
  
const gfsPhoto = new GridFS(db, "photo");
const gfsFile = gfsPhoto.createFile(imageFile);
gfsFile.setFilename(newFileName);
gfsFile.save();
