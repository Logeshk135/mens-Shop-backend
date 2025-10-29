// PUT /api/user/profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // update only fields sent from frontend
    if (req.body.name) user.name = req.body.name;
    if (req.body.phone) user.phone = req.body.phone;
    if (req.body.gender) user.gender = req.body.gender;

    const updatedUser = await user.save();

    // return updated user (without password)
    const { password, ...safeUser } = updatedUser._doc;
    res.json(safeUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Profile update failed" });
  }
};
