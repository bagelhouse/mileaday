import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response } from 'express'
import { firebaseAdminApp } from '../../firebase/firebaseAdmin.config'
import _ from 'lodash'
import { getCircularReplacer } from 'src/utils/common'

@Injectable()
export class FirebasePreauthMiddleware implements NestMiddleware {
    private defaultApp: any
    private readonly logger = new Logger(FirebasePreauthMiddleware.name)
    constructor() {
        this.defaultApp = firebaseAdminApp()
    }

    use(req: Request, res: Response, next: any) {
        const token = req.headers.authorization
        if (token != null && token != '') {
            this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''))
                .then(async decodedToken => {
                    req['user'] = decodedToken 
                    next()
                }).catch(error => {
                    const err = JSON.stringify(_.cloneDeep(error), getCircularReplacer())
                    const request = JSON.stringify(_.cloneDeep(req), getCircularReplacer())
                    this.logger.log(`Unauthorized access attempted for ${err} ${request} `)
                    this.accessDenied(req.url, res)
                })
        } else {
            next() // we will catch no information errors in the controller 
        }
    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied'
        })
    }
}