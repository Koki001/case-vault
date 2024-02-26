import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userAgent = req.headers?.["user-agent"];

  if (userAgent) {
    const isMobile = /Mobile/.test(userAgent);

    if (isMobile) {
      res.writeHead(302, { Location: "/mobile-page" });
      res.end();
      return;
    }
  }

  res.status(200).json({ message: "Not on mobile" });
}
