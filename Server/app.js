const express = require('express')
const app = express()
const port = 3000
const error = require('./middleware/errorHandle')
const router = require('./router')
const cors = require('cors')


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(router)
app.use(error)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})