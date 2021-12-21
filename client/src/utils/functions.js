import moment from 'moment'

export const getInitials = (name) => {
  return name.split(' ')[0][0] + name.split(' ')[1][0]
}

export const getOtherMember = (members, userId) => {
  return members.filter((member) => member._id !== userId)[0]
}

export const formatTime = (date) => {
  const hours = moment().diff(moment(date), 'hours')
  return hours > 24
    ? moment(date).format('DD/MM/YY HH:mm')
    : moment(date).format('HH:mm')
}
