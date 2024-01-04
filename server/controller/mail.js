const nodeMailer = require("nodemailer");
require("dotenv").config();

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_ID,
    pass: process.env.PASSWORD,
  },
});

exports.sendEmail = async (title, email, name, message, action) => {
  try {
    const mailOption = {
      from: process.env.USER_ID,
      to: email,
      importance: "high",
      subject: "BlogSpot " + title,
      html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <title>BlogSpot</title>

            <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
            />
        </head>
        <body
            style="
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #ffffff;
            font-size: 14px;
            "
        >
            <div
            style="
                max-width: 720px;
                margin: 0 auto;
                padding: 45px 20px 60px;
                background: #f4f7ff;
                background-image: url(https://github.com/shuvra-matrix/images/blob/main/542362-abstract-3D-gradient-blue-orange.jpg?raw=true);
                background-repeat: no-repeat;
                background-size: 800px 452px;
                background-position: top center;
                font-size: 14px;
                color: #434343;
            "
            >
            <header>
                <table style="width: 100%">
                <tbody>
                    <tr style="height: 0">
                    <td
                        style="
                        display: flex;
                        flex-flow: nowrap row;
                        justify-content: center;
                        align-items: center;
                        "
                    >
                        <img
                        alt=""
                        src="https://github.com/shuvra-matrix/images/blob/main/blogsmall.png?raw=true"
                        height="40px"
                        /><span
                        style="
                            font-size: 1.4rem;
                            color: rgb(255, 255, 255);
                            font-weight: 700;
                        "
                        >BlogSpot</span
                        >
                    </td>
                    </tr>
                </tbody>
                </table>
            </header>

            <main>
        <div
          style="
            margin: 0;
            margin-top: 70px;
            padding: 70px 15px 80px;
            background: #ffffff;
            border-radius: 30px;
            text-align: center;
          "
        >
          <div style="width: 100%; max-width: 500px; margin: 0 auto">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              ${title}
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              ${message}
            </p>
           ${action}
        
            <p
              style="
                margin: 0;
                margin-top: 20px;
                font-weight: 500;
                letter-spacing: 0.56px;
                color: #1f1f1f !important;
              "
            >
              If you did not initiate this process, please contact our support
              team immediately at shuvratcp@gmail.com to investigate and secure
              your account.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 20px;
                font-weight: 500;
                letter-spacing: 0.56px;
                color: #1f1f1f !important;
              "
            >
              Thank you for choosing BlogSpot. We look forward to providing you
              with a seamless and secure experience.
            </p>
          </div>
        </div>

        <p
          style="
            max-width: 400px;
            margin: 0 auto;
            margin-top: 90px;
            text-align: center;
            font-weight: 500;
            color: #8c8c8c;
          "
        >
          If this was not you or Need help? Contact at
          <a
            href="mailto:shuvratcp@gmail.com"
            style="color: #499fb6; text-decoration: none"
            >shuvratcp@gmail.com</a
          >
          or visit our
          <a
            href="https://github.com/shuvra-matrix"
            target="_blank"
            style="color: #499fb6; text-decoration: none"
            >Help Center</a
          >
        </p>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #e6ebf1;
        "
      >
         <div style="margin: 16px auto 0px; width: 100%">
          <p
            style="
              margin: 8px auto 0px;
              width: 100%;
              text-align: center;
              font-size: 16px;
              font-weight: 600;
              color: #434343;
              padding-top: 5px;
              padding-bottom: 5px;
            "
          >
            BlogSpot
          </p>
          <p
            style="
              margin: 8px auto 0px;
              width: 100%;
              text-align: center;
              color: #434343;
              padding-bottom: 5px;
            "
          >
            Kolkata , India
          </p>
          <p
            style="
              margin: 8px auto 0px;
              width: 100%;
              text-align: center;
              text-align: center;
            "
          >
            Copyright © 2024 Shuvra Chakrabarty. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  </body>
</html>
`,
    };
    await transporter.sendMail(mailOption);
    return true;
  } catch (err) {
    throw new Error(err);
  }
};
