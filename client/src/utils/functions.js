export const getInitials = (name) => {
  return name.split(' ')[0][0] + name.split(' ')[1][0]
}

export const getOtherMember = (members, userId) => {
  return members.filter((member) => member._id !== userId)[0]
}
