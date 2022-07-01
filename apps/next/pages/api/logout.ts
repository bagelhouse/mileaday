import { unsetAuthCookies } from 'next-firebase-auth'
import initAuth from '../../firebase/firebaseAuth'
import { NextApiRequest, NextApiResponse } from "next"

initAuth()

const handler = async (req:NextApiRequest, res: NextApiResponse) => {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e)
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ status: true })
}

export default handler