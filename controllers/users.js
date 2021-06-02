const User = require("./../models/users");


exports.createUser = async (req, res) => {
  const user = new User(req.body);
  user.id = await User.find().countDocuments() + 1
  try {
    await user.save();
    res.status(200).json({
      status: 200,
      message: "Create successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

exports.getUsers = async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 3;
  try {
    const count = await User.countDocuments();
    const user = await User.find().select('id firstName lastName email -_id').limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    res.status(200).json({
      status: 200,
      response: user,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

exports.getUsersById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ id: id }).select('id firstName lastName email -_id');
    res.status(200).json({
      status: 200,
      response: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

exports.updateUsersById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.updateOne({ id: id }, { $set: req.body });
    res.status(200).json({
      status: 200,
      message: "Updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};

exports.deleteUsersById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.deleteOne({ id: id });
    res.status(200).json({
      status: 200,
      response: [],
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};


exports.searchUser = async (req, res) => {
  const input = req.params.input;
  try {
    const user = await User.find({
      "$or": [
        { firstName: { '$regex': input, '$options': 'i' } },
        { lastName: { '$regex': input, '$options': 'i' } },
        { email: { '$regex': input, '$options': 'i' } }
      ]
    });
    res.status(200).json({
      status: 200,
      response: user,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error,
    });
  }
};