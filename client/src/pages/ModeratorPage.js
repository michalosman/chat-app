import React, { useState, useEffect } from 'react'
import { signOut } from '../actions/auth'
import { useDispatch } from 'react-redux'
import { Box, Button, Typography } from '@mui/material'
import { getReports } from '../api'
import { Card, CardContent, CardActions } from '@mui/material'
import { closeReport, warnUser } from '../api'

const ModeratorPage = () => {
  const dispatch = useDispatch()
  const [reports, setReports] = useState([])

  useEffect(() => {
    loadReports()
  }, [])

  const loadReports = async () => {
    const { data } = await getReports()
    setReports(data)
  }

  const handleClose = async (reportId) => {
    await closeReport(reportId)
    window.location.reload(false)
  }

  const handleWarn = async (reportId, userId) => {
    await warnUser(userId)
    await closeReport(reportId)
    window.location.reload(false)
  }

  const reportCards = reports.map((report) =>
    !report.isClosed ? (
      <Card key={report._id} style={{ marginTop: '30px', width: 700 }}>
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
          <Button onClick={() => handleClose(report._id)}>Close</Button>
          <Button
            onClick={() => handleWarn(report._id, report.reportedUser._id)}
          >
            Warn
          </Button>
        </CardActions>
      </Card>
    ) : (
      ''
    )
  )

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <h1>Moderator Panel</h1>
      <Button variant="contained" onClick={() => dispatch(signOut())}>
        Sign out
      </Button>
      <Box display="flex" flexDirection="column">
        {reportCards}
      </Box>
    </Box>
  )
}

export default ModeratorPage
