import { Request, Response } from 'express'
import { ArtistService } from '../services/ArtistService'

export async function artistHandler(req: Request, res: Response) {
  const artistName = req.params.artistName
  try {
    const artist = await ArtistService.fetchArtistWithEvents(artistName)
    res.status(200).send(JSON.stringify(artist))
  } catch (error) {
    res.status(400).send(JSON.stringify(error))
  }
}