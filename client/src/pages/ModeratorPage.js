import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { Card, CardContent, CardActions } from '@mui/material'
import { signOut } from '../actions/auth'
import { fetchReports, closeReport, warnUser } from '../api'

const ModeratorPage = () => {
  const dispatch = useDispatch()
  const [reports, setReports] = useState([])

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    const { data } = await fetchReports()
    setReports(data)
  }

  const handleClose = async (e, reportId) => {
    await closeReport(reportId)
    loadReports()
  }

  const handleWarn = async (e, reportId, userId) => {
    await warnUser(userId)
    await closeReport(reportId)
    loadReports()
  }

  const reportCards = reports
    .filter((report) => !report.isClosed)
    .map((report) => (
      <Card
        key={report._id}
        variant="outlined"
        style={{ width: 500, maxWidth: '90%', marginBottom: '16px' }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            style={{ marginRight: 'auto' }}
          >
            <strong>Author:</strong> {report.sender.name}
          </Typography>
          <Typography gutterBottom variant="body2">
            <strong>Reported user:</strong> {report.reportedUser.name}
          </Typography>
          <Typography variant="body2" style={{ overflowWrap: 'break-word' }}>
            <strong>Description:</strong> {report.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={(e) => handleClose(e, report._id)}>Close</Button>
          <Button
            onClick={(e) => handleWarn(e, report._id, report.reportedUser._id)}
          >
            Warn
          </Button>
        </CardActions>
      </Card>
    ))

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={3}
        width="100%"
      >
        <Typography variant="h5">
          <strong>Moderator Panel</strong>
        </Typography>
        <Button variant="contained" onClick={() => dispatch(signOut())}>
          Sign out
        </Button>
      </Box>
      {reportCards.length > 0 ? (
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" mb={2}>
            <strong>Reports</strong>
          </Typography>
          {reportCards}
        </Box>
      ) : (
        ''
      )}
    </>
  )
}

export default ModeratorPage
