import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('Revalidating detail page...')
  console.log(req.query)
  const {
    query: { id },
  } = req
  let revalidated = false
  try {
    await res.revalidate(`/note/${id}`)
    //Nextjs12.2->
    //await res.revalidate(`/note/${id}`)
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}
