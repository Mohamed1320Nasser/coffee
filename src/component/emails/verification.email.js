

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
       auth: {
         user: process.env.EMAIL, // generated ethereal user
         pass: process.env.EMAIL_PASSWORD, // generated ethereal password
       },
     });
exports.sendEmail = async (user, host) => {
  // send mail with defined transport object
  await transporter.sendMail(
    {
      from: `" Coffee Shop " <${process.env.EMAIL}>`, // sender address
      to: user.email,
      subject: `Hello ${user.name}`, // Subject line,
      text: "Hello dear",
      html:`
      
      <body style=" margin: 0; background-color: #cccccc;">
  <center class="wrapper" style=" width: 100%; table-layout: fixed; padding-bottom: 60px;">

    <table class="main" width="100%"
      style=" background-color: #ffffff;margin: 0 auto;max-width: 600px;border-spacing: 0;font-family: sans-serif; color: #4a4a4a;">
      <tr>
        <td height="8" style="background-color: #289dcf;  padding: 0;"></td>
      </tr>
      <tr>
        <td style="padding: 14px 0 4px ;  padding: 0;">
          <table style="border-spacing: 0; width:100%">
            <tr>
              <td class="two-columns" style="text-align: center; font-size: 0 ;">
                <table class="column" style="
                      width: 100%;
                      max-width: 300px;
                      display: inline-block;
                      vertical-align: top;
                    ">
                  <tr>
                    <td style="padding: 0 62px 10px ;">
                      <a href="https://thebes.edu.eg/">
                        <img style=" border: 0;" src="https://res.cloudinary.com/dufrfkj11/image/upload/v1683740686/Coffee/undefined/logo_2023-05-10_20-43-57_appssx.jpg" width="180" title="Logo" />
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding: 0;">
          <a href="#">
            <img style=" border: 0;" src="https://res.cloudinary.com/dufrfkj11/image/upload/v1681511347/Coffee/category/bbyteitfsonfqrz2spth.png" width="600" style="max-width: 100%" />
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 5px 0 50px">
          <table width="100%" style=" border-spacing: 0;">
            <tr>
              <td style="text-align: center; padding: 15px">
                <p style="font-size: 20px; font-weight: bold">
                  Verify you email
                  <strong style="color: #289dcf">address</strong>
                </p>
                <p style="
                      font-size: 15px;
                      line-height: 23px;
                      padding: 5px 0 15px;
                    ">
                  please click the button to confirm your email address and
                  activate your account
                </p>
                <a href="http://${host}/api/v1/users/verfy-email?token=${user.emailToken}" class="button" style="
                      background-color: #289dcf;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 12px 20px;
                      font-weight: bold;
                      border-radius: 5px;
                    ">CONFIRM EMAIL</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="background-color: #565656; color: #ffffff">
          <table width="100%" style=" border-spacing: 0;">
            <tr>
              <td style="text-align: center; padding: 45px 20px">
                <p style="padding: 10px; font: 300">
                  copyright 2023.THEBES.ACADEMY EG
                </p>
                <p style="padding: 10px">
                  You’re receiving this email because you are subscribed to
                  The welfare youth
                </p>
                <p></p>
                <p style="padding: 10px">SUBSCRIBE</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </center>
</body>

      `
    },
    (err, info) => {
      if (err) console.log(err);
    }
  );
};
