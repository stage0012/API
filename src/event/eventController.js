const Photo = require('./eventModel').default;
const { IPhoto } = require('./eventModel');
const { Request, Response } = require('express');
const fs = require('fs-extra');
const path = require('path');

async function getPhotos(req, res) {
  const photos = await Photo.find();
  return res.json(photos);
}

async function createPhoto(req, res) {
  const { title, description } = req.body;
  if (!req.file || !req.file.path) {
    return res.status(300).json({ message: 'Image path is missing' });
  }
  const newPhoto = { title, description, imagePath: req.file.path };
  const photo = new Photo(newPhoto);
  await photo.save();
  return res.json({
    message: 'Photo Saved Successfully',
    photo
  });
}

async function getPhoto(req, res) {
  const { id } = req.params;
  const photo = await Photo.findById(id);
  return res.json(photo);
}

async function deletePhoto(req, res) {
  const { id } = req.params;
  try {
    const photo = await Photo.findByIdAndRemove(id);
    if (photo) {
      await fs.unlink(path.resolve(photo.imagePath));
    }
    return res.json({ message: 'Photo Deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting photo' });
  }
}

async function updatePhoto(req, res) {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedPhoto = await Photo.findByIdAndUpdate(id, {
    title,
    description
  }, { new: true });
  return res.json({
    message: 'Successfully updated',
    updatedPhoto
  });
}

module.exports = {
  getPhotos,
  createPhoto,
  getPhoto,
  deletePhoto,
  updatePhoto
};
