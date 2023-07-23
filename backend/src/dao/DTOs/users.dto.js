const removeSensitiveData = (user) => {
  return {
    _id: user._id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    role: user.role
  }
}

export {
  removeSensitiveData
}