module.exports = {
  schema: true,
  autoCreatedBy: true,
  autoUpdatedBy: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
      alphanumericdashed: true
    },
    slug: {
      type: 'string'
    },

    // associations
    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    },
    users: {
      collection: 'User',
      via: 'group'
    }
  },

  beforeCreate: (values, next) => {
    if (!values.slug || values.slug.length <= 0) {
      values.slug = HelperService.slugify(values.name)
    }
    next();
  },
  
  beforeUpdate: (values, next) => {
    if (!values.slug || values.slug.length <= 0) {
      values.slug = HelperService.slugify(values.name)
    }
    next();
  }
}