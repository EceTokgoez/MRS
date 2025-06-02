// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { validToken } = require('../middleware/validation');
const {
  getProfile,
  updateProfile,
  addFriend,
  removeFriend,
  listFriends,
  getProfileDetails,
  getMyProfileDetails
} = require('../controllers/userControllers');
const upload = require('../middleware/uploadFile');

// Profil getir
router.get( '/users/:userId',  validToken, getProfile);
// Profil kısmi güncelle
router.patch('/users/:userId',  validToken, upload.single('image') , updateProfile);
// Arkadaş ekle
router.post('/users/add-friends/:friendId', validToken, upload.single('image') , addFriend);
// Arkadaş sil
router.delete('/users/remove-friends/friends/:friendId',  validToken, removeFriend);
// Arkadaş listesini getir
router.get( '/users/friends',  validToken, listFriends);
// arkadaş profilini detaylı getir
router.get( '/users/friends/:friendId',  validToken, getProfileDetails);
// kendi profilini detaylı getir
router.get( '/users/me',  validToken, getMyProfileDetails);

module.exports = router;
