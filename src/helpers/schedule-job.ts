import schedule from 'node-schedule'
import { uuid } from './uuid'

export default class ScheduleJob {
    id: string
    ruleTime: object
    action: any

    constructor(ruleTime: object, action: any) {
        this.id = uuid()
        this.ruleTime = ruleTime
        this.action = action
    }

    start = (): void => {
        schedule.scheduleJob(this.id, this.ruleTime, this.action)
    }

    cancel = (): void => {
        schedule.scheduledJobs[this.id].cancel()
    }

    reschedule = (newRule: object): void => {
        schedule.scheduledJobs[this.id].reschedule(newRule)
    }
}
