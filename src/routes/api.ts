import * as express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    console.log('OKELA')
    res.json({
        success: true,
        message: 'welcome to my server',
    })
})

export default router