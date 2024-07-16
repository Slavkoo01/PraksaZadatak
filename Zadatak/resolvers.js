const User = require('./models/User');

const resolvers = {
  Query: {
    users: async (parent, { name, email }) => {
      const filter = {};
      if (name) filter.name = new RegExp(name, 'i');
      if (email) filter.email = new RegExp(email, 'i');
      return await User.find(filter);
    },
  },
  Mutation: {
    addUser: async (parent, { id, name, email }) => {
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error('Invalid email format');
      }


      const existingUser = await User.findById(id);
      if (existingUser) {
        throw new Error('ID already exists');
      }

      const user = new User({ _id: id, name, email });
      return await user.save();
    },
    deleteUser: async (parent, { id }) => {
      const result = await User.deleteOne({ _id: id });
      return result.deletedCount > 0;
    },
  },
};

module.exports = resolvers;