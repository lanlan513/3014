import type { Concert } from '../concerts';

import { concertDetail as fdHk20221 } from './fd-hk-2022-1';
import { concertDetail as fdHk2022Last } from './fd-hk-2022-last';
import { concertDetail as fdBj2023 } from './fd-bj-2023';
import { concertDetail as fdSh2023 } from './fd-sh-2023';
import { concertDetail as fdGz2023 } from './fd-gz-2023';
import { concertDetail as fdCd2024 } from './fd-cd-2024';
import { concertDetail as fdTp2024 } from './fd-tp-2024';
import { concertDetail as lifeHk2013 } from './life-hk-2013';
import { concertDetail as lifeSh2014 } from './life-sh-2014';
import { concertDetail as duoHk2010 } from './duo-hk-2010';
import { concertDetail as duoHk2010Last } from './duo-hk-2010-last';
import { concertDetail as galHk2006 } from './gal-hk-2006';
import { concertDetail as galGz2006 } from './gal-gz-2006';
import { concertDetail as mosHk2007 } from './mos-hk-2007';
import { concertDetail as saySh2017 } from './say-sh-2017';
import { concertDetail as teHk2003 } from './te-hk-2003';
import { concertDetail as blHk1999 } from './bl-hk-1999';

export const concertDetails: Concert[] = [
  fdHk20221,
  fdHk2022Last,
  fdBj2023,
  fdSh2023,
  fdGz2023,
  fdCd2024,
  fdTp2024,
  lifeHk2013,
  lifeSh2014,
  duoHk2010,
  duoHk2010Last,
  galHk2006,
  galGz2006,
  mosHk2007,
  saySh2017,
  teHk2003,
  blHk1999,
];

export const concertMap = new Map<string, Concert>(
  concertDetails.map((concert) => [concert.id, concert])
);

export function getConcertById(id: string): Concert | undefined {
  return concertMap.get(id);
}

export function getConcertsByTourIdDetailed(tourId: string): Concert[] {
  return concertDetails
    .filter((c) => c.tourId === tourId)
    .sort((a, b) => a.date.localeCompare(b.date));
}
