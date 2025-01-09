import { Sequelize, DataTypes } from 'sequelize';

// Use the correct SQLite URL format
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:' // This specifies an in-memory database
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

const Post = sequelize.define('Post', {
  heading: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Establish associations
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Post };