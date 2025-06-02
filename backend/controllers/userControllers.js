const asyncHandler = require("express-async-handler");
const User = require("../models/user");



// kullanıcıları getirir veya kullanıcı adı ile arama yapar
const getProfile = asyncHandler(async (req, res) => {
    const userName = req.params.userName;
    const filter = {};
    if (userName) {
        filter.userName = {$regex: userName, $options: "i" };
    }

    const user = await User.findOne(filter).select("userName profilPhoto");

}
);



const updateProfile = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const user = await User.findById(userId);
    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    const allowedFields = ["userName", "profilePhoto"]; 
    const updates = {};
    if (req.file && req.file.path) {
        updates.profilePhoto = req.file.path;
      }
    
    allowedFields.forEach((field)=>{
        if (field !== 'profilePhoto' && req.body[field] !== undefined) {
            updates[field] = req.body[field];
          }
    });
     // Güncellemeleri uygulayıp kaydet
  Object.assign(user, updates);
  const updatedUser = await user.save();

  res.json(updatedUser);    

})




const addFriend = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const friendId = req.params.friendId;

    if(userId === friendId){
        res.status(400);
        throw new Error("You can not add yourself as a friend");
    }

    const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId)
    ]);
    if(!user || !friend){
        res.status(404);
        throw new Error("User or friend not found");
    }
    if(user.friends.includes(friendId)){
        res.status(400);
        throw new Error("You are already friends");
    }
    user.friends.push(friendId);
    friend.friends.push(userId);
    await Promise.all([user.save(), friend.save()]);
    
    res.status(200).json({
        success:true,
        message:"Friend added successfully",
        data:{
            user,
            friend
        }
    })
})



const removeFriend = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const friendId = req.params.friendId;
    
    if(userId === friendId){
        res.status(400);
        throw new Error("You can not remove yourself as a friend");
    }

    const [user, friend] = await Promise.all([
        User.findById(userId),
        User.findById(friendId)
    ]);
    if(!user || !friend){
        res.status(404);
        throw new Error("User or friend not found");
    }
    if(!user.friends.includes(friendId)){
        res.status(400);
        throw new Error("You are not friends");
    }
    user.friends = user.friends.filter((id) => id.toString() !== friendId);
    friend.friends = friend.friends.filter((id) => id.toString() !== userId);
    await Promise.all([user.save(), friend.save()]);
    
    res.status(200).json({
        success:true,
        message:"Friend removed successfully",
        data:{
            user,
            friend
        }
    })
})

//arkadaşları listeler
const listFriends = asyncHandler(async(req,res)=>{
    const userId = req.user.id;
    const user = await User.findById(userId)
    .select('friends')
    .populate('friends', 'userName profilePhoto');    if(!user){
        res.status(404);
        throw new Error("User not found");
    }
    res.status(200).json({
        success:true,
        message:"Friends listed successfully",
        data:user.friends
    })
})


// Arkadaş profilini detaylı getir
const getProfileDetails = asyncHandler(async (req, res) => {
    const friendId = req.params.friendId;
    const userId   = req.user.id;
  
    // Kendi profiline erişemez
    if (userId === friendId) {
      res.status(400);
      throw new Error('You cannot view your own profile');
    }
  
    // Arkadaş verisini çek (yalnızca ihtiyacımız olan alanlar)
    const friend = await User.findById(friendId)
      .select('userName profilePhoto friends preferences')
      .lean();
    if (!friend) {
      res.status(404);
      throw new Error('Friend not found');
    }
  
    // Kendi arkadaş listenizi çek
    const user = await User.findById(userId).select('friends').lean();
    const userFriends = new Set(user.friends.map(id => id.toString()));
  
    // Arkadaşın arkadaş listesinden ortak olanları say
    const mutualFriendsCount = friend.friends
      .map(id => id.toString())
      .filter(id => userFriends.has(id))
      .length;
  
    res.status(200).json({
      success: true,
      message: 'Friend profile details retrieved successfully',
      data: {
        userName:   friend.userName,
        profilePhoto: friend.profilePhoto,
        preferences:  friend.preferences,
        totalFriends:   friend.friends.length,
        mutualFriends:  mutualFriendsCount
      }
    });
  });


  // kendi profilini detaylı getir
const getMyProfileDetails = asyncHandler(async (req, res) => {
    const userId = req.user.id;
  
    // Kendi verisini çek (yalnızca ihtiyacımız olan alanlar)
    const user = await User.findById(userId)
      .select('userName profilePhoto friends preferences')
      .lean();
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    // Arkadaş listesini say
    const totalFriends = user.friends.length;
  
    res.status(200).json({
      success: true,
      message: 'User profile details retrieved successfully',
      data: {
        userName:   user.userName,
        profilePhoto: user.profilePhoto,
        preferences:  user.preferences,
        totalFriends:   totalFriends
      }
    });
  });

module.exports = {
    getProfile,
    updateProfile,
    addFriend,
    removeFriend,
    listFriends,
    getProfileDetails,
    getMyProfileDetails
}

