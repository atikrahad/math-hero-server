/* eslint-disable @typescript-eslint/no-explicit-any */
export const confirmationEmail = (user: any, otp: string) => {
    return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            border-bottom: 1px solid #ddd;
        }
        .header h1 {
            color: #333;
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
        }
        .otp-code {
            display: inline-block;
            margin: 20px 0;
            padding: 10px 20px;
            font-size: 24px;
            color: #ffffff;
            background-color: #4caf50;
            border-radius: 5px;
            letter-spacing: 2px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            border-top: 1px solid #ddd;
            color: #888;
            font-size: 14px;
        }
        .footer a {
            color: #4caf50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>Account Confirmation</h1>
        </div>
        <div class="content">
            <p>Hello, ${user.email}</p>
            <p>Thank you for registering with us! Please use the OTP code below to confirm your email address:</p>
            <div class="otp-code">${otp}</div>
            <p>If you did not request this, please ignore this email.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Your Company. All rights reserved.</p>
            <p>
                Need help? <a href="zecon@zero.com">Contact Support</a>
            </p>
        </div>
    </div>
</body>
</html>

    `
}