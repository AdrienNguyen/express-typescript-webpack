import nodemailer from 'nodemailer'
import { EMAIL_ACCOUNT, EMAIL_PASSWORD } from '../config/secrets'

export const sendEmailForCreatedAccount = async (email: string) => {
    try {
        console.log(email)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: EMAIL_ACCOUNT,
                pass: EMAIL_PASSWORD,
            },
        })

        const mainOptions = {
            from: EMAIL_ACCOUNT,
            to: email,
            subject: 'Register account successfully!',
            text:
                'You have registered account successfully in out system with email!: ' +
                email,
            html: `<html>
                <head>
                    <style>
                        .wrapper {
                            width: 100%;
                            min-width: 580px;
                            background-color: #FAFAFA;
                            padding: 10px 0;
                        }
                
                        .info {
                            list-style-type: none;
                        }
                
                        @media screen and (max-width: 600px) {
                            .form {
                                border: solid 1px #dddddd;
                                padding: 50px 30px;
                                border-radius: 3px;
                                margin: 0px 5%;
                                background-color: #FFFFFF;
                            }
                        }
                
                        .form {
                            border: solid 1px #dddddd;
                            padding: 50px 30px;
                            border-radius: 3px;
                            margin: 0px 25%;
                            background-color: #FFFFFF;
                        }
                
                        .title {
                            text-align: center;
                        }
                
                        .footer {
                            margin: 0px 25%;
                            text-align: center;
                
                        }
                    </style>
                </head>
                
                <body>
                    <div class="wrapper">
                        <div class="title">
                            <h1>WEBSITE-DEMO</h1>
                        </div>
                        <div class="form">
                            <p><b>your account information: </b></p>
                            <div class="info">
                                <li>Account: ${email}</li>
                            </div>
                        </div>
                        <div class="footer">
                            <p>The copyright belongs to
                                <a href="https://adriennguyen.github.io/portfolio/">Adrien Nguyen</a>
                            </p>
                        </div>
                    </div>
                </body>
            </html>`,
        }

        return await transporter.sendMail(mainOptions)
    } catch (error) {
        console.log(error.message)
    }
}
