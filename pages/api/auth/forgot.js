import nc from 'next-connect';
import db from '../../../utils/db';
import User from '../../../models/User';
import { createResetToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendEmails';
import { resetEmailTemplate } from '../../../emails/resetEmailTemplate';

const handler = nc();

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'This email does not exist.' });
    }
    const userId = createResetToken({
      id: user._id.toString(),
    });
    const url = `${process.env.BASE_URL}/auth/reset/${userId}`;
    sendEmail(email, url, '', 'Reset your password.', resetEmailTemplate);
    await db.disconnectDb();
    res.json({
      message: 'An email has been sent to you, use it to reset your password.',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
